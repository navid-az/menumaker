"use client";

import React from "react";

//components
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { SliderStep } from "@/components/global/slider/Slider";
import {
  SliderTab,
  SliderTabTitle,
  SliderTabBody,
} from "@/components/global/slider/SliderTab";
import RadiusSelector from "@/components/global/itemAdderButtons/RadiusSelector";
import AnimationSelector from "@/components/global/itemAdderButtons/AnimationSelector";

//libraries
import { useFormContext } from "react-hook-form";

export default function StyleStep() {
  const { control } = useFormContext();

  return (
    <SliderStep
      sectionNum={1}
      stepNum={2}
      title="رنگ بندی و ویژگی های ظاهری مورد نظر خود را انتخاب کنید"
    >
      <FormField
        control={control}
        name="categories_display_type"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab onClick={() => console.log("clicked")} isActive>
                <SliderTabTitle
                  title="خمیدگی گوشه ها"
                  description="میزان خمیدگی گوشه های اجزای منو"
                  iconSrc="/images/form-icons/border.svg"
                ></SliderTabTitle>
                <SliderTabBody isOpen>
                  <RadiusSelector></RadiusSelector>
                </SliderTabBody>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="global_styling.click_animation_enabled"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab
                onClick={() => console.log("clicked")}
                isActive={field.value}
              >
                <SliderTabTitle
                  title="انیمیشن"
                  description="انیمیشنی که هنگام کلیک روی اجزای منو اجرا میشود"
                  iconSrc="/images/form-icons/sparkles.svg"
                >
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  ></Switch>
                </SliderTabTitle>
                <SliderTabBody isOpen={field.value}>
                  <AnimationSelector></AnimationSelector>
                </SliderTabBody>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
    </SliderStep>
  );
}
