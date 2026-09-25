"use client";

import React from "react";

//components
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { SliderStep } from "@/components/global/slider/Slider";
import {
  SliderTab,
  SliderTabTitle,
} from "@/components/global/slider/SliderTab";

//libraries
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

export default function MenuFeatureStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();
  const t = useTranslations('builder.builder.sections.itemsPage.steps.menuFeatures')


  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="call_waiter_enabled"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab
                onClick={() => console.log("clicked")}
                isActive={field.value}
              >
                <SliderTabTitle
                  title={t(
                    "options.callServer.title"
                  )}
                  description={t(
                    "options.callServer.description"
                  )}
                  iconSrc="/images/form-icons/concierge-bell.svg"
                >
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </SliderTabTitle>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="searchbar_enabled"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab
                onClick={() => console.log("clicked")}
                isActive={field.value}
              >
                <SliderTabTitle
                  title={t(
                    "options.itemSearch.title"
                  )}
                  description={t(
                    "options.itemSearch.description"
                  )}
                  iconSrc="/images/form-icons/search.svg"
                >
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </SliderTabTitle>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
    </SliderStep>
  );
}
