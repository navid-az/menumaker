"use client";

import React, { useEffect, useState } from "react";

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
import ItemAdder from "@/components/global/ItemAdder";

//zod schema
const formSchema = z.object({
  main_page_type: z.enum(["single", "couple", "none"]),
  // menu_section_count: z.number().nonnegative().lt(4),
  menu_sections: z.array(
    z.object({
      id: z.string(),
      icon: z.string(),
      name: z.string(),
    })
  ),
  item_page_type: z.enum(["horizontal", "vertical"]),
  link_is_active: z.boolean().default(false),
  // link: z.string().array(),
  phone_number_is_active: z.boolean().default(false),
  // phone_number: z.string().array(),
  location_is_active: z.boolean().default(false),
  // location: z.string().array(),
  // item_page_type: z.enum(["horizontal", "vertical"]),
  categories_display_type: z.enum(["slider", "circular"]),
});

//types
export type formSchemaType = z.infer<typeof formSchema>;
type keyOfFormSchemaType = keyof formSchemaType;

export type stepTabBase = {
  title: string;
  description: string;
  iconSrc: string;
  isRadio?: boolean;
};
type stepTabType = stepTabBase &
  (
    | { isRadio: true; value: string; name: keyOfFormSchemaType }
    | { isRadio?: false; value?: string; name?: keyOfFormSchemaType }
  );

export type sliderStepBase = {
  title: string;
  isRadioGroup?: boolean;
  tabs: stepTabType[];
  condition: () => boolean;
};
type sliderStepType = sliderStepBase &
  (
    | { isRadioGroup: true; name: keyOfFormSchemaType }
    | { isRadioGroup?: false; name?: keyOfFormSchemaType }
  );

export type sliderDataType = {
  title: string;
  steps: sliderStepType[];
  condition: () => boolean;
};

