"use client";

import React, { useState } from "react";

// zod validator
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldErrors } from "react-hook-form";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
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

// SVGs
import { Loader2 } from "lucide-react";

// hooks
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

// actions
import { createTable, updateTable } from "@/app/actions";
import { useTranslations } from "next-intl";

// types
type CreateTableFormType = {
  businessSlug: string;
  branchSlug: string;
  title: string;
  description?: string;
  defaultValues?: z.infer<typeof FormSchema>;
  tableId?: number;
  children: React.ReactNode;
};

export function CreateTableForm({
  businessSlug,
  branchSlug,
  title,
  description,
  defaultValues,
  tableId,
  children,
}: CreateTableFormType) {
  const t = useTranslations('dashboard.liveManagement.form')

  const FormSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, t("validation.nameRequired")),
    seats: z.coerce
      .number()
      .int()
      .min(1, t("validation.seatsMin")),
    location_description: z.string().optional(),
  });

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
        // Create new table
        const res = await createTable(data, businessSlug, branchSlug);
        if (res?.success) {
          setTimeout(() => {
            setOpen(false);
          }, 300);
          toast.success(t('toasts.createSuccess'));
          form.reset();
        } else {
          toast.error(t('toasts.createError'));
        }
      } else if (defaultValues && tableId) {
        // Update table
        const res = await updateTable(data, businessSlug, branchSlug, tableId);
        if (res?.success) {
          setTimeout(() => {
            setOpen(false);
          }, 300);
          toast.success(t('toasts.editSuccess'));
          form.reset();
        } else {
          toast.error(t('toasts.createError'));
        }
      }
    } catch (error) {
      toast.error(t('toasts.requestError'));
    }
  }

  const onError = (errors: FieldErrors<any>) => {
    form.setError("root", {
      type: "required",
      message: t('toasts.onError')
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
                    <FormLabel>{t("inputs.name.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("inputs.name.placeHolder")}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("inputs.seats.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("inputs.seats.placeHolder")}
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </section>
            {/* form errors  */}
            <div className="pt-2">
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}

              {form.formState.errors.seats && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.seats.message}
                </p>
              )}
            </div>
            <FormField
              control={form.control}
              name="location_description"
              render={({ field }) => (
                <FormItem className="pt-6">
                  <FormLabel>{t("inputs.locationDescription.label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-40"
                      placeholder={t("inputs.locationDescription.placeHolder")}
                      {...field}
                    />
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
              <Loader2 className="h-4 w-4 animate-spin"></Loader2>
            )}
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
