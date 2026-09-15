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
import ItemAdder from "@/components/global/ItemAdder";

//libraries
import { useFormContext } from "react-hook-form";

//types
import { type AssetGroupType } from "@/components/global/AssetPicker";

export default function MenuSectionStep({
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
        name="welcome_page_layout"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                dir="rtl"
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                className="flex flex-col gap-4"
              >
                <FormItem>
                  <FormControl>
                    <SliderTab
                      onClick={() => console.log("clicked")}
                      isActive={field.value === "single"}
                    >
                      <SliderTabTitle
                        title="تک بخشی"
                        description="یک دکمه اصلی برای ورود به صفحه منو"
                        iconSrc="/images/form-icons/single.svg"
                      >
                        <RadioGroupItem value="single"></RadioGroupItem>
                      </SliderTabTitle>
                      <SliderTabBody isOpen={field.value === "single"}>
                        <FormField
                          control={control}
                          name="menu_sections"
                          render={({ field }) => (
                            <FormControl>
                              <ItemAdder
                                assetGroups={assetGroups}
                                name="menu_sections"
                                limit={1}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="نام بخش"
                              ></ItemAdder>
                            </FormControl>
                          )}
                        />
                      </SliderTabBody>
                    </SliderTab>
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormControl>
                    <SliderTab
                      onClick={() => console.log("clicked")}
                      isActive={field.value === "couple"}
                    >
                      <SliderTabTitle
                        title="چند بخشی"
                        description="دارای بخش های جداگانه مانند منو کافه و منو رستوران"
                        iconSrc="/images/form-icons/couple.svg"
                      >
                        <RadioGroupItem value="couple"></RadioGroupItem>
                      </SliderTabTitle>
                      <SliderTabBody isOpen={field.value === "couple"}>
                        <FormField
                          control={control}
                          name="menu_sections"
                          render={({ field }) => (
                            <FormControl>
                              <ItemAdder
                                assetGroups={assetGroups}
                                name="menu_sections"
                                limit={3}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="نام بخش"
                              ></ItemAdder>
                            </FormControl>
                          )}
                        />
                      </SliderTabBody>
                    </SliderTab>
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormControl>
                    <SliderTab
                      onClick={() => console.log("clicked")}
                      isActive={field.value === "none"}
                    >
                      <SliderTabTitle
                        title="بدون صفحه اصلی"
                        description="مشتری بلافاصله پس از اسکن QR کد وارد صفحه آیتم ها میشود"
                        iconSrc="/images/form-icons/none.svg"
                      >
                        <RadioGroupItem value="none"></RadioGroupItem>
                      </SliderTabTitle>
                    </SliderTab>
                  </FormControl>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </SliderStep>
  );
}
