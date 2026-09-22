"use client";

import React, { useState } from "react";

//zod validator
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//libraries
import { cn } from "@/lib/utils";

//components
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

//SVGs
import { Plus, Loader2, Edit2 } from "lucide-react";

//libraries
import { FieldErrors } from "react-hook-form";

//hooks
import { useForm } from "react-hook-form";

//server actions
import { createItem, updateItem } from "@/app/actions";

//components
import ImageUploader from "@/components/global/ImageUploader";

//types
import { MenuCategory, MenuItem } from "@/app/types/api/menu";
import { useTranslations } from "next-intl";
type CreateItemFormType = {
  businessSlug: string;
  branchSlug?: string;
  categories: MenuCategory[];
  title: string;
  description: string;
  defaultValues?: MenuItem
  itemId?: number;
};

const ItemImageSchema = z.object({
  id: z.number(),
  url: z.string(),
});


export function CreateItemForm({
  businessSlug,
  branchSlug,
  categories,
  title,
  description,
  defaultValues,
  itemId,
}: CreateItemFormType) {
  const t = useTranslations('dashboard.data.items.form')

  const FormSchema = z.object({
    scope: z.enum(["all", "only", "except"]).optional(),
    item_images: z.array(ItemImageSchema).optional(),
    frontend_only: z.object({
      temp_id: z.string(),
    }),
    name: z.string().min(2, { message: "نام آیتم باید حداقل ۲ حرف باشد" }),
    description: z.string().optional(),
    price: z.coerce.number(),
    category: z.number({ required_error: "لطفا یک دسته را انتخاب کنید" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? {
        scope: "all",
        name: defaultValues.name || "",
        description: defaultValues.description || "",
        category: defaultValues.category,
        price: defaultValues.price || 0,
        item_images: defaultValues.item_images,
        frontend_only: { temp_id: crypto.randomUUID() }
      }
      : {
        scope: "all",
        name: "",
        description: "",
        price: 0,
        item_images: [],
        frontend_only: { temp_id: crypto.randomUUID() }
      },
  });

  //control dialog component
  const [open, setOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { frontend_only, item_images, ...rest } = data;

    const payload = {
      ...rest,
      temp_id: frontend_only.temp_id,
      branch_slug: branchSlug ?? undefined
    };

    try {
      if (!defaultValues && !itemId) {
        const res = await createItem(businessSlug, payload);
        if (res?.success) {
          setTimeout(() => setOpen(false), 300);
          toast.success(t('toasts.createSuccess'));
          form.reset();
        } else {
          toast.error(t('toasts.createError'));
        }
      } else if (defaultValues && itemId) {
        const res = await updateItem(businessSlug, itemId, payload);
        if (res?.success) {
          setTimeout(() => setOpen(false), 300);
          toast.success(t('toasts.editSuccess'));
        } else {
          toast.error(t('toasts.editError'));
        }
      }
    } catch (error) {
      toast.error(t('toasts.requestError'));
    }
  }

  const onError = (errors: FieldErrors<any>) => {
    form.setError("root", {
      type: "required",
      message: t('toasts.onError'),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!defaultValues ? (
          <Button
            disabled={categories.length === 0}
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
      <DialogContent className="gap-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent">
        <DialogHeader className="items-start">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="font-normal">
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            id="item-form"
            className="w-full space-y-6"
          >
            {branchSlug && (
              <FormField
                control={form.control}
                name="scope"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex flex-col gap-3 w-full">
                          <div
                            className={cn(
                              "flex items-center gap-2 rounded-lg border-2 transition-colors duration-200",
                              field.value === "all" && "border-primary"
                            )}
                          >
                            <Label
                              htmlFor="all"
                              className="flex gap-2 p-3 items-center font-medium w-full"
                            >
                              <RadioGroupItem value="all" id="all" />
                              <div className="flex flex-col gap-2">
                                <p>{t('inputs.scope.all.title')}</p>

                                <p className="text-sm text-muted-foreground">
                                  {t('inputs.scope.all.description')}
                                </p>
                              </div>
                            </Label>
                          </div>
                          <div
                            className={cn(
                              "flex items-center gap-2 rounded-lg border-2 transition-colors duration-200",
                              field.value === "only" && "border-primary"
                            )}
                          >
                            <Label
                              htmlFor="only"
                              className="flex gap-2 p-3 items-center font-medium w-full"
                            >
                              <RadioGroupItem value="only" id="only" />
                              <div className="flex flex-col gap-2">
                                <p>{t('inputs.scope.only.title')}</p>
                                <p className="text-sm text-muted-foreground">
                                  {t('inputs.scope.only.description')}
                                </p>
                              </div>
                            </Label>
                          </div>
                          <div
                            className={cn(
                              "flex items-center gap-2 rounded-lg border-2 transition-colors duration-200",
                              field.value === "except" && "border-primary"
                            )}
                          >
                            <Label
                              htmlFor="except"
                              className="flex gap-2 p-3 items-center font-medium w-full"
                            >
                              <RadioGroupItem value="except" id="except" />
                              <div className="flex flex-col gap-2">
                                <p>{t('inputs.scope.except.title')}</p>
                                <p className="text-sm text-muted-foreground">
                                  {t('inputs.scope.except.description')}
                                </p>
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="font-normal" />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="item_images"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor={field.name}>{t('inputs.image.label')}</FormLabel>
                  <FormControl>
                    <ImageUploader collection='item_gallery' maxFiles={1} value={field.value} onChange={field.onChange}></ImageUploader>
                  </FormControl>
                  <FormMessage className="font-normal" />
                </FormItem>
              )}
            />
            <section className="flex gap-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor={field.name}>{t('inputs.category.label')}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder={t('inputs.category.placeholder')}></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              className="cursor-pointer transition-colors hover:bg-secondary"
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name || (category.icon &&
                                <Image
                                  width={20}
                                  height={20}
                                  alt={category.name || "category-icon"}
                                  src={category.icon?.url}
                                ></Image>
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="font-normal" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor={field.name}>{t('inputs.name.label')}</FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center gap-2">
                        <Input
                          id={field.name}
                          placeholder={t('inputs.name.placeholder')}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-normal" />
                  </FormItem>
                )}
              />
            </section>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('inputs.description.label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-40"
                      placeholder={t('inputs.description.placeholder')}
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('inputs.price.label')}</FormLabel>
                  <FormControl>
                    <Input type="number" className="text-left" {...field} />
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
              <Loader2 className=" h-4 w-4 animate-spin"></Loader2>
            )}
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
