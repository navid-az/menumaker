"use client";

import React, { useEffect } from "react";

//components
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Slider, SliderSection } from "@/components/global/slider/Slider";
import { AssetGroupType } from "@/components/global/AssetPicker";
import ThemeStep from "./steps/ThemeStep";
import StyleStep from "./steps/StyleStep";
import MenuSectionStep from "./steps/MenuSectionStep";
import HomeFeatureStep from "./steps/HomeFeatureStep";
import MenuLayoutStep from "./steps/MenuLayoutStep";
import CategoryStyleStep from "./steps/CategoryStyleStep";
import HomeLayoutStep from "./steps/HomeLayoutStep";
import MenuPreview from "../preview/MenuPreview";

//hooks
import { useSlider } from "@/lib/stores";

//actions
import { createMenu } from "@/app/actions";

//functions libraries
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { slugify } from "@/lib/slugify";
import MenuFeatureStep from "./steps/MenuFeatureStep";

//zod schemas
const InstanceSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string().optional(),
    asset: z
      .object({
        id: z.number(),
        name: z.string(),
        image: z.string(),
      })
      .optional(),
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
  //home page
  home_images: z
    .array(
      z.object({
        tempId: z.string(),
        url: z.string(),
      })
    )
    .optional(),
  home_title: z.string(),
  home_subtitle: z.string(),
  welcome_page_layout: z.enum(["single", "couple", "none"]),
  menu_sections: InstanceSchema,

  show_social_links: z.boolean().default(false),
  show_phone_numbers: z.boolean().default(false),
  show_branches: z.boolean().default(false),
  //items page
  items_page_layout: z.enum(["horizontal", "vertical"]),
  categories_display_type: z.enum(["slider", "circular"]),
  call_waiter_enabled: z.boolean().default(false),
  searchbar_enabled: z.boolean().default(false),
  // items_display_type: z.enum(["modern", "square", "list"]), //

  business: BusinessSchema, // Nested Business schema
  global_styling: GlobalStylingSchema, // Nested Global Styling schema
});

//types
export type BuilderFormType = z.infer<typeof BuilderSchema>;
export type GlobalStylingType = z.infer<typeof GlobalStylingSchema>;
export type keyOfBuilderSchemaType = keyof BuilderFormType;
export type keyOfGlobalStylingSchemaType = keyof GlobalStylingType;

export default function BuilderTest({
  ref,
  businessName,
  assetGroups,
}: {
  ref: React.RefObject<HTMLFormElement | null>;
  businessName: string;
  assetGroups: AssetGroupType[];
}) {
  const form = useForm<BuilderFormType>({
    resolver: zodResolver(BuilderSchema),
    defaultValues: {
      business: { social_links: [], phone_numbers: [], branches: [] },
      menu_sections: [],
      home_title: "",
      home_subtitle: "",
      home_images: [],
    },
  });

  const { updateSectionCount } = useSlider();

  useEffect(() => {
    updateSectionCount(3);
  }, []);

  async function onSubmit(values: BuilderFormType) {
    console.log("values:", values);

    const { business, global_styling, home_images, ...menuData } = values;

    //destructure color_palette array of hex codes
    const [primary_color, secondary_color, tertiary_color, bg_color] =
      global_styling.color_palette;

    // Create the cleaned-up global_styling object
    const { color_palette, ...restStyling } = global_styling;

    const data = {
      ...menuData,
      home_images: home_images?.map((image) => image.tempId),
      global_styling: {
        ...restStyling,
        primary_color,
        secondary_color,
        tertiary_color,
        bg_color,
      },
    };
    const businessSlug = slugify(businessName);

    //call server action
    const res = await createMenu(businessSlug, data);

    if (res.success) {
      toast.success("Menu created successfully!", {
        cancel: { label: "باشه" },
      });
    } else {
      toast.error(res.error, {
        cancel: { label: "باشه" },
      });
    }
  }

  const onInvalid = (errors: any) => {
    console.log("invalid:", errors);

    // Check and set default values for radio groups if not selected
    // form.setValue("welcome_page_layout", "couple");
    // form.setValue("categories_display_type", "circular");
    // form.setValue("items_page_layout", "horizontal");
    // form.setValue("global_styling.border_radius", "full");

    // Programmatically submit the form after setting default values
    // if (ref.current) {
    //   ref.current.dispatchEvent(
    //     new Event("submit", { cancelable: true, bubbles: true })
    //   );
    // }
  };

  return (
    <Form {...form}>
      <div className="flex h-full w-full">
        <form
          name="builder-form"
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          ref={ref}
          className="basis-8/12 px-32"
        >
          <Slider>
            <SliderSection title="شخصی سازی" sectionNum={1}>
              <ThemeStep></ThemeStep>
              <StyleStep></StyleStep>
            </SliderSection>
            <SliderSection title="صفحه اصلی" sectionNum={2}>
              <HomeLayoutStep assetGroups={assetGroups}></HomeLayoutStep>
              <MenuSectionStep assetGroups={assetGroups}></MenuSectionStep>
              <HomeFeatureStep assetGroups={assetGroups}></HomeFeatureStep>
            </SliderSection>
            <SliderSection title="صفحه آیتم ها" sectionNum={3}>
              <MenuLayoutStep></MenuLayoutStep>
              <CategoryStyleStep></CategoryStyleStep>
              <MenuFeatureStep></MenuFeatureStep>
            </SliderSection>
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
