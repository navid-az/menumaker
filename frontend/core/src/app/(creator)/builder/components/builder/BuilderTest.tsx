"use client";

import React, { useMemo } from "react";

//components
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Slider } from "@/components/global/slider/Slider";
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
import { motion, AnimatePresence } from "motion/react";

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
const FrontEndOnlySchema = z.object({
  suggested_palette_enabled: z.boolean().default(false),
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
  frontend_only: FrontEndOnlySchema, // should not be included in the final data
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
      global_styling: {
        color_palette: ["#0d3b66", "#faf0ca", "#f4d35e"],
        border_radius: "full",
      },
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
          id: "theme",
          subtitle: "رنگ بندی و تم مورد نظرت رو انتخاب کن",
          component: <ThemeStep stepId={"theme"} />,
          show: true,
        },
        {
          id: "style",
          subtitle: "ویژگی های ظاهری مورد نظر خودت رو انتخاب کن",
          component: <StyleStep stepId={"style"} />,
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
          subtitle: "نوع چیدمان آیتم ها چطوری باشه؟",
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
    const businessSlug = slugify(businessName);

    //call server action
    const res = await createMenu(businessSlug, data);

    if (res.success) {
      toast.success("Menu created successfully!");
    } else {
      toast.error(res.error);
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
      <div className="flex h-full w-full pl-10 pr-28 justify-between">
        <form
          name="builder-form"
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          ref={ref}
          className="w-5/12"
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
        <div className="flex gap-2 bg-red-300"></div>
        {/* live menu preview */}
        <MenuPreview></MenuPreview>
      </div>
    </Form>
  );
}
