"use client";

import React, { useMemo } from "react";

//components
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Slider } from "@/components/global/slider/Slider";
import { AssetGroupType } from "@/components/global/AssetPicker";
import StyleStep from "./steps/StyleStep";
import ThemeStep from "./steps/ThemeStep";
import DetailStep from "./steps/DetailStep";
import MenuSectionStep from "./steps/MenuSectionStep";
import HomeFeatureStep from "./steps/HomeFeatureStep";
import MenuLayoutStep from "./steps/MenuLayoutStep";
import CategoryStyleStep from "./steps/CategoryStyleStep";
import CartStyleStep from "./steps/CartStyleStep";
import HomeLayoutStep from "./steps/HomeLayoutStep";
import MenuPreview from "../preview/MenuPreview";
import MenuFeatureStep from "./steps/MenuFeatureStep";

//hooks
import { useSlider } from "@/lib/stores";

//actions
import { createMenu } from "@/app/actions";

//libraries
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";

//types
import { BusinessType } from "@/app/dashboard/layout";

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
  style: z.enum(["default", "retro"]),
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
  unit_display_type: z.enum([
    "default",
    "compact",
    "persian_abbr",
    "english_abbr",
  ]),
});
const FrontEndOnlySchema = z.object({
  suggested_palette_enabled: z.boolean().default(false),
});
export const BuilderSchema = z.object({
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
  // items_display_type: z.enum(["modern", "square", "list"]),
  cart_btn_display_type: z.enum(["default", "compact"]),
  call_waiter_enabled: z.boolean().default(false),
  searchbar_enabled: z.boolean().default(false),

  business: BusinessSchema, // Nested Business schema
  global_styling: GlobalStylingSchema, // Nested Global Styling schema
  frontend_only: FrontEndOnlySchema, // should not be included in the final data
});

//types
export type BuilderFormType = z.infer<typeof BuilderSchema>;
export type GlobalStylingType = z.infer<typeof GlobalStylingSchema>;
export type keyOfBuilderSchemaType = keyof BuilderFormType;
export type keyOfGlobalStylingSchemaType = keyof GlobalStylingType;

export default function BuilderTest({
  ref,
  businessData,
  assetGroups,
  onSuccess,
}: {
  ref: React.RefObject<HTMLFormElement | null>;
  businessData: BusinessType | null;
  assetGroups: AssetGroupType[];
  onSuccess: () => void;
}) {
  const form = useForm<BuilderFormType>({
    resolver: zodResolver(BuilderSchema),
    defaultValues: {
      business: { social_links: [], phone_numbers: [], branches: [] },
      global_styling: {
        style: "default",
        color_palette: ["#0d3b66", "#faf0ca", "#f4d35e"],
        border_radius: "full",
        unit_display_type: "default",
        click_animation_type: [],
        click_animation_enabled: false,
      },
      items_page_layout: "horizontal",
      cart_btn_display_type: "default",
      menu_sections: [],
      home_title: "",
      home_subtitle: "",
      home_images: [],
    },
  });

  const sections = [
    {
      id: "customization",
      title: "شخصی سازی",
      steps: [
        {
          id: "style",
          subtitle: "استایل مورد نظرت رو انتخاب کن",
          component: <StyleStep stepId={"style"} />,
          show: true,
        },
        {
          id: "theme",
          subtitle: "رنگ بندی و تم مورد نظرت رو انتخاب کن",
          component: (
            <ThemeStep
              globalStyle={form.watch("global_styling.style")}
              stepId={"theme"}
            />
          ),
          show: true,
        },
        {
          id: "detail",
          subtitle: "ویژگی های ظاهری مورد نظر خودت رو انتخاب کن",
          component: <DetailStep stepId={"detail"} />,
          show: true,
        },
      ],
    },
    {
      id: "welcomePage",
      title: "صفحه اصلی",
      steps: [
        {
          id: "menuSection",
          subtitle: "تنظیمات بخش های منو",
          component: (
            <MenuSectionStep stepId={"menuSection"} assetGroups={assetGroups} />
          ),
          show: true,
        },
        {
          id: "homeLayout",
          subtitle: "شخصی سازی صفحه خوش‌آمدگویی",
          component: (
            <HomeLayoutStep stepId={"homeLayout"} assetGroups={assetGroups} />
          ),
          show:
            form.watch("welcome_page_layout") === "single" ||
            form.watch("welcome_page_layout") === "couple",
        },
        {
          id: "homeFeatures",
          subtitle: "ویژگی های صفحه خوش‌آمدگویی",
          component: (
            <HomeFeatureStep
              stepId={"homeFeatures"}
              assetGroups={assetGroups}
            />
          ),
          show:
            form.watch("welcome_page_layout") === "single" ||
            form.watch("welcome_page_layout") === "couple",
        },
      ],
    },
    {
      id: "itemsPage",
      title: "صفحه آیتم ها",
      steps: [
        {
          id: "menuLayout",
          subtitle: "نوع چیدمان لیست دسته بندی ها چطوری باشه؟",
          component: <MenuLayoutStep stepId={"menuLayout"} />,
          show: true,
        },
        {
          id: "categoryStyle",
          subtitle: "تنظیمات ظاهری دسته بندی ها",
          component: <CategoryStyleStep stepId={"categoryStyle"} />,
          show: true,
        },
        {
          id: "cartStyle",
          subtitle: "تنظیمات ظاهری سبد سفارشات",
          component: <CartStyleStep stepId={"cartStyle"} />,
          show: true,
        },

        {
          id: "menuFeatures",
          subtitle: "ویژگی های صفحه آیتم ها",
          component: <MenuFeatureStep stepId={"menuFeatures"} />,
          show: true,
        },
      ],
    },
  ];

  // Filter out sections and steps that are not shown based on the form state
  const validSections = useMemo(() => {
    return sections
      .map((section) => ({
        ...section,
        steps: section.steps.filter((step) => step.show),
      }))
      .filter((section) => section.steps.length > 0);
  }, [form.watch()]);

  const { sectionIndex, stepIndex, direction } = useSlider();

  const activeSection = validSections[sectionIndex];
  const activeStep = activeSection.steps[stepIndex];

  async function onSubmit(values: BuilderFormType) {
    console.log("values:", values);

    const {
      frontend_only, // opt out
      business,
      global_styling,
      home_images,
      ...menuData
    } = values;

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

    //call server action
    if (businessData?.slug) {
      const res = await createMenu(businessData.slug, data);
      if (res.success) {
        toast.success("Menu created successfully!");
        onSuccess();
      } else {
        toast.error(res.error);
      }
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
      <div className="flex px-4 sm:px-12 md:px-16 lg:px-24 mx-auto gap-24 lg:gap-20 2xl:gap-40 xl:gap-30 h-full w-full justify-center">
        <form
          name="builder-form"
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          ref={ref}
          className="max-w-lg w-full flex items-center"
        >
          <Slider validSections={validSections}>
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
        {/* live menu preview */}
        <MenuPreview></MenuPreview>
      </div>
    </Form>
  );
}
