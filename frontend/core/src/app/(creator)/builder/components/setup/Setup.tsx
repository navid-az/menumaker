"use client";

import React, { useActionState, useEffect, useMemo } from "react";

//libraries
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Slider, SliderStep } from "@/components/global/slider/Slider";
import Tile from "./Tile";
import { toast } from "sonner";

//hooks
import { useSlider } from "@/lib/stores";

//actions
import { createBusiness } from "@/app/actions";

// functions
import { slugify } from "@/lib/slugify";

//libraries
import { motion, AnimatePresence } from "motion/react";

//types
import { BusinessType } from "@/app/dashboard/layout";
export type SetupSchemaType = z.infer<typeof SetupSchema>;

//zod schema
const SetupSchema = z.object({
  owner_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name_en: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  service_type: z.enum(["in_person", "online", "both"]),
  primary_service_type: z.enum(["in_person", "online"]).optional(),
  branch_structure: z.enum(["single", "multiple"]),
  // menuType: z.enum(["custom", "pre-made"]),
});

export default function Setup({
  handleCustomMenu,
  handlePreBuiltMenu,
  ref,
  setBusinessData,
}: {
  handleCustomMenu: () => void;
  handlePreBuiltMenu: () => void;
  ref: React.RefObject<HTMLFormElement | null>;
  setBusinessData: React.Dispatch<React.SetStateAction<BusinessType | null>>;
}) {
  const form = useForm<SetupSchemaType>({
    resolver: zodResolver(SetupSchema),
    defaultValues: {
      owner_name: "",
      name: "",
      name_en: "",
    },
  });

  const { sectionIndex, stepIndex, direction } = useSlider();

  const sections = [
    {
      id: "business_info",
      title: "آشنایی با شما",
      steps: [
        {
          id: "ownerInfo",
          subtitle: "",
          component: (
            <SliderStep stepId="ownerInfo">
              <FormField
                control={form.control}
                name="owner_name"
                render={({ field }) => (
                  <FormControl>
                    <FormItem>
                      <FormLabel>نام مدیر مجموعه</FormLabel>
                      <Input
                        type="text"
                        placeholder="نام و نام خانوادگی مدیر"
                        {...field}
                        className="h-14 border border-sad-blue bg-soft-blue text-base outline-none transition-all duration-300 focus:border-primary"
                      ></Input>
                    </FormItem>
                  </FormControl>
                )}
              />
            </SliderStep>
          ),
          show: true,
        },
        {
          id: "businessInfo",
          subtitle: "نام مجموعه و برند",
          component: (
            <SliderStep stepId="businessInfo">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormControl>
                    <FormItem>
                      <FormLabel>نام مجموعه</FormLabel>
                      <Input
                        type="text"
                        placeholder="نام مجموعه"
                        {...field}
                        className="h-14 border border-sad-blue bg-soft-blue text-base outline-none transition-all duration-300 focus:border-primary"
                      ></Input>
                    </FormItem>
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="name_en"
                render={({ field }) => (
                  <FormControl>
                    <FormItem>
                      <FormLabel>نام مجموعه به لاتین</FormLabel>
                      <Input
                        type="text"
                        placeholder="نام مجموعه (لاتین)"
                        {...field}
                        className="h-14 border border-sad-blue bg-soft-blue text-base outline-none transition-all duration-300 focus:border-primary"
                      ></Input>
                    </FormItem>
                  </FormControl>
                )}
              />
            </SliderStep>
          ),
          show: true,
        },
      ],
    },
    {
      id: "welcomePage",
      title: "آشنایی با مجموعه شما",
      steps: [
        {
          id: "serviceType",
          subtitle: "روش ارائه خدمات مجموعه چجوریه؟",
          component: (
            <SliderStep stepId="serviceType">
              <FormField
                control={form.control}
                name="service_type"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      dir="rtl"
                      className="flex flex-col sm:flex-row h-80 w-full gap-4"
                    >
                      <Tile
                        title="فقط حضوری"
                        isActive={field.value === "in_person"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="in_person"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                      <Tile
                        title="فقط آنلاین"
                        isActive={field.value === "online"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="online"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                      <Tile
                        title="حضوری و آنلاین"
                        isActive={field.value === "both"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="both"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </SliderStep>
          ),
          show: true,
        },
        {
          id: "primary_service_type",
          subtitle: "معمولاً مشتری‌هاتون چطور سفارش میدن؟",
          component: (
            <SliderStep stepId="primary_service_type">
              <FormField
                control={form.control}
                name="primary_service_type"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      dir="rtl"
                      className="flex flex-col sm:flex-row h-80 w-full gap-4"
                    >
                      <Tile
                        title="بیشتر سفارش حضوری"
                        isActive={field.value === "in_person"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="in_person"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                      <Tile
                        title="بیشتر سفارش آنلاین"
                        isActive={field.value === "online"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="online"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </SliderStep>
          ),
          show:
            form.watch("service_type") === "online" ||
            form.watch("service_type") === "both",
        },
        {
          id: "business_size",
          subtitle: "مقیاس مجموعه شما چقدره؟",
          component: (
            <SliderStep stepId="business_size" className="h-80 flex-row">
              <FormField
                control={form.control}
                name="branch_structure"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      dir="rtl"
                      className="flex flex-col sm:flex-row h-80 w-full gap-4"
                    >
                      <Tile title="یک شعبه" isActive={field.value === "single"}>
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="single"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                      <Tile
                        title="زنجیره ای"
                        isActive={field.value === "multiple"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="multiple"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </SliderStep>
          ),
          show: true,
        },
      ],
    },
    {
      id: "menu_prefrence",
      title: "ساخت منو دیجیتال",
      steps: [
        {
          id: "menu_preference",
          subtitle: "دوست دارید چطور منو دیجیتال شما ساخته بشه؟",
          component: (
            <SliderStep
              stepId="menu_preference"
              className="flex flex-col sm:flex-row h-80"
            >
              <Tile
                isButton
                title="شخصی سازی منو"
                onClick={() => handleSubmit("custom")}
              ></Tile>
              <Tile
                isButton
                title="انتخاب منو از پیش ساخته شده"
                onClick={() => handleSubmit("pre-built")}
              ></Tile>
            </SliderStep>
          ),
          show: true,
        },
      ],
    },
  ];

  const validSections = useMemo(() => {
    return sections
      .map((section) => ({
        ...section,
        steps: section.steps.filter((step) => step.show),
      }))
      .filter((section) => section.steps.length > 0);
  }, [form.watch()]);

  const activeSection = validSections[sectionIndex];
  const activeStep = activeSection.steps[stepIndex];

  async function onSubmit(values: SetupSchemaType) {
    const res = await createBusiness(values);
    if (res.error) {
      toast.error(res.error);
    } else {
      // pass newly made business data to parent state
      setBusinessData(res.data);

      toast.success("مجموعه شما با موفقیت ثبت شد!");
    }
  }

  //if given data is not valid
  const onInvalid = () => {
    toast.error("لطفا به همه سوالات را پاسخ دهید");
  };

  //submit form and proceed to the next step
  const handleSubmit = async (userChoice: "custom" | "pre-built") => {
    const isValid = await form.trigger();

    //opt out if form is invalid
    if (!isValid) {
      onInvalid();
      return;
    }

    //proceed if form is valid
    const formValues = form.getValues();
    console.log(formValues);

    onSubmit(formValues);

    // Handle user choice
    if (userChoice === "custom") {
      handleCustomMenu();
    } else if (userChoice === "pre-built") {
      handlePreBuiltMenu();
    }
  };

  // Animation variants for the step transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <Form {...form}>
      <form
        name="setup-form"
        ref={ref}
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="px-4 max-w-3xl w-full sm:px-12 md:px-16 lg:px-0 mx-auto"
      >
        <Slider validSections={validSections} disableSubmitBtn>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStep.id}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="absolute w-full"
            >
              {activeStep.component}
            </motion.div>
          </AnimatePresence>
        </Slider>
      </form>
    </Form>
  );
}
