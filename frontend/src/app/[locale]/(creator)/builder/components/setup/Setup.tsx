"use client";

import React, { useMemo } from "react";

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
  SliderBody,
  SliderFooter,
  SliderHeader,
  SliderStep,
  type SliderSection,
} from "@/components/global/slider/Slider";
import { SliderNavigator } from "@/components/global/slider/SliderNavigator";
import SliderTitle from "@/components/global/slider/SliderTitle";
import Tile from "./Tile";
import { toast } from "sonner";

//hooks
import { useSlider } from "@/lib/stores";

//actions
import { createBusiness } from "@/app/actions";
import { refreshToken } from "@/app/actions/auth/register";

//libraries
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";

//types
import { type Business } from "@/app/types/api/business";
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
  // handleCustomMenu,
  // handlePreBuiltMenu,
  ref,
  setNewBusiness,
  onSuccess,
}: {
  // handleCustomMenu: () => void;
  // handlePreBuiltMenu: () => void;
  ref: React.RefObject<HTMLFormElement | null>;
  setNewBusiness: React.Dispatch<React.SetStateAction<Business | null>>;
  onSuccess: () => void;
}) {
  const t = useTranslations('builder.setup')

  const form = useForm<SetupSchemaType>({
    resolver: zodResolver(SetupSchema),
    defaultValues: {
      owner_name: "",
      name: "",
      name_en: "",
    },
  });

  const { sectionIndex, stepIndex, direction } = useSlider();

  const sections: SliderSection[] = [
    {
      id: "business_info",
      title: t('sections.ownerInfo.title'),
      steps: [
        {
          id: "ownerInfo",
          subtitle: t('sections.ownerInfo.steps.ownerName.subtitle'),
          component: (
            <SliderStep stepId="ownerInfo">
              <FormField
                control={form.control}
                name="owner_name"
                render={({ field }) => (
                  <FormControl>
                    <FormItem>
                      <FormLabel>{t('sections.ownerInfo.steps.ownerName.inputs.name.label')}</FormLabel>
                      <Input
                        type="text"
                        placeholder={t('sections.ownerInfo.steps.ownerName.inputs.name.placeholder')}
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
          fields: ['owner_name'],
        },
      ],
    },
    {
      id: "welcomePage",
      title: t('sections.businessInfo.title'),
      steps: [
        {
          id: "businessInfo",
          subtitle: t('sections.businessInfo.steps.businessName.subtitle'),
          component: (
            <SliderStep stepId="businessInfo">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormControl>
                    <FormItem>
                      <FormLabel>{t('sections.businessInfo.steps.businessName.inputs.name.label')}</FormLabel>
                      <Input
                        type="text"
                        placeholder={t('sections.businessInfo.steps.businessName.inputs.name.placeholder')}
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
                      <FormLabel>{t('sections.businessInfo.steps.businessName.inputs.nameEn.label')}</FormLabel>
                      <Input
                        type="text"
                        placeholder={t('sections.businessInfo.steps.businessName.inputs.nameEn.placeholder')}
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
          fields: ['name', 'name_en'],
        },
        {
          id: "serviceType",
          subtitle: t('sections.businessInfo.steps.serviceType.subtitle'),
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
                      className="flex flex-col sm:flex-row h-80 w-full gap-4"
                    >
                      <Tile
                        title={t('sections.businessInfo.steps.serviceType.tiles.inPerson.title')}
                        isActive={field.value === "in_person"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="in_person"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                      <Tile
                        title={t('sections.businessInfo.steps.serviceType.tiles.online.title')}
                        isActive={field.value === "online"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="online"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                      <Tile
                        title={t('sections.businessInfo.steps.serviceType.tiles.both.title')}
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
          fields: ['service_type'],
          optional: true,
          autoAdvance: true,
        },
        {
          id: "primary_service_type",
          subtitle: t('sections.businessInfo.steps.primaryServiceType.subtitle'),
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
                      className="flex flex-col sm:flex-row h-80 w-full gap-4"
                    >
                      <Tile
                        title={t('sections.businessInfo.steps.primaryServiceType.tiles.inPerson.title')}
                        isActive={field.value === "in_person"}
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="in_person"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                      <Tile
                        title={t('sections.businessInfo.steps.primaryServiceType.tiles.online.title')}
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
          show: form.watch("service_type") === "both",
          fields: ['primary_service_type'],
          optional: true,
          autoAdvance: true,
        },
        {
          id: "business_size",
          subtitle: t('sections.businessInfo.steps.businessSize.subtitle'),
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
                      className="flex flex-col sm:flex-row h-80 w-full gap-4"
                    >
                      <Tile title={t('sections.businessInfo.steps.businessSize.tiles.single.title')} isActive={field.value === "single"}>
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="single"></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      </Tile>
                      <Tile
                        title={t('sections.businessInfo.steps.businessSize.tiles.multiple.title')}
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
          fields: ['branch_structure'],
          optional: true,
          autoAdvance: true,
          show: true,
        },
      ],
    },
    {
      id: "menu_prefrence",
      title: t('sections.menuPrefrence.title'),
      steps: [
        {
          id: "menu_preference",
          subtitle: t('sections.menuPrefrence.steps.menuPrefrence.subtitle'),
          component: (
            <SliderStep
              stepId="menu_preference"
              className="flex flex-col sm:flex-row h-80"
            >
              <Tile
                isButton
                title={t('sections.menuPrefrence.steps.menuPrefrence.tiles.custom.title')}
                onClick={() => handleSubmit("custom")}
              ></Tile>
              {/* <Tile
                isButton
                title={t('sections.menuPrefrence.steps.menuPrefrence.tiles.preBuilt.title')}
                onClick={() => handleSubmit("pre-built")}
              ></Tile> */}
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
      setNewBusiness(res.data);

      // refresh access token to inject new business role and permissions into the token payload
      const refreshed = await refreshToken();

      if (!refreshed.success) {
        toast.error(refreshed.detail);
        return;
      }
      toast.success(t('toasts.createSuccess'));
    }
  }

  //if given data is not valid
  const onInvalid = () => {
    toast.error(t('toasts.onError'));
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
    // NOT MPV
    // if (userChoice === "custom") {
    //   handleCustomMenu();
    // } else if (userChoice === "pre-built") {
    //   handlePreBuiltMenu();
    // }
    onSuccess();
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
        <Slider validSections={validSections}>
          <SliderHeader>
            <SliderTitle></SliderTitle>
          </SliderHeader>
          <SliderBody>
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
          </SliderBody>
          <SliderFooter>
            <SliderNavigator
              disableSubmitBtn
              validSections={validSections}
            ></SliderNavigator>
          </SliderFooter>
        </Slider>
      </form>
    </Form>
  );
}
