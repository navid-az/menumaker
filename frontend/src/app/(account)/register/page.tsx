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
import DemoModeWrapper from "./components/DemoModeBtn";


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

//SVGs
import { Info } from "lucide-react";

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

//schemas
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
  const { sectionIndex, stepIndex, setStepIndex, direction, reset } =
    useSlider();

  const [isLoading, setIsLoading] = useState(false);

  //form step state
  const [step, setStep] = useState(1);
  const [retryAfter, setRetryAfter] = useState(0);

  const DEMO_MODE_ENABLED = process.env.NEXT_PUBLIC_DEMO_MODE_ENABLED === 'true'

  // reset slider states on mount
  useEffect(() => {
    reset();
  }, []);

  // clear errors(if any) between steps
  // and set focus to the phone number input on step 1
  useEffect(() => {
    form.clearErrors();
    if (step === 1) {
      form.setFocus("phone_number");
    }
  }, [step]);

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
          component: <OtpStep focus={step === 2} stepId="otp"></OtpStep>,
          show: true,
        },
      ],
    },
  ];
  const activeSection = sections[sectionIndex];
  const activeStep = activeSection.steps[stepIndex];

  const form = useForm<RegisterForm>({
    resolver: zodResolver(step === 1 ? phoneSchema : otpSchema),
    defaultValues: { phone_number: "" },
  });

  const STORAGE_KEY = "otp_phone_number";
  const phoneNumber = form.watch("phone_number");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      form.setValue("phone_number", saved);
    }
  }, [form.setValue]);

  // Save to localStorage when phone changes
  useEffect(() => {
    if (phoneNumber) {
      localStorage.setItem(STORAGE_KEY, phoneNumber);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [phoneNumber]);

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

      // If demo mode OR DEBUG is true, server will pass OTP directly to client, bypassing kavenegar API entirely
      if (res.code) {
        form.setValue('otp', res.code.toString())
      }

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

  // reset form and slider states to initial values and set step to 1
  const handleCredentialReset = () => {
    setStep(1);
    setStepIndex(0);
    form.reset();
    setRetryAfter(0);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex px-4 sm:px-20 lg:px-16 xl:px-12 flex-6/12 flex-shrink items-center overflow-hidden"
      >
        <Slider validSections={sections}>
          <SliderHeader>
            <div className="flex flex-col w-full gap-6">
              <SliderTitle></SliderTitle>
              {DEMO_MODE_ENABLED && <DemoModeWrapper></DemoModeWrapper>}
            </div>
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
            <div className="flex gap-6 flex-col w-full">
              <div
                className={cn(
                  "flex flex-wrap justify-between w-full gap-4 transition-all duration-300 delay-300",
                  step === 2 ? "mb-0 opacity-100" : "-mb-14 lg:-mb-16 opacity-0"
                )}
              >
                <OtpCountdown
                  onClick={() => {
                    setStep(1);
                    form.trigger();
                  }}
                  retryAfter={retryAfter}
                ></OtpCountdown>
                <Button
                  onClick={handleCredentialReset}
                  disabled={step === 1}
                  className="flex-1 hover:scale-105 transition-all duration-300 scale-pro bg-sad-blue border-royal-green/10 border-2 text-royal-green rounded-full"
                >
                  ویرایش شماره موبایل
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                <RegisterBtn
                  text={step === 1 ? "دریافت کد" : "ورود"}
                  isLoading={isLoading}
                ></RegisterBtn>
                {DEMO_MODE_ENABLED && <div className={cn('w-full opacity-0 flex justify-center items-center text-xs gap-1.5 font-light text-royal-green/60 -mt-16 transition-all duration-300', step === 2 && 'mt-0 opacity-100 delay-1000')}>
                  <Info className="size-3.5" strokeWidth={'1.5px'}></Info>
                  <p>در حالت دمو سرویس OTP غیر‌فعال می‌باشد</p>
                </div>}
              </div>
            </div>
          </SliderFooter>
        </Slider>
      </form>
    </Form>
  );
}
