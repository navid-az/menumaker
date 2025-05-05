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

export default function CategoryStyleStep() {
  const { control } = useFormContext();

  return (
    <SliderStep
      sectionNum={3}
      stepNum={2}
      title="نوع نمایش دسته بندی آیتم ها را انتخاب کنید"
    >
      <FormField
        control={control}
        name="categories_display_type"
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
                    isActive={field.value === "slider"}
                  >
                    <SliderTabTitle
                      title="اسلایدی"
                      description="مدل پیش فرز نمایش آیتم ها"
                      iconSrc="/images/form-icons/horizontal-layout.svg"
                    >
                      <RadioGroupItem value="slider"></RadioGroupItem>
                    </SliderTabTitle>
                  </SliderTab>
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <SliderTab
                    onClick={() => console.log("clicked")}
                    isActive={field.value === "circular"}
                  >
                    <SliderTabTitle
                      title="چرخشی"
                      description="آیتم ها به صورت یک نیم دایره نمایش داده میشوند"
                      iconSrc="/images/form-icons/vertical-layout.svg"
                    >
                      <RadioGroupItem value="circular"></RadioGroupItem>
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
