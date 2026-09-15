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

export default function ItemStyleStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();

  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="items_display_type"
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
                    isActive={field.value === "half-image-stacked"}
                  >
                    <SliderTabTitle
                      title="تایپ ۱"
                      description="تصویر آیتم تمام سطح کارت رو میپوشونه"
                      iconSrc="/images/form-icons/horizontal-layout.svg"
                    >
                      <RadioGroupItem value="half-image-stacked"></RadioGroupItem>
                    </SliderTabTitle>
                  </SliderTab>
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <SliderTab
                    onClick={() => console.log("clicked")}
                    isActive={field.value === "full-bleed-overlay"}
                  >
                    <SliderTabTitle
                      title="تایپ ۲"
                      description="تصویر تنها بخشی از کارت رو میپوشونه"
                      iconSrc="/images/form-icons/vertical-layout.svg"
                    >
                      <RadioGroupItem value="full-bleed-overlay"></RadioGroupItem>
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
