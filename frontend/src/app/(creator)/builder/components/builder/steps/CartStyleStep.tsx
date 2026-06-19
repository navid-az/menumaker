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

export default function CartStyleStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();

  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="cart_btn_display_type"
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
                      title="حالت پیش‌فرض"
                      description=" تصویر آیتم های انتخاب‌ شده را همراه با تعداد آن ها نشان می‌دهد"
                      iconSrc="/images/form-icons/horizontal-layout.svg"
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
                    isActive={field.value === "compact"}
                  >
                    <SliderTabTitle
                      title="حالت فشرده"
                      description="مجموع تعداد آیتم های انتخاب شده نمایش داده می‌شود"
                      iconSrc="/images/form-icons/vertical-layout.svg"
                    >
                      <RadioGroupItem value="compact"></RadioGroupItem>
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
