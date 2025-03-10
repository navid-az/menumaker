"use client";

import React, { useEffect, useState, useRef, useActionState } from "react";

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
import { toast } from "sonner";

//hooks
import { useSlider } from "@/lib/stores";

//form's data
import { getSliderData } from "./builderFormData";

//actions and functions
import { createMenu } from "@/app/actions";

//zod schemas
const InstanceSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string().optional(),
    icon: z.string().optional(),
  })
);
const BusinessSchema = z.object({
  phone_numbers: InstanceSchema,
  social_links: InstanceSchema,
  branches: z.array(z.string()),
});
const GlobalStylingSchema = z.object({
  color_palette: z
    .array(
      z
        .string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color")
    )
    .default([]),
  border_radius: z.enum(["sm", "md", "lg", "full"]),
  click_animation_enabled: z.boolean().default(false),
  click_animation_type: z.array(z.enum(["ripple", "tactile"])).optional(),
  // unit_display_type: z.enum(["simp", "comp", "engL", "perL"]),
});
const BuilderSchema = z.object({
  welcome_page_layout: z.enum(["single", "couple", "none"]),
  menu_sections: InstanceSchema,
  show_social_links: z.boolean().default(false),
  show_phone_numbers: z.boolean().default(false),
  show_branches: z.boolean().default(false),
  items_page_layout: z.enum(["horizontal", "vertical"]),
  // items_display_type: z.enum(["modern", "square", "list"]), //
  categories_display_type: z.enum(["slider", "circular"]),
  call_waiter_enabled: z.boolean().default(false),
  searchbar_enabled: z.boolean().default(false),
  business: BusinessSchema, // Nested Business schema
  global_styling: GlobalStylingSchema, // Nested Global Styling schema
});

//types
import { type sliderDataType } from "./builderFormData";
export type GlobalStylingType = z.infer<typeof GlobalStylingSchema>;
export type BuilderFormType = z.infer<typeof BuilderSchema>;
export type keyOfBuilderSchemaType = keyof BuilderFormType;
export type keyOfGlobalStylingSchemaType = keyof GlobalStylingType;

//builder multipart form
export default function Builder({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const form = useForm<BuilderFormType>({
    resolver: zodResolver(BuilderSchema),
    defaultValues: {
      business: { social_links: [], phone_numbers: [], branches: [] },
      menu_sections: [],
    },
  });

  const sliderData = getSliderData(form);

  const [validSections, setValidSections] = useState<sliderDataType[]>([]);
  const [activeConditionalInput, setActiveConditionalInput] =
    useState<keyOfBuilderSchemaType | null>(null);

  //monitor the state of the form onSubmit
  const [formState, action, pending] = useActionState(createMenu, {
    success: null,
    error: null,
  });

  //global states
  const activeSection = useSlider((state) => state.activeSection);
  const updateSectionCount = useSlider((state) => state.updateSectionCount);
  const updateActiveStepCount = useSlider(
    (state) => state.updateActiveStepCount
  );

  const formRef = useRef<HTMLFormElement>(null);

  //all conditions used for conditional inputs
  const conditions: keyOfBuilderSchemaType[] = ["show_phone_numbers"];

  const handleValueChange = (name: keyOfBuilderSchemaType) => {
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

  //inform user by the result of the form submission
  useEffect(() => {
    if (formState.error) {
      toast.error(formState.error, {
        cancel: { label: "باشه" },
      });
    } else if (formState.success) {
      toast.success("Menu created successfully!", {
        cancel: { label: "باشه" },
      });
    }
  }, [formState]);

  function onSubmit(values: BuilderFormType) {
    console.log("values:", values);

    const { business, global_styling, ...menuData } = values;

    //destructure color_palette array of hex codes
    const [primary_color, secondary_color, tertiary_color, bg_color] =
      global_styling.color_palette;

    delete global_styling.color_palette;

    const payload = {
      businessSlug: "shandiz",
      data: {
        ...menuData,
        global_styling: {
          ...global_styling,
          primary_color,
          secondary_color,
          tertiary_color,
          bg_color,
        },
      },
    };

    console.log("payload:", payload);

    //call server action
    action(payload);
  }

  const onInvalid = (errors: BuilderFormType) => {
    console.log("invalid:", errors);

    // Check and set default values for radio groups if not selected
    form.setValue("welcome_page_layout", "couple");
    form.setValue("categories_display_type", "circular");
    form.setValue("items_page_layout", "horizontal");
    form.setValue("global_styling.border_radius", "full");

    // Programmatically submit the form after setting default values
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <Form {...form}>
      <div className="flex h-full w-full" ref={ref}>
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
                              defaultValue={
                                field.value as keyOfBuilderSchemaType
                              }
                              value={field.value as keyOfBuilderSchemaType}
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
                      //if isRadioGroup is false generate a switch instead
                      <>
                        {step.tabs.map((tab, tabIndex) => (
                          <FormField
                            key={tabIndex}
                            control={form.control}
                            name={tab.name || "call_waiter_enabled"}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <SliderTab
                                    onClick={() =>
                                      handleValueChange(
                                        field.name as keyOfBuilderSchemaType
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
