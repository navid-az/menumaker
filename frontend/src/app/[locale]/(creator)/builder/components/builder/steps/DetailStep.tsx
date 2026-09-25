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
import { useTranslations } from "next-intl";

export default function DetailStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();
  const t = useTranslations("builder.builder.sections.customization.steps.detail.options");

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
                  title={t('borderRadius.title')}
                  description={t('borderRadius.description')}
                  iconSrc="/images/form-icons/border.svg"
                ></SliderTabTitle>
                <SliderTabBody isOpen>
                  <ButtonSelectGroup
                    className="justify-end rtl:justify-start rtl:flex-row-reverse"
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
                  title={t('priceUnit.title')}
                  description={t('priceUnit.description')}
                  iconSrc="/images/form-icons/border.svg"
                ></SliderTabTitle>
                <SliderTabBody isOpen>
                  <ButtonSelectGroup
                    className="justify-end rtl:justify-start rtl:flex-row-reverse"
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
              title={t('animation.title')}
              description={t('animation.description')}
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
                        t={t}
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
