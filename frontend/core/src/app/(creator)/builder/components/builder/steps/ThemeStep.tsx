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
import SuggestedPalettes from "@/components/global/SuggestedPalettes";
import PaletteBuilder from "@/components/global/PaletteBuilder";

//libraries
import { useFormContext } from "react-hook-form";

export default function ThemeStep() {
  const { control } = useFormContext();

  return (
    <SliderStep
      sectionNum={1}
      stepNum={1}
      title="رنگ بندی و ویژگی های ظاهری مورد نظر خود را انتخاب کنید"
    >
      <FormField
        control={control}
        name="categories_display_type"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab
                onClick={() => console.log("clicked")}
                isActive={field.value}
              >
                <SliderTabTitle
                  title="پالت های پیشنهادی"
                  description="ترکیب رنگ های پیش فرز"
                  iconSrc="/images/form-icons/palette.svg"
                >
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  ></Switch>
                </SliderTabTitle>
                <SliderTabBody isOpen={field.value}>
                  <SuggestedPalettes
                    palettes={[
                      ["#264653", "#E76F51"],
                      ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D"],
                      ["#CBDFBD", "#F19C79", "#A44A3F"],
                      ["#011627", "#FF3366", "#2EC4B6", "#F7B801", "#E71D36"],
                      ["#A8DADC", "#457B9D", "#E63946", "#F1FAEE"],
                    ]}
                  ></SuggestedPalettes>
                </SliderTabBody>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="categories_display_type"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab onClick={() => console.log("cum")} isActive>
                <SliderTabTitle
                  title="رنگ بندی منو"
                  description="پالت رنگی دلخواه خود را برای ظاهر منوی ایجاد کنید"
                  iconSrc="/images/form-icons/pallet.svg"
                ></SliderTabTitle>
                <SliderTabBody isOpen>
                  <PaletteBuilder></PaletteBuilder>
                </SliderTabBody>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
    </SliderStep>
  );
}
