"use client";

import React, { useEffect, useState } from "react";

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
import Uploader from "./Uploader";

//SVGs
import { Plus, Loader2, Edit2 } from "lucide-react";

//libraries
import { FieldErrors } from "react-hook-form";

//hooks
import { useForm } from "react-hook-form";

//server actions
import { createItem, updateItem } from "@/app/actions";

//types
import { MenuCategory } from "@/app/types/api/menu";

type CreateItemFormType = {
  businessSlug: string;
  branchSlug?: string;
  categories: MenuCategory[];
  title: string;
  description: string;
  defaultValues?: {
    scope?: string;
    name?: string;
    description?: string;
    category: number;
    price: number;
    image?: string;
  };
  itemId?: number;
};

const FormSchema = z.object({
  scope: z.enum(["all", "only", "except"]).optional(),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB.",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      {
        message: "Only JPEG, PNG, or GIF images are allowed.",
      }
    )
    .optional(),
  name: z.string().min(2, {
    message: "نام آیتم باید حداقل ۲ حرف باشد",
  }),
  description: z.string().optional(),
  price: z.coerce.number(),
  category: z.number({
    required_error: "لطفا یک دسته را انتخاب کنید",
  }),
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? {
          scope: "all",
          name: defaultValues.name || "",
          description: defaultValues.description || "",
          category: defaultValues.category,
          price: defaultValues.price || 0,
          image: undefined,
        }
      : {
          scope: "all",
          name: "",
          description: "",
          price: 0,
          image: undefined,
        },
  });

  //control dialog component
  const [open, setOpen] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValues?.image ?? null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      form.setValue("image", file); // set FileList for RHF
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }
    if (branchSlug) {
      formData.append("branch_slug", branchSlug);
    }
    formData.append("scope", data.scope || "all");
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("category", data.category?.toString());
    formData.append("price", data.price.toString());
    try {
      if (!defaultValues && !itemId) {
        // Create new item
        const res = await createItem(businessSlug, formData);
        if (res?.success) {
          //wait for route revalidation to happen first
          setTimeout(() => {
            setOpen(false);
          }, 300);
          toast.success("آیتم با موفقیت ایجاد شد");
          form.reset();
        } else {
          toast.error(res?.error || "خطایی در ایجاد آیتم رخ داد.");
        }
      } else if (defaultValues && itemId) {
        // Update item
        const res = await updateItem(businessSlug, itemId, formData);

        if (res?.success) {
          setTimeout(() => {
            setOpen(false);
          }, 300);
          toast.success("آیتم با موفقیت ویرایش شد");
        } else {
          toast.error(res?.error || "خطایی در ویرایش آیتم رخ داد.");
        }
      }
    } catch (error) {
      toast.error("خطایی در ویرایش آیتم رخ داد. لطفاً دوباره تلاش کنید.");
    }
  }

  const onError = (errors: FieldErrors<any>) => {
    form.setError("root", {
      type: "required",
      message: "لطفا موارد الزامی را وارد کنید",
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
                              "flex items-center gap-2 rounded-lg border-2 flex-row-reverse transition-colors duration-200",
                              field.value === "all" && "border-primary"
                            )}
                          >
                            <Label
                              htmlFor="all"
                              className="flex gap-2 p-3 items-center flex-row-reverse font-medium w-full"
                            >
                              <RadioGroupItem value="all" id="all" />
                              <div className="flex flex-col items-end gap-2">
                                <p>همه شعبه ‌ها</p>

                                <p className="text-sm text-muted-foreground">
                                  این آیتم در تمام شعب نمایش داده خواهد شد
                                </p>
                              </div>
                            </Label>
                          </div>
                          <div
                            className={cn(
                              "flex items-center gap-2 rounded-lg border-2 flex-row-reverse transition-colors duration-200",
                              field.value === "only" && "border-primary"
                            )}
                          >
                            <Label
                              htmlFor="only"
                              className="flex gap-2 p-3 items-center flex-row-reverse font-medium w-full"
                            >
                              <RadioGroupItem value="only" id="only" />
                              <div className="flex flex-col items-end gap-2">
                                <p>فقط این شعبه</p>
                                <p className="text-sm text-muted-foreground">
                                  این آیتم فقط در همین شعبه نمایش داده می‌شود
                                </p>
                              </div>
                            </Label>
                          </div>
                          <div
                            className={cn(
                              "flex items-center gap-2 rounded-lg border-2 flex-row-reverse transition-colors duration-200",
                              field.value === "except" && "border-primary"
                            )}
                          >
                            <Label
                              htmlFor="except"
                              className="flex gap-2 p-3 items-center flex-row-reverse font-medium w-full"
                            >
                              <RadioGroupItem value="except" id="except" />
                              <div className="flex flex-col items-end gap-2">
                                <p>همه به‌ جز این شعبه</p>
                                <p className="text-sm text-muted-foreground">
                                  این آیتم در همه‌ی شعب نمایش داده می‌شود، به‌جز
                                  شعبه‌ی فعلی
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
              name="image"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor={rest.name}>تصویر</FormLabel>
                  <FormControl>
                    {/* <Uploader
                      value={field.value}
                      onChange={field.onChange}
                      name="image"
                      label="تصویر"
                    /> */}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      {...rest}
                    />
                  </FormControl>
                  {/* <div className=" relative h-20 w-20">
                    {previewUrl && (
                      <Image
                        fill
                        src={
                          previewUrl?.startsWith("blob:")
                            ? previewUrl
                            : `http://127.0.0.1:8000/${previewUrl}`
                        }
                        alt="Selected preview"
                        className="mt-2 h-20 rounded-md"
                      />
                    )}
                  </div> */}
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
                    <FormLabel htmlFor={field.name}>گروه</FormLabel>
                    <FormControl>
                      {/* ~~~~~ direction setter ~~~~~ */}
                      <Select
                        dir="rtl"
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder="دسته بندی"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              className="cursor-pointer transition-colors hover:bg-secondary"
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name || (
                                <Image
                                  width={25}
                                  height={25}
                                  alt={category.name || "category-icon"}
                                  src={
                                    "http://localhost:8000" +
                                    category.icon?.image
                                  }
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
                    <FormLabel htmlFor={field.name}>نام</FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center gap-2">
                        <Input
                          id={field.name}
                          placeholder="پیتزا پپرونی"
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
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-40"
                      placeholder="توضیحات مربوط به آیتم"
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
                  <FormLabel>قیمت</FormLabel>
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
              <Loader2 className="ml-2 h-4 w-4 animate-spin"></Loader2>
            )}
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
