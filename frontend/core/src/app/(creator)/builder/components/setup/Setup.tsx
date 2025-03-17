"use client";

import React, { useActionState, useEffect } from "react";

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
import {
  Slider,
  SliderSection,
  SliderStep,
} from "@/components/global/slider/Slider";
import Tile from "./Tile";
import { toast } from "sonner";

//hooks
import { useSlider } from "@/lib/stores";

//actions and functions
import { createBusiness } from "@/app/actions";

//types
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
  primary_service_type: z.enum(["in_person", "online"]),
  // restaurant_type: z.enum(["single", "multiple"]),
  // menuType: z.enum(["custom", "pre-made"]),
});

export default function Setup({
  handleCustomMenu,
  handlePreBuiltMenu,
  ref,
  setBusinessSlug,
}: {
  handleCustomMenu: () => void;
  handlePreBuiltMenu: () => void;
  ref: React.RefObject<HTMLFormElement | null>;
  setBusinessSlug: React.Dispatch<React.SetStateAction<string>>;
}) {
  const form = useForm<SetupSchemaType>({
    resolver: zodResolver(SetupSchema),
    defaultValues: {
      owner_name: "",
      name: "",
      name_en: "",
    },
  });

  const { updateSectionCount } = useSlider();

  //monitor the state of the form onSubmit
  const [formState, action, idPending] = useActionState(createBusiness, {
    success: false,
    error: "",
  });

  //set the correct section count on mount
  //the given number should reflect form's number of sections
  useEffect(() => {
    updateSectionCount(3);
  }, []);

  //inform user by the result of the form submission
  useEffect(() => {
    if (formState.error) {
      toast.error(formState.error, {
        cancel: { label: "باشه" },
      });
    } else if (formState.success) {
      //provide businessSlug value to builder form
      const businessSlug = form.watch("name_en");
      setBusinessSlug(businessSlug);

      toast.success("Business registered successfully!", {
        cancel: { label: "باشه" },
      });
    }
  }, [formState]);

  function onSubmit(values: SetupSchemaType) {
    action(values);
  }

  //if given data is not valid
  const onInvalid = () => {
    toast.error("لطفا به همه سوالات را پاسخ دهید", {
      cancel: {
        label: "باشه",
      },
    });
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
    onSubmit(formValues);

    // Handle user choice
    if (userChoice === "custom") {
      handleCustomMenu();
    } else if (userChoice === "pre-built") {
      handlePreBuiltMenu();
    }
  };

  return (
    <Form {...form}>
      <form
        name="setup-form"
        ref={ref}
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="hidden w-full px-52"
      >
        <Slider disableSubmitBtn>
          <SliderSection sectionNum={1} title="آشنایی با شما">
            <SliderStep sectionNum={1} stepNum={1} title="نام مدیر مجموعه">
              <FormField
                control={form.control}
                name="owner_name"
                render={({ field }) => (
                  <FormControl>
                    <FormItem>
                      <FormLabel>نام مدیر</FormLabel>
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
            <SliderStep sectionNum={1} stepNum={2} title="نام مدیر مجموعه">
              Yo
            </SliderStep>
          </SliderSection>
          <SliderSection sectionNum={2} title="آشنایی با مجموعه شما">
            <SliderStep sectionNum={2} stepNum={1} title="نام مجموعه شما">
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
            <SliderStep
              sectionNum={2}
              stepNum={2}
              title="نوع خدمات دهی مجموعه شما چگونه است؟"
            >
              <FormField
                control={form.control}
                name="service_type"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      dir="rtl"
                      className="flex h-80 w-full gap-4"
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
            <SliderStep
              sectionNum={2}
              stepNum={3}
              title="تمرکز مجموعه بیشتر روی کدام نوع خدمات دهی می باشد؟"
            >
              <FormField
                control={form.control}
                name="primary_service_type"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      dir="rtl"
                      className="flex h-80 w-full gap-4"
                    >
                      <Tile
                        title="بیشتر فروش حضوری داریم"
                        isActive={field.value === "in_person"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="in_person"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                      <Tile
                        title="بیشتر فروش آنلاین داریم"
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
            {/* <SliderStep
              sectionNum={2}
              stepNum={4}
              title="مقیاس مجموعه شما چقدر است؟"
              className="h-80 flex-row"
            >
              <FormField
                control={form.control}
                name="restaurant_type"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      dir="rtl"
                      className="flex h-80 w-full gap-4"
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
            </SliderStep> */}
          </SliderSection>
          <SliderSection title="منو مجموعه" sectionNum={3}>
            <SliderStep
              sectionNum={3}
              stepNum={1}
              title="منو مجموعتان همانطور که می خواهید"
              className="flex h-80 flex-row"
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
          </SliderSection>
        </Slider>
      </form>
    </Form>
  );
}
