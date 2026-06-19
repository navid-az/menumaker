"use client";

import React from "react";

//components
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SliderStep } from "@/components/global/slider/Slider";
import {
  SliderTab,
  SliderTabTitle,
  SliderTabBody,
} from "@/components/global/slider/SliderTab";

//libraries
import { useFormContext } from "react-hook-form";

export default function StyleStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();

  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="global_styling.style"
        render={({ field }) => (
          <FormControl>
            <RadioGroup
              dir="rtl"
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              className="flex flex-col gap-4"
            >
              <FormItem>
                <FormControl>
                  <SliderTab
                    onClick={() => console.log("clicked")}
                    isActive={field.value === "default"}
                  >
                    <SliderTabTitle
                      title="پیش فرض"
                      description="طراحی مدرن و مینیمال با تمرکز بر خوانایی، سادگی و تجربه کاربری روان."
                      iconSrc="/images/form-icons/vertical-layout.svg"
                    >
                      <RadioGroupItem value="default"></RadioGroupItem>
                    </SliderTabTitle>
                  </SliderTab>
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <SliderTab
                    onClick={() => console.log("clicked")}
                    isActive={field.value === "retro"}
                  >
                    <SliderTabTitle
                      title="رترو"
                      description="الهام‌گرفته از طراحی‌های قدیمی با خطوط ضخیم، سایه‌های پررنگ و حال‌و‌هوای نوستالژیک."
                      iconSrc="/images/form-icons/horizontal-layout.svg"
                    >
                      <RadioGroupItem value="retro"></RadioGroupItem>
                    </SliderTabTitle>
                  </SliderTab>
                </FormControl>
              </FormItem>
            </RadioGroup>
          </FormControl>
        )}
      />
    </SliderStep>
  );
}
