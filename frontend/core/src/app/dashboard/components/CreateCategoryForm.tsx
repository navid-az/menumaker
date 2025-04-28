"use client";

import { useRef, useActionState, useEffect } from "react";

//zod validator
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldErrors } from "react-hook-form";

//components
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { AssetPickerPopOver } from "@/components/global/itemAdderButtons/AssetPickerPopOver";

//hooks
import { useForm } from "react-hook-form";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

//types
import { type AssetGroupType } from "@/components/global/AssetPicker";

//server actions
import { createCategory } from "@/app/actions";

//zod schema
const IconSchema = z.object({
  name: z.string(),
  image: z.string(),
  id: z.number(),
});

const NameRequired = z.object({
  name: z.string(),
  icon: IconSchema.optional(),
});

const IconRequired = z.object({
  name: z.string().optional(),
  icon: IconSchema,
});

const RawFormSchema = z.union([NameRequired, IconRequired]);

const FormSchema = RawFormSchema.superRefine((data, ctx) => {
  if (!data.name && !data.icon) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "لطفاً حداقل نام یا آیکون را وارد کنید.",
      path: [""],
    });
  }
});

export function CreateCategoryForm({
  businessSlug,
  assetGroups,
}: {
  businessSlug: string;
  assetGroups: AssetGroupType[];
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await createCategory(businessSlug, data);
      if (res?.success) {
        toast.success("دسته بندی با موفقیت ایجاد شد");
      } else {
        toast.error(res?.error);
      }
    } catch (error) {
      toast.error("خطایی در ایجاد دسته بندی رخ داد. لطفاً دوباره تلاش کنید.");
    }
  }

  const onError = (errors: FieldErrors<any>) => {
    form.setError("root", {
      type: "required",
      message: "لطفاً حداقل نام یا آیکون را وارد کنید",
    });
  };

  //animate AssetPicker's trigger button
  const assetPickerRef = useRef<HTMLButtonElement>(null);
  useTactileAnimation(assetPickerRef);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} id="category-form">
        <section className="flex w-full items-end gap-2 space-y-6">
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
                    ref={assetPickerRef}
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
  );
}
