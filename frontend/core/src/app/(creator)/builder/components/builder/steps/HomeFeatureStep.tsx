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
import ItemAdder from "@/components/global/ItemAdder";

//libraries
import { useFormContext } from "react-hook-form";

//types
import { type AssetGroupType } from "@/components/global/AssetPicker";

export default function HomeFeatureStep({
  stepId,
  assetGroups,
}: {
  stepId: string;
  assetGroups: AssetGroupType[];
}) {
  const { control } = useFormContext();

  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="show_social_links"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab
                onClick={() => console.log("clicked")}
                isActive={field.value}
              >
                <SliderTabTitle
                  title="لینک ها"
                  description="لینک های تلگرام و اینستاگرام و ..."
                  iconSrc="/images/form-icons/link.svg"
                >
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  ></Switch>
                </SliderTabTitle>
                <SliderTabBody isOpen={field.value}>
                  <ItemAdder
                    assetGroups={assetGroups}
                    name="social_links"
                    limit={4}
                    placeholder="نام بخش"
                  ></ItemAdder>
                </SliderTabBody>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="show_phone_numbers"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab
                onClick={() => console.log("clicked")}
                isActive={field.value}
              >
                <SliderTabTitle
                  title="شماره تماس"
                  description="لینک های تلگرام و اینستاگرام و ..."
                  iconSrc="/images/form-icons/phone.svg"
                >
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  ></Switch>
                </SliderTabTitle>
                <SliderTabBody isOpen={field.value}>
                  <ItemAdder
                    assetGroups={assetGroups}
                    name="phone_numbers"
                    limit={3}
                    placeholder="نام بخش"
                  ></ItemAdder>
                </SliderTabBody>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="show_branches"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab
                onClick={() => console.log("clicked")}
                isActive={field.value}
              >
                <SliderTabTitle
                  title="موقعیت مکانی"
                  description="لینک های تلگرام و اینستاگرام و ..."
                  iconSrc="/images/form-icons/pin.svg"
                >
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  ></Switch>
                </SliderTabTitle>
                <SliderTabBody isOpen={field.value}>
                  <ItemAdder
                    assetGroups={assetGroups}
                    name="phone_numbers"
                    limit={3}
                    placeholder="نام بخش"
                  ></ItemAdder>
                </SliderTabBody>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
    </SliderStep>
  );
}
