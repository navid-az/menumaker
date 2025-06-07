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

export default function HomeLayoutStep({
  assetGroups,
}: {
  assetGroups: AssetGroupType[];
}) {
  const { control } = useFormContext();

  return (
    <SliderStep
      sectionNum={2}
      stepNum={1}
      title="ویژگی های مورد نظر خود را انتخاب کنید"
    >
      <FormField
        control={control}
        name="home_images"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SliderTab onClick={() => console.log("clicked")} isActive>
                <SliderTabTitle
                  title="تصاویر"
                  description="لینک های تلگرام و اینستاگرام و ..."
                  iconSrc="/images/form-icons/link.svg"
                ></SliderTabTitle>
                <SliderTabBody isOpen>
                  <ImageUploader
                    value={field.value}
                    onChange={field.onChange}
                  ></ImageUploader>
                </SliderTabBody>
              </SliderTab>
            </FormControl>
          </FormItem>
        )}
      />
      <SliderTab onClick={() => console.log("clicked")} isActive>
        <SliderTabTitle
          title="نوشته صفحه"
          description="لینک های تلگرام و اینستاگرام و ..."
          iconSrc="/images/form-icons/phone.svg"
        />
        <SliderTabBody isOpen>
          <div className="flex w-full flex-col gap-2">
            <FormField
              control={control}
              name="home_title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={"نام مجموعه"} {...field}></Input>
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
                    <Input placeholder={"متن کوتاه"} {...field}></Input>
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
