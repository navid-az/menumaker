"use client";

import { useState } from "react";

// zod validator
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldErrors } from "react-hook-form";

// components
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AssetPickerPopOver } from "@/components/global/itemAdderButtons/AssetPickerPopOver";

// SVGs
import { Edit2, Loader2, Plus } from "lucide-react";

// hooks
import { useForm } from "react-hook-form";

// types
import { type AssetGroupType } from "@/components/global/AssetPicker";
type CreateCategoryFormType = {
  businessSlug: string;
  assetGroups: AssetGroupType[];
  title: string;
  description: string;
  defaultValues?: z.infer<typeof FormSchema>;
  categoryId?: number;
};

//actions
import { createCategory, updateCategory } from "@/app/actions";

// zod schema
const IconSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
});

const FormSchema = z
  .object({
    name: z.string().optional(),
    icon: IconSchema.optional().nullable(),
  })
  .refine((data) => data.name || data.icon, {
    message: "Either name or icon must be provided.",
  });

export function CreateCategoryForm({
  businessSlug,
  assetGroups,
  title,
  description,
  defaultValues,
  categoryId,
}: CreateCategoryFormType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? {
          name: defaultValues.name || "",
          icon: defaultValues.icon || null,
        }
      : {
          name: "",
          icon: null,
        },
  });

  // control dialog component
  const [open, setOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!defaultValues && !categoryId) {
        // Create new category
        const res = await createCategory(businessSlug, data);
        if (res?.success) {
          setTimeout(() => {
            setOpen(false);
          }, 300);
          toast.success("دسته بندی با موفقیت ایجاد شد");
          form.reset();
        } else {
          toast.error(res?.error || "خطایی در ایجاد دسته بندی رخ داد.");
        }
      } else if (defaultValues && categoryId) {
        const res = await updateCategory(businessSlug, categoryId, {
          name: data.name,
          icon: data.icon ? data.icon.id : null, // Explicitly send null if icon is null
        });

        if (res?.success) {
          setTimeout(() => {
            setOpen(false);
          }, 300);
          toast.success("دسته بندی با موفقیت ویرایش شد");
        } else {
          toast.error(res?.error || "خطایی در ویرایش دسته بندی رخ داد.");
        }
      }
    } catch (error) {
      toast.error("خطایی در پردازش درخواست رخ داد. لطفاً دوباره تلاش کنید.");
    }
  }

  const onError = (errors: FieldErrors<any>) => {
    form.setError("root", {
      type: "required",
      message: "لطفاً حداقل نام یا آیکون را وارد کنید",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!defaultValues ? (
          <Button
            size="lg"
            className="scale-pro rounded-full border-2 border-primary bg-soft-blue px-4 font-semibold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
          >
            <Plus className="ml-2 h-5 w-5"></Plus>
            <p>{title}</p>
          </Button>
        ) : (
          <Button size="icon" variant="ghost" className="rounded-full">
            <Edit2 className="h-5 w-5"></Edit2>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader className="items-start">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="font-normal">
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            id="category-form"
          >
            <section className="flex w-full items-center gap-2 space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>نام دسته</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="پیتزا، برگر، نوشیدنی سرد، ..."
                        type="text"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AssetPickerPopOver
                        value={field.value}
                        onChange={field.onChange}
                        assetGroups={assetGroups}
                      ></AssetPickerPopOver>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            {/* global error */}
            {form.formState.errors.root && (
              <p className="mt-3 text-sm text-red-600">
                {form.formState.errors.root?.message}
              </p>
            )}
          </form>
        </Form>
        <DialogFooter className="flex w-full flex-col justify-between gap-2">
          <Button
            disabled={form.formState.isSubmitting}
            form="category-form"
            type="submit"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin"></Loader2>
            )}
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
