"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Cross } from "@/app/components/svgs";
import { useRouter } from "next/navigation";
import RegisterBtn from "./RegisterBtn";
import { usePhoneNumberStore } from "@/lib/stores";

const FormSchema = z.object({
  credential: z.union([
    z.coerce.string().min(8, { message: "شماره همراه نا معتبر میباشد" }),
    z.string().email({ message: "ایمیل نا معتبر میباشد" }),
  ]),
});

const EmailSchema = z.string().email();

export function CredentialForm() {
  const updatePhoneNumber = usePhoneNumberStore(
    (state) => state.updatePhoneNumber
  );
  const router = useRouter();

  const sendUserCredential = useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) => {
      return axios.post(
        "http://127.0.0.1:8000/accounts/validate-credential/",
        data
      );
    },
    mutationKey: ["credential"],
    onSuccess: (data) => {
      router.push("/register/otp");
    },
    onError: (error) => {
      toast.error("کد نامعتبر میباشد", {
        cancel: {
          label: <Cross />,
        },
      });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const isEmail = EmailSchema.safeParse(data.credential);

    if (isEmail.success == true) {
      data.email = data.credential;
    } else {
      data.phone_number = data.credential;
      delete data.credential;
      updatePhoneNumber(data.phone_number);
    }
    sendUserCredential.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="credential"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="h-max border-2 border-sad-blue py-4 outline-none transition-all focus:border-primary focus-visible:ring-0"
                  placeholder="شماره همراه یا ایمیل"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <RegisterBtn
          text="بعدی"
          isLoading={sendUserCredential.isLoading}
        ></RegisterBtn>
      </form>
    </Form>
  );
}