export default function Page() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number_is_active: false,
      location_is_active: false,
      menu_sections: [],
      link_is_active: false,
    },
  });

  const sliderData: sliderDataType[] = [
    {
      title: "صفحه اصلی",
      condition: () => true,
      steps: [
        {
          title: "نوع قالب صفحه اصلی منو",
          isRadioGroup: true,
          name: "main_page_type",
          condition: () => true,
          tabs: [
            {
              title: "ساده",
              description: "یک دکمه اصلی برای ورود به صفحه منو",
              value: "single",
              iconSrc: "/images/form-icons/single.svg",
            },
            {
              title: "مینیمال",
              description: "دارای بخش های جداگانه مانند منو کافه و منو رستوران",
              value: "couple",
              iconSrc: "/images/form-icons/couple.svg",
            },
            {
              title: "مستطیلی",
              description:
                "مشتری بلافاصله پس از اسکن QR کد وارد صفحه آیتم ها میشود",
              value: "none",
              iconSrc: "/images/form-icons/none.svg",
            },
          ],
        },
        {
          title: "تعداد بخش های منو خود را مشخص کنید",
          isRadioGroup: true,
          name: "main_page_type",
          condition: () => true,
          tabs: [
            {
              title: "تک بخشی",
              description: "یک دکمه اصلی برای ورود به صفحه منو",
              value: "single",
              iconSrc: "/images/form-icons/single.svg",
            },
            {
              title: "چند بخشی",
              description: "دارای بخش های جداگانه مانند منو کافه و منو رستوران",
              value: "couple",
              iconSrc: "/images/form-icons/couple.svg",
            },
            {
              title: "بدون صفحه اصلی",
              description:
                "مشتری بلافاصله پس از اسکن QR کد وارد صفحه آیتم ها میشود",
              value: "none",
              iconSrc: "/images/form-icons/none.svg",
            },
          ],
        },
        {
          title: "ویژگی های مورد نظر خود را انتخاب کنید",
          condition: () => true,
          tabs: [
            {
              name: "link_is_active",
              title: "لینک ها",
              description: "لینک های تلگرام و اینستاگرام و ...",
              iconSrc: "/images/form-icons/link.svg",
            },
            {
              name: "phone_number_is_active",
              title: "شماره تماس",
              description: "لینک های تلگرام و اینستاگرام و ...",
              iconSrc: "/images/form-icons/phone.svg",
            },
            {
              name: "location_is_active",
              title: "موقعیت مکانی",
              description: "لینک های تلگرام و اینستاگرام و ...",
              iconSrc: "/images/form-icons/pin.svg",
            },
          ],
        },
        {
          title: "ویژگی های مورد نظر خود را انتخاب کنید",
          condition: () => form.watch("link_is_active"),
          tabs: [
            {
              name: "link_is_active",
              title: "لینک ها",
              description: "لینک های تلگرام و اینستاگرام و ...",
              iconSrc: "/images/form-icons/link.svg",
            },
            {
              name: "phone_number_is_active",
              title: "شماره تماس",
              description: "لینک های تلگرام و اینستاگرام و ...",
              iconSrc: "/images/form-icons/link.svg",
            },
            {
              name: "location_is_active",
              title: "موقعیت مکانی",
              description: "لینک های تلگرام و اینستاگرام و ...",
              iconSrc: "/images/form-icons/pin.svg",
            },
          ],
        },
      ],
    },
    {
      title: "صفحه آیتم ها",
      condition: () => form.watch("phone_number_is_active"),
      steps: [
        {
          title: "نوع قالب مورد نظر خود را انتخاب کنید",
          isRadioGroup: true,
          name: "item_page_type",
          condition: () => true,
          tabs: [
            {
              title: "افقی",
              description: "لیست آیتم ها به صورت افقی نمایش داده میشود",
              iconSrc: "/images/form-icons/horizenal-menu-icon.svg",
              value: "horizontal",
            },
            {
              title: "عمودی",
              description: "لیست آیتم ها به صورت عمودی نمایش داده میشود",
              iconSrc: "/images/form-icons/vertical-menu-icon.svg",
              value: "vertical",
            },
          ],
        },
        {
          title: "نوع نمایش دسته بندی آیتم ها را انتخاب کنید",
          isRadioGroup: true,
          name: "categories_display_type",
          condition: () => true,
          tabs: [
            {
              title: "اسلایدی",
              description: "مدل پیش فرز نمایش آیتم ها",
              iconSrc: "/images/form-icons/horizenal-menu-icon.svg",
              value: "slider",
            },
            {
              title: "چرخشی",
              description: "آیتم ها به صورت یک نیم دایره نمایش داده میشوند",
              iconSrc: "/images/form-icons/vertical-menu-icon.svg",
              value: "circular",
            },
          ],
        },
        {
          title: "ویژگی های مورد نظر خود را انتخاب کنید",
          condition: () => true,
          tabs: [
            {
              name: "link_is_active",
              title: "درخواست گارسون",
              description:
                "دکمه ای که به مشتری این امکان را میدهد که گارسون را صدا بزند",
              iconSrc: "/images/form-icons/ring.svg",
            },
            {
              name: "phone_number_is_active",
              title: "شماره تماس",
              description: "لینک های تلگرام و اینستاگرام و ...",
              iconSrc: "/images/form-icons/link-2.svg",
            },
            {
              name: "location_is_active",
              title: "موقعیت مکانی",
              description: "لینک های تلگرام و اینستاگرام و ...",
              iconSrc: "/images/form-icons/pin.svg",
            },
          ],
        },
      ],
    },
    {
      title: "شخصی سازی",
      condition: () => true,
      steps: [
        {
          title: "رنگبندی مورد نظر خود را انتخاب کنید",
          isRadioGroup: true,
          name: "item_page_type",
          condition: () => true,
          tabs: [
            {
              title: "افقی",
              description: "لیست آیتم ها به صورت افقی نمایش داده میشود",
              iconSrc: "/images/form-icons/horizenal-menu-icon.svg",
              value: "horizontal",
            },
            {
              title: "عمودی",
              description: "لیست آیتم ها به صورت عمودی نمایش داده میشود",
              iconSrc: "/images/form-icons/vertical-menu-icon.svg",
              value: "vertical",
            },
          ],
        },
        {
          title: "انیمیشن های مورد نظر خود را انتخاب کنید",
          isRadioGroup: true,
          name: "item_page_type",
          condition: () => true,
          tabs: [
            {
              title: "دکمه ها",
              description: "انیمیشن برای تمامی دکمه های منو",
              iconSrc: "/images/form-icons/horizenal-menu-icon.svg",
              value: "horizontal",
            },
            {
              title: "آیتم ها",
              description: "انیمیشن برای کارت آیتم",
              iconSrc: "/images/form-icons/vertical-menu-icon.svg",
              value: "vertical",
            },
          ],
        },
      ],
    },
  ];

  const [validSections, setValidSections] = useState<sliderDataType[]>([]);
  const [activeConditionalInput, setActiveConditionalInput] =
    useState<keyOfFormSchemaType | null>(null);

  const activeSection = useSlider((state) => state.activeSection);
  const updateSectionCount = useSlider((state) => state.updateSectionCount);
  const updateActiveStepCount = useSlider(
    (state) => state.updateActiveStepCount
  );

  //all conditions used for conditional inputs
  const conditions: keyOfFormSchemaType[] = [
    "phone_number_is_active",
    "link_is_active",
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

  function onSubmit(values: formSchemaType) {
    values["menu_sections"] = [{ id: "5", name: "sss", icon: "sss" }];
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                                    <SliderTabBody
                                      isOpen={field.value === tab.value}
                                    >
                                      <ItemAdder placeholder="نام بخش"></ItemAdder>
                                    </SliderTabBody>
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
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    ></Switch>
                                  </SliderTabTitle>
                                  <SliderTabBody isOpen={field.value}>
                                    <ItemAdder placeholder="نام بخش"></ItemAdder>
                                  </SliderTabBody>
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
