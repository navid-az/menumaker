"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useMutation } from "@tanstack/react-query";
import RegisterBtn from "./RegisterBtn";

//SVGs
import { Cross } from "@/app/components/svgs";

//utilities and functions
import { createCookie } from "@/app/actions";
import createToken from "../utils/createToken";
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
});

export function OtpForm({ length = 6 }: { length: number | undefined }) {
  const phone_number = usePhoneNumberStore((state) => state.phoneNumber);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { phone_number: phone_number, otp: "" },
  });

  //form submitter
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    createOtp.mutate(data);
  }

  const createOtp = useMutation({
    mutationFn: createToken,
    onSuccess: (data) => {
      const accessToken: string = data["data"]["access"];
      const refreshToken: string = data["data"]["refresh"];

      // create pair of new JWT tokens for the authenticated user
      createCookie("access", accessToken);
      createCookie("refresh", refreshToken);

      toast("خوش آمدی!", {
        cancel: {
          label: "باشه",
        },
      });
    },
    onError: () => {
      toast.error("کد نامعتبر میباشد", {
        cancel: {
          label: "باشه",
        },
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-4">
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
            isLoading={createOtp.isLoading}
          ></RegisterBtn>
        </div>
      </form>
    </Form>
  );
}
