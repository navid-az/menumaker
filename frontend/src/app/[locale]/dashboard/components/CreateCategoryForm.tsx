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
  defaultValues?: { name?: string, icon?: CategoryIcon };
  categoryId?: number;
};

//actions
import { createCategory, updateCategory } from "@/app/actions";
import { CategoryIcon } from "@/app/types/api/menu";
import { useTranslations } from "next-intl";

// zod schema
const IconSchema = z.object({
  id: z.number(),
  url: z.string(),
  name: z.string().default(""),
  media_type: z.literal("image").default("image"),
  collection: z.literal("icon_pack").default("icon_pack"),
  order: z.number().default(0),
});

export function CreateCategoryForm({
  businessSlug,
  assetGroups,
  title,
  description,
  defaultValues,
  categoryId,
}: CreateCategoryFormType) {
  const t = useTranslations('dashboard.data.categories.form')

  const FormSchema = z
    .object({
      name: z.string().optional(),
      icon: IconSchema.optional().nullable(),
    })
    .refine((data) => data.name || data.icon, {
      message: "Either name or icon must be provided.",
    });

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
        const payload = { name: data.name, icon: data.icon ? data.icon.id : undefined }
        // Create new category
        const res = await createCategory(businessSlug, payload);
        if (res?.success) {
          setTimeout(() => {
            setOpen(false);
          }, 300);
          toast.success(t("toasts.createSuccess"));
          form.reset();
        } else {
          toast.error(t("toasts.createError"));
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
          toast.success(t("toasts.editSuccess"));
        } else {
          toast.error(t("toasts.editError"));
        }
      }
    } catch (error) {
      toast.error(t("toasts.requestError"));
    }
  }

  const onError = (errors: FieldErrors<any>) => {
    form.setError("root", {
      type: "required",
      message: t("toasts.onError"),
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
            <Plus className="size-5"></Plus>
            <p>{title}</p>
          </Button>
        ) : (
          <Button size="icon" variant="ghost" className="rounded-full">
            <Edit2 className="size-5"></Edit2>
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
            <section className="flex w-full items-end gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('inputs.name.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('inputs.name.placeHolder')}
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
                        kind='icon'
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
              <Loader2 className="size-4 animate-spin"></Loader2>
            )}
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
