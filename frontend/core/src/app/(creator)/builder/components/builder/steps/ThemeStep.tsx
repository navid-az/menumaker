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

export default function ThemeStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();

  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="frontend_only.suggested_palette_enabled"
        render={({ field }) => (
          <SliderTab
            onClick={() => console.log("clicked")}
            isActive={field.value}
          >
            <SliderTabTitle
              title="پالت های پیشنهادی"
              description="ترکیب رنگ های پیش فرز"
              iconSrc="/images/form-icons/palette.svg"
            >
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  ></Switch>
                </FormControl>
              </FormItem>
            </SliderTabTitle>
            <SliderTabBody isOpen={field.value}>
              <FormField
                control={control}
                name="global_styling.color_palette"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <SuggestedPalettes
                        value={field.value}
                        onChange={field.onChange}
                      ></SuggestedPalettes>
                    </FormControl>
                  </FormItem>
                )}
              />
            </SliderTabBody>
          </SliderTab>
        )}
      />

      <SliderTab onClick={() => console.log("cum")} isActive>
        <SliderTabTitle
          title="رنگ بندی منو"
          description="پالت رنگی دلخواه خود را برای ظاهر منوی ایجاد کنید"
          iconSrc="/images/form-icons/pallet.svg"
        ></SliderTabTitle>
        <SliderTabBody isOpen>
          <FormField
            control={control}
            name="global_styling.color_palette"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <PaletteBuilder
                    value={field.value}
                    onChange={field.onChange}
                  ></PaletteBuilder>
                </FormControl>
              </FormItem>
            )}
          />
        </SliderTabBody>
      </SliderTab>
    </SliderStep>
  );
}
