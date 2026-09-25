"use client";

import React from "react";

//components
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { SliderStep } from "@/components/global/slider/Slider";
import {
  SliderTab,
  SliderTabTitle,
  SliderTabBody,
} from "@/components/global/slider/SliderTab";
import ImageUploader from "@/components/global/ImageUploader";

//libraries
import { useFormContext } from "react-hook-form";

//types
import { type AssetGroupType } from "@/components/global/AssetPicker";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function HomeLayoutStep({
  stepId,
  assetGroups,
}: {
  stepId: string;
  assetGroups: AssetGroupType[];
}) {
  const { control } = useFormContext();
  const t = useTranslations('builder.builder.sections.welcomePage.steps.homeLayout')

  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="home_images"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab onClick={() => console.log("clicked")} isActive>
                <SliderTabTitle
                  title={t("options.images.title")}
                  description={t("options.images.description")}
                  iconSrc="/images/form-icons/images.svg"
                ></SliderTabTitle>
                <SliderTabBody isOpen>
                  <ImageUploader
                    maxFiles={3}
                    value={field.value}
                    onChange={field.onChange}
                    collection="menu_welcome"
                  ></ImageUploader>
                </SliderTabBody>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
      <SliderTab onClick={() => console.log("clicked")} isActive>
        <SliderTabTitle
          title={t("options.welcomeText.title")}
          description={t("options.welcomeText.description")}
          iconSrc="/images/form-icons/text-cursor-input.svg"
        />
        <SliderTabBody isOpen>
          <div className="flex w-full flex-col gap-2">
            <FormField
              control={control}
              name="home_title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("inputs.businessName.placeholder")} {...field}></Input>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="home_subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("inputs.welcomeMessage.placeholder")} {...field}></Input>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </SliderTabBody>
      </SliderTab>
    </SliderStep>
  );
}
