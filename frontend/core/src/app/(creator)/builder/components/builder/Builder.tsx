"use client";

import React, { useEffect, useState, useRef } from "react";

//libraries
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//components
import {
  Slider,
  SliderSection,
  SliderStep,
} from "@/components/global/slider/Slider";
import {
  SliderTab,
  SliderTabTitle,
  SliderTabBody,
} from "@/components/global/slider/SliderTab";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MenuPreview from "../preview/MenuPreview";

//hooks
import { useSlider } from "@/lib/stores";

//data
import { getSliderData } from "./builderFormData";

//zod schema
const itemSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  icon: z.string().optional(),
});
const itemArraySchema = z.array(itemSchema);
const formSchema = z.object({
  color_palette: z.array(z.string()),
  global_border_radius: z.enum(["full", "lg", "md", "sm"]),
  global_interaction_animation_is_active: z.boolean().default(false),
  global_interaction_animation: z.enum([
    "ripple",
    "tactile",
    "ripple-tactile",
    "none",
  ]),
  main_page_type: z.enum(["single", "couple", "none"]),
  menu_sections: itemArraySchema,
  link_is_active: z.boolean().default(false),
  links: itemArraySchema,
  phone_number_is_active: z.boolean().default(false),
  phone_numbers: itemArraySchema,
  location_is_active: z.boolean().default(false),
  item_page_type: z.enum(["horizontal", "vertical"]),
  categories_display_type: z.enum(["slider", "circular"]),
  waiter_request_is_active: z.boolean().default(false),
  search_item_is_active: z.boolean().default(false),
});

//types
export type formSchemaType = z.infer<typeof formSchema>;
export type keyOfFormSchemaType = keyof formSchemaType;
import { type sliderDataType } from "./builderFormData";

export default function Builder({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { links: [], menu_sections: [], phone_numbers: [] },
  });

  const sliderData = getSliderData(form);

  const [validSections, setValidSections] = useState<sliderDataType[]>([]);
  const [activeConditionalInput, setActiveConditionalInput] =
    useState<keyOfFormSchemaType | null>(null);

  const activeSection = useSlider((state) => state.activeSection);
  const updateSectionCount = useSlider((state) => state.updateSectionCount);
  const updateActiveStepCount = useSlider(
    (state) => state.updateActiveStepCount
  );

  const formRef = useRef<HTMLFormElement>(null);

  //all conditions used for conditional inputs
  const conditions: keyOfFormSchemaType[] = ["phone_number_is_active"];

  const handleValueChange = (name: keyOfFormSchemaType) => {
    if (conditions.includes(name)) {
      if (activeConditionalInput === null) {
        setActiveConditionalInput(name);
      } else {
        setActiveConditionalInput(null);
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    const updatedValidSections = sliderData
      .filter((section) => {
        if (section.condition) {
          return section.condition();
        }
        return true;
      })
      .map((section) => ({
        ...section,
        steps: section.steps.filter((step) => {
          if (step.condition) {
            return step.condition();
          }
          return true;
        }),
      }));

    setValidSections(updatedValidSections);
    updateSectionCount(updatedValidSections.length);
    updateActiveStepCount(updatedValidSections[activeSection - 1].steps.length);
  }, [!activeConditionalInput ? "" : form.watch(activeConditionalInput)]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("valid");
  }

  const onInvalid = () => {
    alert("invalid");

    // Check and set default values for radio groups if not selected
    form.setValue("main_page_type", "couple");
    form.setValue("categories_display_type", "circular");
    form.setValue("item_page_type", "horizontal");
    form.setValue("global_border_radius", "full");

    // Programmatically submit the form after setting default values
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <Form {...form}>
      <div className="hidden h-full w-full" ref={ref}>
        {/* multipart form */}
        <form
          name="builder-form"
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="basis-8/12 px-32"
        >
          <Slider>
            {validSections.map((section, sectionIndex) => (
              <SliderSection
                key={sectionIndex}
                sectionNum={sectionIndex + 1}
                title={section.title}
              >
                {section.steps.map((step, stepIndex) => (
                  <SliderStep
                    key={stepIndex}
                    sectionNum={sectionIndex + 1}
                    stepNum={stepIndex + 1}
                    title={step.title}
                  >
                    {step.isRadioGroup ? (
                      // radio group section
                      <FormField
                        control={form.control}
                        name={step.name}
                        render={({ field }) => (
                          <FormControl>
                            <RadioGroup
                              dir="rtl"
                              onValueChange={field.onChange}
                              defaultValue={field.value as keyOfFormSchemaType}
                              value={field.value as keyOfFormSchemaType}
                              className="flex flex-col gap-4"
                            >
                              {step.tabs.map((tab, tabIndex) => (
                                <FormItem key={tabIndex}>
                                  <FormControl>
                                    <SliderTab
                                      onClick={() =>
                                        handleValueChange(field.name)
                                      }
                                      isActive={field.value === tab.value}
                                    >
                                      <SliderTabTitle
                                        title={tab.title}
                                        description={tab.description}
                                        iconSrc={tab.iconSrc}
                                      >
                                        <RadioGroupItem
                                          value={tab.value}
                                        ></RadioGroupItem>
                                      </SliderTabTitle>
                                      {tab.action && (
                                        <SliderTabBody
                                          isOpen={field.value === tab.value}
                                        >
                                          {tab.action}
                                        </SliderTabBody>
                                      )}
                                    </SliderTab>
                                  </FormControl>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        )}
                      />
                    ) : (
                      // switch section
                      <>
                        {step.tabs.map((tab, tabIndex) => (
                          <FormField
                            key={tabIndex}
                            control={form.control}
                            name={tab.name || "color_palette"}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <SliderTab
                                    onClick={() =>
                                      handleValueChange(
                                        field.name as keyOfFormSchemaType
                                      )
                                    }
                                    isActive={
                                      (field.value as boolean) ||
                                      (tab.alwaysOn as boolean)
                                    }
                                  >
                                    <SliderTabTitle
                                      title={tab.title}
                                      description={tab.description}
                                      iconSrc={tab.iconSrc}
                                    >
                                      {!tab.alwaysOn && (
                                        <Switch
                                          checked={field.value as boolean}
                                          onCheckedChange={field.onChange}
                                        ></Switch>
                                      )}
                                    </SliderTabTitle>
                                    {tab.action && (
                                      <SliderTabBody
                                        isOpen={
                                          (field.value as boolean) ||
                                          (tab.alwaysOn as boolean)
                                        }
                                      >
                                        {tab.action}
                                      </SliderTabBody>
                                    )}
                                  </SliderTab>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                      </>
                    )}
                  </SliderStep>
                ))}
              </SliderSection>
            ))}
          </Slider>
        </form>
        {/* live menu preview */}
        <section className="relative ml-20 flex h-screen basis-4/12 items-center justify-center">
          <MenuPreview></MenuPreview>
        </section>
      </div>
    </Form>
  );
}
