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
import { useTranslations } from "next-intl";

export default function MenuLayoutStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();
  const t = useTranslations('builder.builder.sections.itemsPage.steps.menuLayout')


  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="items_page_layout"
        render={({ field }) => (
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              className="flex flex-col gap-4"
            >
              <FormItem>
                <FormControl>
                  <SliderTab
                    onClick={() => console.log("clicked")}
                    isActive={field.value === "horizontal"}
                  >
                    <SliderTabTitle
                      title={t('options.horizontal.title')}
                      description={t('options.horizontal.description')}
                      iconSrc="/images/form-icons/horizontal-layout.svg"
                    >
                      <RadioGroupItem value="horizontal"></RadioGroupItem>
                    </SliderTabTitle>
                  </SliderTab>
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <SliderTab
                    onClick={() => console.log("clicked")}
                    isActive={field.value === "vertical"}
                  >
                    <SliderTabTitle
                      title={t('options.vertical.title')}
                      description={t('options.vertical.description')}
                      iconSrc="/images/form-icons/vertical-layout.svg"
                    >
                      <RadioGroupItem value="vertical"></RadioGroupItem>
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
