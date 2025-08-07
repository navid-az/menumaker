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
import { Textarea } from "@/components/ui/textarea";
import { createTable } from "@/app/actions";

// types
type CreateTableFormType = {
  branchSlug: string;
  title: string;
  description: string;
  defaultValues?: z.infer<typeof FormSchema>;
  tableId?: number;
};

//actions
// import { createTable, updateTable } from "@/app/actions";

const FormSchema = z.object({
  name: z.string(),
  seats: z.number(),
  location_description: z.string().optional(),
});

export function CreateTableForm({
  branchSlug,
  title,
  description,
  defaultValues,
  tableId,
}: CreateTableFormType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? {
          name: defaultValues.name || "",
          seats: defaultValues.seats || 2,
          location_description: defaultValues.location_description || "",
        }
      : {
          name: "",
          seats: 2,
          location_description: "",
        },
  });

  // control dialog component
  const [open, setOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!defaultValues && !tableId) {
        // Create new category
        const res = await createTable(data, branchSlug);
        if (res?.success) {
          setTimeout(() => {
            setOpen(false);
          }, 300);
          toast.success("مییز با موفقیت ایجاد شد");
          form.reset();
        } else {
          toast.error(res?.error || "خطایی در ایجاد میز رخ داد.");
        }
      } else if (defaultValues && tableId) {
      }
    } catch (error) {
      toast.error("خطایی در پردازش درخواست رخ داد. لطفاً دوباره تلاش کنید.");
    }
  }

  const onError = (errors: FieldErrors<any>) => {};

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
          <form onSubmit={form.handleSubmit(onSubmit, onError)} id="table-form">
            <section className="flex w-full items-end gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>نام میز</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="تراس ۲، سالن غربی ۳،VIP -1"
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
                name="seats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تعداد صندلی</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="تعداد صندلی"
                        type="number"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <FormField
              control={form.control}
              name="location_description"
              render={({ field }) => (
                <FormItem className="pt-6">
                  <FormLabel>توضیجات</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-40"
                      placeholder="توضیحات محل میز..."
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            form="table-form"
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
