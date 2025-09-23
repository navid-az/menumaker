"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//actions
import { signInUser } from "@/app/actions";

//components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import RegisterBtn from "./RegisterBtn";

//hooks
import { useSearchParams } from "next/navigation";

//SVGs
import { Cross } from "@/app/components/svgs";

//utilities and functions
import { createCookie } from "@/app/actions";
import { usePhoneNumberStore } from "@/lib/stores";
import Link from "next/link";

export const FormSchema = z.object({
  phone_number: z.union([
    z
      .string()
      .max(15, {
        message: "شماره همراه نا معتبر میباشد",
      })
      .min(8),
    z.string().email(),
  ]),
  otp: z.string().max(6).min(6),
  invitation_token: z.string().optional(),
});

export function OtpForm({ length = 6 }: { length: number | undefined }) {
  const phone_number = usePhoneNumberStore((state) => state.phoneNumber);
  const searchParams = useSearchParams();
  const invitation_token = searchParams.get("token");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone_number: phone_number,
      otp: "",
      invitation_token: invitation_token || undefined,
    },
  });

  //form submitter
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const res = await signInUser(data);
    createCookie("access", res.access);
    createCookie("refresh", res.refresh);
    toast.success("ورود با موفقیت انجام شد");
  }
  function onInvalid(error: any) {
    toast.error("لطفا کد را به درستی وارد کنید");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="w-full gap-4"
      >
        {invitation_token && (
          <FormField
            control={form.control}
            name="invitation_token"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input type="hidden" value={invitation_token} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="کد را وارد کنید"
                    className="h-max border-2 border-sad-blue py-4 outline-none transition-all focus:border-primary focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex h-9 items-center">
            <Button
              size="sm"
              className="flex-1 rounded-sm bg-inherit text-primary transition-colors hover:bg-primary/10"
            >
              <p>ارسال مجدد کد</p>
            </Button>
            <div className="h-2/3 w-px space-y-4 bg-sad-blue"></div>
            <Button
              asChild
              size="sm"
              className="flex-1 rounded-sm bg-inherit text-primary transition-colors duration-300 hover:bg-primary/10"
            >
              <Link href="/register">
                <p>تصحیح شماره موبایل</p>
              </Link>
            </Button>
          </div>
          <RegisterBtn
            text="دریافت کد"
            isLoading={form.formState.isSubmitting}
          ></RegisterBtn>
        </div>
      </form>
    </Form>
  );
}
