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
import { toast } from "sonner";
import TagSelector, { type Tag } from "@/components/global/TagSelector";

//SVGs
import { Plus, Loader2, Edit2, UserPlus2 } from "lucide-react";

//libraries
import { FieldErrors } from "react-hook-form";

//hooks
import { useForm } from "react-hook-form";

//actions
import { invitePersonnel } from "@/app/actions/dashboard/personnel";

const roleMap: Record<string, number> = {
  manager: 1,
  chef: 1,
  cashier: 1,
  waiter: 2,
  storekeeper: 1,
};

//types
import { type Personnel } from "../personnel/columns";
type CreateUpdatePersonnelForm = {
  businessSlug: string;
  branchSlug?: string;
  title: string;
  description: string;
  defaultValues?: Personnel;
  branches: Tag[];
};

export const TagSchema = z.object({
  id: z.number().int().nonnegative(), // integer id (0+). use .positive() if you prefer >0
  name: z.string().min(1, "Name is required").max(100),
});

const FormSchema = z.object({
  role: z.enum(["manager", "chef", "cashier", "waiter", "storekeeper"]),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  invited_email: z.string().email("ایمیل معتبر وارد کنید"),
  branches: z.array(z.number()),
});

export function CreateUpdatePersonnelForm({
  businessSlug,
  branchSlug,
  title,
  description,
  defaultValues,
  branches,
}: CreateUpdatePersonnelForm) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? {
          role: "waiter",
          invited_email: defaultValues.invited_email || "",
          first_name: defaultValues.first_name || "",
          last_name: defaultValues.last_name || "",
          branches: defaultValues.branches || [],
        }
      : {
          role: "waiter",
          invited_email: "",
          first_name: "",
          last_name: "",
          branches: [],
        },
  });

  //control dialog component
  const [open, setOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    const normalizedData = {
      ...data,
      role: roleMap[data.role],
    };
    console.log(normalizedData);

    const res = await invitePersonnel(businessSlug, normalizedData);
    if (res?.success) {
      //wait for route revalidation to happen first
      setTimeout(() => {
        setOpen(false);
      }, 300);
      toast.success("پرسنل با موفقیت دعوت شد");
      form.reset();
    } else {
      toast.error(res?.detail || "خطایی در ایجاد آیتم رخ داد.");
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
            <UserPlus2 className="ml-2 h-5 w-5"></UserPlus2>
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
            <section className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor={field.name}>نام</FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center gap-2">
                        <Input id={field.name} {...field} />
                      </div>
                    </FormControl>
                    <FormMessage className="font-normal" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor={field.name}>نام خانوادگی</FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center gap-2">
                        <Input id={field.name} {...field} />
                      </div>
                    </FormControl>
                    <FormMessage className="font-normal" />
                  </FormItem>
                )}
              />
            </section>
            <FormField
              control={form.control}
              name="invited_email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor={field.name}>ایمیل</FormLabel>
                  <FormControl>
                    <div className="flex w-full items-center gap-2">
                      <Input type="email" id={field.name} {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="font-normal" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor={field.name}>سمت</FormLabel>
                  <FormControl>
                    {/* ~~~~~ direction setter ~~~~~ */}
                    <Select
                      dir="rtl"
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue placeholder="سمت"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager">
                          <div>مدیر</div>
                        </SelectItem>
                        <SelectItem value="chef">آشپز</SelectItem>
                        <SelectItem value="cashier">صندوق دار</SelectItem>
                        <SelectItem value="waiter">سالن دار</SelectItem>
                        <SelectItem disabled value="storekeeper">
                          انبار دار
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="font-normal" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="branches"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor={field.name}>شعبه ها</FormLabel>
                  <FormControl>
                    <TagSelector
                      value={field.value}
                      onChange={field.onChange}
                      data={branches}
                    ></TagSelector>
                  </FormControl>
                  <FormMessage className="font-normal" />
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
            دعوت پرسنل
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
