"use client";

import React from "react";

//components
import Image from "next/image";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { SliderStep } from "@/components/global/slider/Slider";
import {
  SliderTab,
  SliderTabTitle,
  SliderTabBody,
} from "@/components/global/slider/SliderTab";
import AnimationSelector from "@/components/global/itemAdderButtons/AnimationSelector";
import {
  ButtonSelect,
  ButtonSelectGroup,
} from "@/components/global/ButtonSelectGroup";

//libraries
import { useFormContext } from "react-hook-form";

export default function DetailStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();

  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="global_styling.border_radius"
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
                  <ButtonSelectGroup
                    className="flex-row-reverse"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ButtonSelect value="sm">
                      <Image
                        width={24}
                        height={24}
                        alt={`radius-sm`}
                        src={`/images/form-icons/radius-sm.svg`}
                      />
                    </ButtonSelect>
                    <ButtonSelect value="md">
                      <Image
                        width={24}
                        height={24}
                        alt={`radius-md`}
                        src={`/images/form-icons/radius-md.svg`}
                      />
                    </ButtonSelect>
                    <ButtonSelect value="lg">
                      <Image
                        width={24}
                        height={24}
                        alt={`radius-lg`}
                        src={`/images/form-icons/radius-lg.svg`}
                      />
                    </ButtonSelect>
                    <ButtonSelect value="full">
                      <Image
                        width={24}
                        height={24}
                        alt={`radius-full`}
                        src={`/images/form-icons/radius-full.svg`}
                      />
                    </ButtonSelect>
                  </ButtonSelectGroup>
                </SliderTabBody>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="global_styling.unit_display_type"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab onClick={() => console.log("clicked")} isActive>
                <SliderTabTitle
                  title="نمایش واحد قیمت"
                  description="نحوه نمایش واحد پول در کل منو را انتخاب کنید"
                  iconSrc="/images/form-icons/border.svg"
                ></SliderTabTitle>
                <SliderTabBody isOpen>
                  <ButtonSelectGroup
                    className="flex-row-reverse"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ButtonSelect value="default">
                      <p className="text-sm text-royal-green">تومان</p>
                    </ButtonSelect>
                    <ButtonSelect value="compact">
                      <Image
                        width={24}
                        height={24}
                        alt={`radius-sm`}
                        src={`/images/form-icons/compact-fr-unit.svg`}
                      />
                    </ButtonSelect>
                    <ButtonSelect value="persian_abbr">
                      <p className="text-xl text-royal-green">ت</p>
                    </ButtonSelect>
                    <ButtonSelect value="english_abbr">
                      <p className="text-xl text-royal-green font-sans">T</p>
                    </ButtonSelect>
                  </ButtonSelectGroup>
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
          <SliderTab
            onClick={() => console.log("clicked")}
            isActive={field.value}
          >
            <SliderTabTitle
              title="انیمیشن"
              description="انیمیشنی که هنگام کلیک روی اجزای منو اجرا میشود"
              iconSrc="/images/form-icons/sparkles.svg"
            >
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            </SliderTabTitle>
            <SliderTabBody isOpen={field.value}>
              <FormField
                control={control}
                name="global_styling.click_animation_type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <AnimationSelector
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </SliderTabBody>
          </SliderTab>
        )}
      />
    </SliderStep>
  );
}
