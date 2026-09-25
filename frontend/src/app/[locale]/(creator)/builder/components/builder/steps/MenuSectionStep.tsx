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
import { useTranslations } from "next-intl";

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
  const t = useTranslations('builder.builder.sections.welcomePage.steps.menuSection')

  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="welcome_page_layout"
        render={({ field }) => (
          <FormItem>
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
                      isActive={field.value === "single"}
                    >
                      <SliderTabTitle
                        title={t('options.single.title')}
                        description={t('options.single.description')}
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
                                placeholder={t('inputs.sectionName.placeholder')}
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
                        title={t('options.couple.title')}
                        description={t('options.couple.description')}
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
                                placeholder={t('inputs.sectionName.placeholder')}
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
                        title={t('options.none.title')}
                        description={t('options.none.description')}
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
