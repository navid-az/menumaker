"use client";

import React, { useEffect, useRef } from "react";

//libraries
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//components
import { toast } from "sonner";
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
} from "../../../../../components/global/slider/Slider";
import Tile from "./Tile";

//hooks
import { useSlider } from "@/lib/stores";

//zod schema
const formSchema = z.object({
  owner_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  restaurant_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  restaurant_name_en: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  service_type: z.enum(["in-person", "delivery", "both"]),
  service_type_priority: z.enum(["in-person", "delivery"]),
  restaurant_type: z.enum(["single", "multiple"]),
  // menuType: z.enum(["custom", "pre-made"]),
});

//types
export type formSchemaType = z.infer<typeof formSchema>;

export default function Setup({
  ref,
}: {
  ref: React.RefObject<HTMLFormElement | null>;
}) {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner_name: "",
      restaurant_name: "",
      restaurant_name_en: "",
    },
  });

  const { updateSectionCount, reset } = useSlider();

  useEffect(() => {
    updateSectionCount(3);
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log("invalid");
  }

  const onInvalid = () => {
    toast.error("لطفا همه سوالات را پاسخ دهید", {
      cancel: {
        label: "باشه",
      },
    });
    // Check and set default values for radio groups if not selected

    // Programmatically submit the form after setting default values
    // if (ref.current) {
    //   ref.current.dispatchEvent(
    //     new Event("submit", { cancelable: true, bubbles: true })
    //   );
    // }
  };

  const handleLastTileClick = () => {
    form.handleSubmit(onSubmit, onInvalid)();
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
                      <FormLabel>نام مجموعه</FormLabel>
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
                name="restaurant_name"
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
                name="restaurant_name_en"
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
                        isActive={field.value === "in-person"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="in-person"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                      <Tile
                        title="فقط آنلاین"
                        isActive={field.value === "delivery"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="delivery"></RadioGroupItem>
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
                name="service_type_priority"
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
                        isActive={field.value === "in-person"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="in-person"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                      <Tile
                        title="بیشتر فروش آنلاین داریم"
                        isActive={field.value === "delivery"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="delivery"></RadioGroupItem>
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
            </SliderStep>
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
                onClick={handleLastTileClick}
              ></Tile>
              <Tile isButton title="انتخاب منو از پیش ساخته شده"></Tile>
            </SliderStep>
          </SliderSection>
        </Slider>
      </form>
    </Form>
  );
}
