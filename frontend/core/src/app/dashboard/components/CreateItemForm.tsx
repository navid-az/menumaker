"use client";

import React, { useState } from "react";

//zod validator
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//components
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

//SVGs
import { Plus, Loader2 } from "lucide-react";

//libraries
import { FieldErrors } from "react-hook-form";

//hooks
import { useForm } from "react-hook-form";

//server actions
import { createItem } from "@/app/actions";

const FormSchema = z.object({
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
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().optional(),
  price: z.coerce.number(),
  category: z.number({
    required_error: "Please select a category",
    invalid_type_error: "Category must be a number",
  }),
});

//types
import { type CategoriesType } from "@/app/(menu)/[menu_id]/menu/components/Items/MenuItemsWrapper";
type CreateItemFormType = {
  businessSlug: string;
  categories: CategoriesType[];
  title: string;
  description: string;
};

export function CreateItemForm({
  businessSlug,
  categories,
  title,
  description,
}: CreateItemFormType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  //control dialog component
  const [open, setOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append("image", data.image || "");
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("category", data.category.toString());
    formData.append("price", data.price.toString());
    try {
      const res = await createItem(businessSlug, formData);
      if (res?.success) {
        //wait for route revalidation to happen first
        setTimeout(() => {
          setOpen(false);
        }, 300);
        toast.success("دسته بندی با موفقیت ایجاد شد");
        form.reset();
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
      message: "لطفا موارد الزامی را وارد کنید",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="scale-pro rounded-full border-2 border-primary bg-soft-blue px-4 font-semibold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
        >
          <Plus className="ml-2 h-5 w-5"></Plus>
          <p>{title}</p>
        </Button>
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
            id="item-form"
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تصویر</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
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
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
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
