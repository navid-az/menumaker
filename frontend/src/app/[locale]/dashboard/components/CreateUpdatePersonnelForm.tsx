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
import { useTranslations } from "next-intl";

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
  branchSlug: string;
  title: string;
  description: string;
  defaultValues?: Personnel;
  branches: Tag[];
};

export function CreateUpdatePersonnelForm({
  businessSlug,
  branchSlug,
  title,
  description,
  defaultValues,
  branches,
}: CreateUpdatePersonnelForm) {
  const t = useTranslations("dashboard.personnel.form")

  const FormSchema = z.object({
    role: z.enum([
      "manager",
      "chef",
      "cashier",
      "waiter",
      "storekeeper",
    ]),

    first_name: z
      .string()
      .trim()
      .min(1, t("validation.firstNameRequired"))
      .max(100),

    last_name: z
      .string()
      .trim()
      .min(1, t("validation.lastNameRequired"))
      .max(100),

    invited_email: z
      .string()
      .email(t("validation.emailInvalid")),

    branches: z
      .array(z.number())
      .min(1, t("validation.branchRequired")),
  });

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

    const res = await invitePersonnel(businessSlug, branchSlug, normalizedData);
    if (res?.success) {
      //wait for route revalidation to happen first
      setTimeout(() => {
        setOpen(false);
      }, 300);
      toast.success(t('toasts.createSuccess'));
      form.reset();
    } else {
      toast.error(t('toasts.createError'));
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
            <UserPlus2 className="size-5"></UserPlus2>
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
            <section className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor={field.name}>{t("inputs.firstName.label")}</FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center gap-2">
                        <Input id={field.name} placeholder={t("inputs.firstName.placeHolder")} {...field} />
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
                    <FormLabel htmlFor={field.name}>
                      {t("inputs.lastName.label")}
                    </FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center gap-2">
                        <Input
                          id={field.name}
                          placeholder={t("inputs.lastName.placeHolder")}
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
              name="invited_email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor={field.name}>{t("inputs.email.label")}</FormLabel>
                  <FormControl>
                    <div className="flex w-full items-center gap-2">
                      <Input type="email" placeholder={t("inputs.email.placeHolder")} id={field.name} {...field} />
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
                  <FormLabel htmlFor={field.name}>
                    {t("inputs.role.label")}
                  </FormLabel>

                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue
                          placeholder={t("inputs.role.placeHolder")}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="manager">
                          {t("inputs.role.options.manager")}
                        </SelectItem>

                        <SelectItem value="chef">
                          {t("inputs.role.options.chef")}
                        </SelectItem>

                        <SelectItem value="cashier">
                          {t("inputs.role.options.cashier")}
                        </SelectItem>

                        <SelectItem value="waiter">
                          {t("inputs.role.options.waiter")}
                        </SelectItem>

                        <SelectItem disabled value="storekeeper">
                          {t("inputs.role.options.storekeeper")}
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
                  <FormLabel htmlFor={field.name}>{t("inputs.branches.label")}</FormLabel>
                  <FormControl>
                    <TagSelector
                      value={field.value}
                      onChange={field.onChange}
                      data={branches}
                      t={t}
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
              <Loader2 className="h-4 w-4 animate-spin" />
            )}

            {t("buttons.invite")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
