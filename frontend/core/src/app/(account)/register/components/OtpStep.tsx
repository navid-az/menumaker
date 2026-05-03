"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { SliderStep } from "@/components/global/slider/Slider";
import React from "react";

export default function OtpStep({
  focus,
  stepId,
}: {
  focus: boolean;
  stepId: string;
}) {
  const { control } = useFormContext();
  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="otp"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputOTP {...field} maxLength={6} dir="ltr" autoFocus={focus}>
                <InputOTPGroup dir="ltr" className="px-16">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </SliderStep>
  );
}
