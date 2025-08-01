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

export default function MenuFeatureStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();

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
                  title="درخواست گارسون"
                  description="دکمه ای که به مشتری این امکان را میدهد که گارسون را صدا بزند"
                  iconSrc="/images/form-icons/concierge-bell.svg"
                >
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  ></Switch>
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
                  title="جستجو آیتم ها"
                  description="قابلیت جستجو آیتم ها"
                  iconSrc="/images/form-icons/search.svg"
                >
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  ></Switch>
                </SliderTabTitle>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
    </SliderStep>
  );
}
