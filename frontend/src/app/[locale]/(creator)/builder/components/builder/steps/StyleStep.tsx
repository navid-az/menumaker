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

export default function StyleStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();

  const t = useTranslations("builder.builder.sections.customization.steps.style.options");

  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="global_styling.style"
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
                    isActive={field.value === "default"}
                  >
                    <SliderTabTitle
                      title={t("default.title")}
                      description={t(
                        "default.description"
                      )}
                      iconSrc="/images/form-icons/vertical-layout.svg"
                    >
                      <RadioGroupItem value="default" />
                    </SliderTabTitle>
                  </SliderTab>
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <SliderTab
                    onClick={() => console.log("clicked")}
                    isActive={field.value === "retro"}
                  >
                    <SliderTabTitle
                      title={t("retro.title")}
                      description={t(
                        "retro.description"
                      )}
                      iconSrc="/images/form-icons/horizontal-layout.svg"
                    >
                      <RadioGroupItem value="retro" />
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
