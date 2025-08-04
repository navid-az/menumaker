import React, { useState } from "react";

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
import { Loader2, Plus } from "lucide-react";

//libraries
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type FieldErrors } from "react-hook-form";

//server actions
import { createBranch } from "@/app/actions";

//types
export type BranchFormType = z.infer<typeof FormSchema>;
type CreateBranchFormType = {
  business_slug: string;
  defaultValues?: BranchFormType;
};

//zod schema
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "نام شعبه باید حداقل ۲ حرف باشد",
  }),
  slug: z.string().optional(),
  address: z.string().optional(),
  phone_number: z.string().max(15).optional(),
});

export default function CreateBranchForm({
  defaultValues,
  business_slug,
}: CreateBranchFormType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? {
          name: defaultValues.name || "",
          slug: defaultValues.slug || "",
          address: defaultValues.address || "",
          phone_number: "",
        }
      : {
          name: "",
          slug: "",
          address: "",
          phone_number: "",
        },
  });

  const [open, setOpen] = React.useState(false);

  async function onSubmit(data: BranchFormType) {
    const res = await createBranch(data, business_slug);
    if (res?.success) {
      //wait for route revalidation to happen first
      setTimeout(() => {
        setOpen(false);
      }, 300);
      toast.success("شعبه با موفقیت ایجاد شد");
      form.reset();
    } else {
      toast.error(res?.error || "خطایی در ایجاد شعبه رخ داد.");
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
        <Button className="scale-pro rounded-lg mt-2 border-2 border-primary bg-soft-blue px-4 font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground">
          <Plus className="ml-2 h-5 w-5"></Plus>
          <p>ایجاد شعبه جدید</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-start">
          <DialogTitle>ایجاد شعبه جدید</DialogTitle>
          <DialogDescription className="font-normal">
            شعبه جدیدی برای مجموعه خود ثبت کنید
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
                  <FormLabel htmlFor={field.name}>نام</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder='مثلاً "تهران-فرمانیه"'
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
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder="شماره تماس شعبه را وارد کنید"
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
                  <FormLabel>آدرس شعبه</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-40"
                      placeholder='مثلاً "تهران، اکباتان، فاز ۳، روبه‌روی نانوایی"'
                      {...field}
                    ></Textarea>
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
            ایجاد شعبه جدید
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
