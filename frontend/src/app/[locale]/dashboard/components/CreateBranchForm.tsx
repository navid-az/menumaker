'use client'
import React, { useState, useEffect } from "react";

//components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

//SVGs
import { Loader2 } from "lucide-react";

//libraries
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";

//server actions
import { createBranch, updateBranch } from "@/app/actions";
import { type Branch } from "@/app/types/api/business";

//types
export type BranchFormType = z.infer<typeof FormSchema>;
type CreateBranchFormType = {
  business_slug: string;
  defaultValues?: Branch;
  branch_slug?: string;
  children: React.ReactNode;
};

export default function CreateBranchForm({
  defaultValues,
  business_slug,
  branch_slug,
  children,
}: CreateBranchFormType) {
  const t = useTranslations("dashboard.header.branchSelector.form");

  const FormSchema = z.object({
    name: z.string().trim().min(2, {
      message: t("validation.nameMin"),
    }),
    slug: z.string().optional(),
    address: z.string().trim().max(255, {
      message: t("validation.addressMax"),
    }).optional(),
    phone_number: z.string().max(20).refine(
      (value) => value === "" || /^\d+$/.test(value),
      {
        message: t("validation.phoneNumbersOnly"),
      }
    ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? {
        name: defaultValues.name ?? "",
        slug: defaultValues.slug ?? "",
        address: defaultValues.address ?? "",
        phone_number: defaultValues.phone_number ?? "",
      }
      : {
        name: "",
        slug: "",
        address: "",
        phone_number: "",
      },
  });

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues]);

  async function onSubmit(data: BranchFormType) {
    if (defaultValues && branch_slug) {
      const res = await updateBranch(business_slug, branch_slug, data);

      if (res?.success) {
        setTimeout(() => {
          setOpen(false);
        }, 300);

        toast.success(t("toasts.editSuccess"));
      } else {
        toast.error(t("toasts.editError"));
      }
    } else {
      const res = await createBranch(data, business_slug);

      if (res?.success) {
        setTimeout(() => {
          setOpen(false);
        }, 300);

        toast.success(t("toasts.createSuccess"));
        form.reset();
      } else {
        toast.error(t("toasts.createError"));
      }
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-start">
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription className="font-normal">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            id="item-form"
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t("inputs.name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder={t("inputs.name.placeHolder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-normal" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("inputs.phoneNumber.label")}</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder={t("inputs.phoneNumber.placeHolder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("inputs.address.label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-40"
                      placeholder={t("inputs.address.placeHolder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="flex w-full flex-col justify-between gap-2">
          <Button
            disabled={form.formState.isSubmitting}
            form="item-form"
            type="submit"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {t("buttons.create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
