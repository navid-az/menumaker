"use client";

import React, { useEffect, useState, useRef } from "react";

//libraries
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//components
import { Slider, SliderSection, SliderStep } from "./components/Slider";
import {
  SliderTab,
  SliderTabTitle,
  SliderTabBody,
} from "./components/SliderTab";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

//hooks
import { useSlider } from "@/lib/stores";

//data
import { getSliderData } from "./builderFormData";

//zod schema
const formSchema = z.object({
  main_page_type: z.enum(["single", "couple", "none"]),
  link_is_active: z.boolean().default(false),
  phone_number_is_active: z.boolean().default(false),
  location_is_active: z.boolean().default(false),
  item_page_type: z.enum(["horizontal", "vertical"]),
  // item_page_categories_type: z.enum(["simple", "animated"]),
  categories_display_type: z.enum(["slider", "circular"]),
  waiter_request_is_active: z.boolean().default(false),
  search_item_is_active: z.boolean().default(false),
  // menu_section_count: z.number().nonnegative().lt(4),
  // menu_sections: z.array(
  //   z.object({
  //     id: z.string(),
  //     icon: z.string(),
  //     name: z.string(),
  //   })
  // ),
  // link: z.string().array(),
  // phone_number: z.string().array(),
  // location: z.string().array(),
  // item_page_type: z.enum(["horizontal", "vertical"]),
});

//types
export type formSchemaType = z.infer<typeof formSchema>;
export type keyOfFormSchemaType = keyof formSchemaType;
import { sliderDataType } from "./builderFormData";

export default function Page() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    // defaultValues: {},
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
  const conditions: keyOfFormSchemaType[] = [
    "phone_number_is_active",
    // "link_is_active",
  ];

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
    console.log("submitted");
  }

  const onInvalid = () => {
    console.log("invalid");

    // Check and set default values for radio groups if not selected
    if (!form.getValues("main_page_type")) {
      form.setValue("main_page_type", "couple");
    }
    if (!form.getValues("categories_display_type")) {
      form.setValue("categories_display_type", "circular");
    }
    if (!form.getValues("item_page_type")) {
      form.setValue("item_page_type", "horizontal");
    }

    // Programmatically submit the form after setting default values
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <Form {...form}>
      <form
        name="builder-form"
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="h-screen w-screen"
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
                    <FormField
                      control={form.control}
                      name={step.name}
                      render={({ field }) => (
                        <FormControl>
                          <RadioGroup
                            dir="rtl"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
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
                    <>
                      {step.tabs.map((tab, tabIndex) => (
                        <FormField
                          key={tabIndex}
                          control={form.control}
                          name={tab.name}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <SliderTab
                                  onClick={() => handleValueChange(field.name)}
                                  isActive={field.value as boolean}
                                >
                                  <SliderTabTitle
                                    title={tab.title}
                                    description={tab.description}
                                    iconSrc={tab.iconSrc}
                                  >
                                    <Switch
                                      checked={field.value as boolean}
                                      onCheckedChange={field.onChange}
                                    ></Switch>
                                  </SliderTabTitle>
                                  {tab.action && (
                                    <SliderTabBody
                                      isOpen={field.value as boolean}
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
    </Form>
  );
}
