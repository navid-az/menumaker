"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";

//components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

//SVGs
import { LoadingSpinner } from "@/app/components/svgs/animated/loadingSpinner";
import { toast } from "sonner";
import { Cross } from "@/app/components/svgs";
import { createCookie } from "@/app/actions";

const FormSchema = z.object({
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

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    createOtp.mutate(data);
  }

  const createOtp = useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) => {
      return axios.post("http://127.0.0.1:8000/accounts/token/", data);
    },
    onSuccess: (data) => {
      const accessToken: string = data["data"]["access"];
      const refreshToken: string = data["data"]["refresh"];

      console.log(data);
      createCookie("access", accessToken);
      createCookie("refresh", refreshToken);

      toast("خوش آمدی!", {
        cancel: {
          label: <Cross />,
          onClick: () => console.log("Undo"),
        },
      });
    },
    onError: () => {
      toast.error("کد نامعتبر میباشد", {
        cancel: {
          label: <Cross />,
          onClick: () => console.log("Undo"),
        },
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره همراه</FormLabel>
              <FormControl>
                <Input
                  placeholder="شماره تلفن یا ایمیل"
                  maxLength={40}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>کد یکبار مصرف</FormLabel>
              <FormControl>
                <Input placeholder="کد را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="h-max w-full py-4 text-xl"
          type="submit"
          size="lg"
          disabled={createOtp.isLoading ? true : false}
        >
          <p
            className={` transition-all ${
              createOtp.isLoading ? "" : "-translate-x-3"
            }`}
          >
            دریافت کد
          </p>
          <span
            className={`mr-2 transition ${
              createOtp.isLoading ? "opacity-100" : "-translate-x-5 opacity-0"
            }`}
          >
            <LoadingSpinner size={20}></LoadingSpinner>
          </span>
        </Button>
      </form>
    </Form>
  );
}
