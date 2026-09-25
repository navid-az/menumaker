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

export default function CartStyleStep({ stepId }: { stepId: string }) {
  const { control } = useFormContext();
  const t = useTranslations('builder.builder.sections.itemsPage.steps.cartStyle')

  return (
    <SliderStep stepId={stepId}>
      <FormField
        control={control}
        name="cart_btn_display_type"
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
                      title={t("options.default.title")}
                      description={t(
                        "options.default.description"
                      )}
                      iconSrc="/images/form-icons/horizontal-layout.svg"
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
                    isActive={field.value === "compact"}
                  >
                    <SliderTabTitle
                      title={t("options.compact.title")}
                      description={t(
                        "options.compact.description"
                      )}
                      iconSrc="/images/form-icons/vertical-layout.svg"
                    >
                      <RadioGroupItem value="compact" />
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
