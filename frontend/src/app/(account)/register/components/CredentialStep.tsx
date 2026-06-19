"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SliderStep } from "@/components/global/slider/Slider";
import React from "react";

export default function CredentialStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();
  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="phone_number"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                className="h-max border-2 border-sad-blue py-4 outline-none transition-all focus:border-primary focus-visible:ring-0"
                placeholder="شماره موبایل"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </SliderStep>
  );
}
