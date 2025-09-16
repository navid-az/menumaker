"use client";

import { useRouter } from "next/navigation";

//libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

//components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Cross } from "@/app/components/svgs";
import { toast } from "sonner";
import RegisterBtn from "./RegisterBtn";

//hooks
import { usePhoneNumberStore } from "@/lib/stores";

//types
import { InviteData } from "../page";

//schemas
const FormSchema = z.object({
  credential: z.union([
    z.coerce.string().min(8, { message: "شماره همراه نا معتبر میباشد" }),
    z.string().email({ message: "ایمیل نا معتبر میباشد" }),
  ]),
  email: z.optional(z.string().email()),
  phone_number: z.optional(z.string()),
});
const EmailSchema = z.string().email();

export function CredentialForm({ inviteData }: { inviteData?: InviteData }) {
  const updatePhoneNumber = usePhoneNumberStore(
    (state) => state.updatePhoneNumber
  );
  const router = useRouter();

  const postUserCredential = useMutation({
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
      toast.error("کد نامعتبر میباشد", {});
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const isEmail = EmailSchema.safeParse(data.credential);

    console.log(data);

    if (isEmail.success) {
      data.email = data.credential;
    } else {
      data.phone_number = data.credential;
      updatePhoneNumber(data.credential);
    }
    postUserCredential.mutate(data);
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
                  value={inviteData?.email && inviteData.email}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <RegisterBtn
          text="بعدی"
          isLoading={postUserCredential.isPending}
        ></RegisterBtn>
      </form>
    </Form>
  );
}
