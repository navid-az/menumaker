"use client";

import { useEffect, useState } from "react";

//components
import {
  Slider,
  SliderBody,
  SliderFooter,
  SliderHeader,
} from "@/components/global/slider/Slider";
import SliderTitle from "@/components/global/slider/SliderTitle";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import RegisterBtn from "./components/RegisterBtn";
import CredentialStep from "./components/CredentialStep";
import OtpStep from "./components/OtpStep";
import OtpCountdown from "./components/OtpCountdown";

//libraries
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";

//hooks
import { useSlider } from "@/lib/stores";

//functions
import { validateCredentials, validateOtp } from "@/app/actions/auth/register";
import { createCookie } from "@/app/actions/auth/register";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

//types
export type InviteData = {
  personnelId: number;
  email: string;
  firstName: string;
  lastName: string;
  exp: number;
};
type RegisterForm = {
  phone_number: string;
  otp: string;
};

//schema
const phoneSchema = z.object({
  phone_number: z.string().min(11, "لطفا این قسمت را خالی نگذارید"),
});
const otpSchema = z.object({
  phone_number: z
    .string({ required_error: "لطفا این قسمت را خالی نگذارید" })
    .min(10),
  otp: z.string({ required_error: "لطفا این قسمت را خالی نگذارید" }),
});

export default function Page() {
  //slider sections and steps
  const sections = [
    {
      id: "register",
      title: "ورود | ثبت نام",
      steps: [
        {
          id: "credentials",
          subtitle: "لطفا شماره موبایل خود را وارد کنید",
          component: <CredentialStep stepId="credentials"></CredentialStep>,
          show: true,
        },
        {
          id: "otp",
          subtitle: "کد ارسال شده به شماره موبایل خود را وارد کنید",
          component: <OtpStep stepId="otp"></OtpStep>,
          show: true,
        },
      ],
    },
  ];

  const { sectionIndex, stepIndex, setStepIndex, direction, reset } =
    useSlider();

  const activeSection = sections[sectionIndex];
  const activeStep = activeSection.steps[stepIndex];

  const [isLoading, setIsLoading] = useState(false);

  //form step state
  const [step, setStep] = useState(1);
  const [retryAfter, setRetryAfter] = useState(0);

  //reset slider states on mount
  useEffect(() => {
    reset();
  }, []);

  //clear errors(if any) between steps
  useEffect(() => {
    form.clearErrors();
  }, [step]);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(step === 1 ? phoneSchema : otpSchema),
    defaultValues: { phone_number: "" },
  });

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

  async function onSubmit(data: RegisterForm) {
    if (step === 1) {
      setIsLoading(true);

      const res = await validateCredentials({
        phone_number: data.phone_number,
      });
      setStep(2);

      // this is a better solution than res.retry_after
      // because retry_after is always the same and that makes setter not re render the OtpCountdown component
      setRetryAfter(Date.now() + res.retry_after * 1000);

      setIsLoading(false);

      //next slider step
      setStepIndex(1);
      return;
    }
    if (step === 2) {
      setIsLoading(true);
      const result = await validateOtp({
        phone_number: data.phone_number,
        otp: Number(data.otp),
      });
      if (result.success) {
        const { access, refresh } = result.tokens;
        setIsLoading(false);
        createCookie("access", access);
        createCookie("refresh", refresh);
        toast.success("ورود با موفقیت انجام شد");
      } else {
        toast.error("کد وارد شده اشتباه است");
        setIsLoading(false);
        form.setValue("otp", "");
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex px-16 flex-5/12 items-center overflow-hidden"
      >
        <Slider validSections={sections}>
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
            <div className="flex gap-4 flex-col w-full">
              <div
                className={cn(
                  "flex justify-between w-full gap-4 transition-all duration-300",
                  step === 2 ? "mb-0 opacity-100" : "-mb-16 opacity-0"
                )}
              >
                <OtpCountdown
                  onClick={() => {
                    setStep(1);
                    form.trigger();
                  }}
                  retryAfter={retryAfter}
                  onFinish={() => console.log("yo")}
                ></OtpCountdown>
                <Button
                  onClick={() => {
                    setStepIndex(0);
                    setStep(1);
                  }}
                  disabled={step === 1}
                  className="flex-1 hover:scale-105 transition-all duration-300 scale-pro bg-sad-blue border-royal-green/10 border-2 text-royal-green rounded-full"
                >
                  ویرایش شماره موبایل
                </Button>
              </div>
              <RegisterBtn
                text={step === 1 ? "دریافت کد" : "ورود"}
                isLoading={isLoading}
              ></RegisterBtn>
            </div>
          </SliderFooter>
        </Slider>
      </form>
    </Form>
  );
}
