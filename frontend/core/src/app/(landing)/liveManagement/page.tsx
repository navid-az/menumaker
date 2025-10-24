"use client";

import LiveCard from "@/app/dashboard/components/LiveCard";
import { Button } from "@/components/ui/button";
import React from "react";

//types
import { type TableType } from "@/app/dashboard/[business_slug]/[branch_slug]/liveManagement/all/page";

//libraries
import { motion, type Variants } from "motion/react";

//utils
import BlurRevealText from "@/lib/blurRevealText";

//SVGs
import {
  Users,
  Infinity,
  CloudCheck,
  ClockAlert,
  Radar,
  ScrollText,
  Settings,
  Chart,
} from "@/app/components/icons/DuoTone";

export const liveDummyTables: TableType[] = [
  // Batch 1
  {
    id: 1,
    code: "A1B2C3",
    active_session: {
      code: "S1X2Y3",
      started_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 60_000).toISOString(),
      is_active: true,
    },
    active_call: {
      resolved: false,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30_000).toISOString(),
    },
    name: "Table 1",
    seats: 4,
    location_description: "Near window",
    is_active: true,
    is_occupied: true,
    is_reserved: false,
    is_requesting_assistance: true,
  },
  {
    id: 2,
    code: "D4E5F6",
    active_session: {
      code: "T7U8V9",
      started_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 60_000).toISOString(),
      is_active: true,
    },
    name: "Table 2",
    seats: 2,
    is_active: true,
    is_occupied: true,
    is_reserved: false,
  },
  {
    id: 3,
    code: "G7H8I9",
    active_session: {
      code: "X1Y2Z3",
      started_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 120_000).toISOString(),
      is_active: true,
    },
    active_call: {
      resolved: false,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 90_000).toISOString(),
    },
    name: "Table 3",
    seats: 6,
    location_description: "Center hall",
    is_active: true,
    is_occupied: true,
    is_reserved: false,
    is_requesting_assistance: true,
  },
  {
    id: 4,
    code: "J1K2L3",
    active_session: {
      code: "X1Y2Z3",
      started_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 120_000).toISOString(),
      is_active: true,
    },
    name: "Table 4",
    seats: 4,
    location_description: "Patio",
    is_active: true,
    is_occupied: true,
    is_reserved: false,
    is_requesting_assistance: false,
  },
  {
    id: 5,
    code: "M4N5O6",
    name: "Table 5",
    seats: 8,
    location_description: "Private room",
    is_active: true,
    is_occupied: false,
    is_reserved: true,
    is_requesting_assistance: false,
  },

  // Batch 2
  {
    id: 6,
    code: "P7Q8R9",
    active_session: {
      code: "L1M2N3",
      started_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 90_000).toISOString(),
      is_active: true,
    },
    active_call: {
      resolved: false,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 45_000).toISOString(),
    },
    name: "Table 6",
    seats: 4,
    location_description: "Balcony",
    is_active: true,
    is_occupied: true,
    is_reserved: false,
    is_requesting_assistance: true,
  },
  {
    id: 7,
    code: "S1T2U3",
    active_session: {
      code: "O4P5Q6",
      started_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 90_000).toISOString(),
      is_active: true,
    },
    name: "Table 7",
    seats: 2,
    is_active: true,
    is_occupied: true,
    is_reserved: false,
  },
  {
    id: 8,
    code: "V4W5X6",
    active_session: {
      code: "R7S8T9",
      started_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 180_000).toISOString(),
      is_active: true,
    },
    active_call: {
      resolved: false,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 120_000).toISOString(),
    },
    name: "Table 8",
    seats: 6,
    location_description: "Main hall",
    is_active: true,
    is_occupied: true,
    is_reserved: false,
    is_requesting_assistance: true,
  },
  {
    id: 9,
    code: "Y7Z8A9",
    active_session: {
      code: "R7S8T9",
      started_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 180_000).toISOString(),
      is_active: true,
    },
    name: "Table 9",
    seats: 4,
    location_description: "Corner",
    is_active: true,
    is_occupied: true,
    is_reserved: false,
    is_requesting_assistance: false,
  },
  {
    id: 10,
    code: "B1C2D3",
    name: "Table 10",
    seats: 8,
    location_description: "VIP room",
    is_active: true,
    is_occupied: false,
    is_reserved: true,
    is_requesting_assistance: false,
  },
];
const icons = [
  {
    id: 1,
    Component: Settings,
    className: "w-5 h-5 sm:w-8 sm:h-8 opacity-35 md:w-9 md:h-9 lg:w-14 lg:h-14",
  },
  {
    id: 2,
    Component: ScrollText,
    className:
      "w-8 h-8 sm:w-12 sm:h-12 opacity-55 md:w-14 md:h-14 lg:w-22 lg:h-22 mt-5",
  },
  {
    id: 3,
    Component: Radar,
    className:
      "w-15 h-15 sm:w-22 sm:h-22 md:w-28 md:h-28 lg:w-42 lg:h-42 mt-10",
  },
  {
    id: 4,
    Component: Chart,
    className:
      "w-8 h-8 sm:w-12 sm:h-12 opacity-55 md:w-14 md:h-14 lg:w-22 lg:h-22 mt-5",
  },
  {
    id: 5,
    Component: Users,
    className: "w-5 h-5 sm:w-8 sm:h-8 opacity-35 md:w-9 md:h-9 lg:w-14 lg:h-14",
  },
];

export default function Page() {
  // Animation variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 2, filter: "blur(24px)" },
    visible: (delay: number) => ({
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 0.6,
        ease: "easeOut",

        stiffness: 150,
      },
    }),
  };

  // delays so: outer → inner → center
  const delayOrder = [0, 2, 4, 2, 0];
  return (
    <div className="h-full w-full">
      <section className="relative flex flex-col items-center justify-center overflow-hidden">
        <div className="relative mt-10 mb-16 flex w-full flex-col justify-between sm:mb-24 md:mb-32 lg:mb-42">
          {/* icons */}

          <div className="flex w-full justify-between self-end px-4 lg:px-24">
            {icons.map((icon, i) => {
              const Icon = icon.Component;
              const delay = delayOrder[i] * 0.3;

              return (
                <motion.div
                  key={icon.id}
                  custom={delay}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Icon
                    primaryColor="var(--royal-green)"
                    strokeWidth={1.5}
                    className={icon.className}
                  />
                </motion.div>
              );
            })}
          </div>
          {/* curved line */}
          <svg
            className="absolute -bottom-6"
            width="100%"
            viewBox="0 0 1441 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.203156 0.454102C0.203156 0.454102 323.203 146.954 720.203 146.954C1117.2 146.954 1440.2 0.454102 1440.2 0.454102"
              stroke="var(--royal-green)"
              strokeWidth={2}
              strokeOpacity="0.1"
            />
          </svg>
        </div>
        {/* blue glow  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: -20 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 z-5 h-1/4 w-10/12 rounded-full bg-[#4EEBFF]/50 blur-[120px]"
        ></motion.div>

        {/* hero title  */}
        <div className="text-center">
          <BlurRevealText
            className="text-center sm:text-xl md:text-3xl lg:text-4xl/14"
            text="مدیریت مجموعه در هر لحظه و هر زمان"
          ></BlurRevealText>
          <BlurRevealText
            className="text-center sm:text-xl md:text-3xl lg:text-4xl/14"
            text="به صورت زنده"
          ></BlurRevealText>
        </div>
        {/* <motion.h1
          initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeInOut" }}
          className="text-center sm:text-xl md:text-3xl lg:text-4xl/14"
        >
          مدیریت مجموعه در هر لحظه و هر زمان <br />
          به صورت{" "}
          <span className="text-grad bg-gradient-to-b from-[#94D9E2] to-[#06434C] bg-clip-text text-transparent">
            زنده
          </span>
        </motion.h1> */}
        {/* arc  */}
        <svg
          className="z-20"
          width="100%"
          viewBox="0 0 1441 319"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M720.5 147.276C323.5 147.276 0.5 0.775879 0.5 0.775879V317.776H1440.5V0.775879C1440.5 0.775879 1117.5 147.276 720.5 147.276Z"
            fill="white"
            stroke="#0F2C30"
            strokeOpacity="0.1"
          />
        </svg>
      </section>

      {/* dashboard mockup */}
      <div className="relative flex h-[2000px] w-full flex-col gap-8 overflow-hidden px-4 lg:flex-row lg:px-12 xl:px-16">
        <div className="flex w-11/12 flex-col gap-8 lg:basis-2/5">
          <h2 className="text-royal-green text-xl/8 sm:text-4xl/14 md:text-5xl/18 xl:text-5xl/18">
            مشاهده وضعیت میز ها
            <br className="hidden md:flex" /> و سفارشات آنلاین به{" "}
            <br className="hidden md:flex" />
            صورت{" "}
            <span className="text-grad bg-gradient-to-b from-[#94D9E2] to-[#06434C] bg-clip-text text-transparent">
              لحظه ای
            </span>
          </h2>
          <div className="flex flex-col gap-4">
            <h4 className="text-royal-green/70 text-xs sm:text-base">
              <span className="text-royal-green font-semibold">
                به سادگی از وضعیت هر سفارش با خبر شوید.
              </span>{" "}
              هر کارت، نمای زنده‌ای از وضعیت سالن شماست. درخواست‌ها، سفارش‌ها و
              وضعیت میزها — همگی در یک نگاه.
            </h4>
            <h5 className="text-xs lg:text-base">
              از درخواست صورت حساب و اطلاع از سفارش مشتری تا وضعیت پرداخت و زمان
              رزرو میز
            </h5>
          </div>
          <div className="hidden w-full gap-10 sm:flex">
            <div className="flex flex-col gap-4">
              <FeatureHighlight
                icon={
                  <CloudCheck
                    className="h-4 w-4 lg:h-5 lg:w-5"
                    primaryColor="var(--royal-green)"
                  ></CloudCheck>
                }
                text="ذخیره سفارشات"
              ></FeatureHighlight>
              <FeatureHighlight
                icon={
                  <Users
                    className="h-4 w-4 lg:h-5 lg:w-5"
                    primaryColor="var(--royal-green)"
                    size={20}
                  ></Users>
                }
                text="فیلتر اطلاعات بر اساس سمت"
              ></FeatureHighlight>
            </div>
            <div className="flex flex-col gap-4">
              <FeatureHighlight
                icon={
                  <Infinity
                    className="h-4 w-4 lg:h-5 lg:w-5"
                    primaryColor="var(--royal-green)"
                    size={20}
                  ></Infinity>
                }
                text="ثبت بی نهایت میز"
              ></FeatureHighlight>
              <FeatureHighlight
                icon={
                  <ClockAlert
                    className="h-4 w-4 lg:h-5 lg:w-5"
                    primaryColor="var(--royal-green)"
                    size={20}
                  ></ClockAlert>
                }
                text="نمایش زمان و تاریخ اعلان"
              ></FeatureHighlight>
            </div>
          </div>
        </div>
        <div className="relative h-max max-h-[280px] lg:absolute lg:-left-[700px] xl:-left-[500px] 2xl:-left-[450px]">
          <div className="relative w-max origin-top-right scale-45 pr-32 sm:scale-85 sm:pr-48 lg:scale-75 lg:pr-0 xl:scale-85 2xl:scale-100">
            <LiveManagementMockUp></LiveManagementMockUp>
            <div className="pointer-events-none absolute -bottom-2 left-0 z-50 h-[350px] w-full bg-gradient-to-t from-white from-45% via-white/95 via-55% to-transparent" />
          </div>
        </div>
        <div className="z-30 mt-8 flex w-full justify-between sm:hidden sm:justify-center sm:gap-10">
          <div className="flex flex-col gap-2">
            <FeatureHighlight
              icon={
                <CloudCheck
                  className="h-4 w-4 lg:h-5 lg:w-5"
                  primaryColor="var(--royal-green)"
                ></CloudCheck>
              }
              text="ذخیره سفارشات"
            ></FeatureHighlight>
            <FeatureHighlight
              icon={
                <Users
                  className="h-4 w-4 lg:h-5 lg:w-5"
                  primaryColor="var(--royal-green)"
                  size={20}
                ></Users>
              }
              text="فیلتر اطلاعات بر اساس سمت"
            ></FeatureHighlight>
          </div>
          <div className="flex flex-col gap-2">
            <FeatureHighlight
              icon={
                <Infinity
                  className="h-4 w-4 lg:h-5 lg:w-5"
                  primaryColor="var(--royal-green)"
                  size={20}
                ></Infinity>
              }
              text="ثبت بی نهایت میز"
            ></FeatureHighlight>
            <FeatureHighlight
              icon={
                <ClockAlert
                  className="h-4 w-4 lg:h-5 lg:w-5"
                  primaryColor="var(--royal-green)"
                  size={20}
                ></ClockAlert>
              }
              text="نمایش زمان و تاریخ اعلان"
            ></FeatureHighlight>
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureHighlight = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-xs font-normal lg:text-sm">{text}</p>
    </div>
  );
};

const LiveManagementMockUp = () => {
  return (
    <div className="flex h-max w-max flex-col gap-4 rounded-[40px] border-1 border-[#C5E5E9]/20 bg-[#243B3E] p-4">
      <div className="w-full rounded-full border-1 border-[#C5E5E9]/40 bg-[#C5E5E9]/20 p-2">
        <div className="border-royal-green flex w-max gap-2 rounded-full border-1 bg-[#F8FEFF] p-1">
          <Button className="bg-royal-green rounded-full px-6 text-sm text-white">
            همه
          </Button>
          <Button className="text-royal-green hover:bg-royal-green/10 rounded-full bg-inherit px-6 text-sm">
            میز ها
          </Button>
          <Button className="text-royal-green hover:bg-royal-green/10 rounded-full bg-inherit text-sm">
            سفارشات آنلاین
          </Button>
        </div>
      </div>
      <section className="flex w-full flex-col gap-4">
        <div className="flex w-full gap-4">
          {liveDummyTables.slice(0, 5).map((table, index) => (
            <LiveCard
              isMockUp
              key={index}
              table={table}
              businessSlug="navid"
              branchSlug="navid"
            ></LiveCard>
          ))}
        </div>
        <div className="flex w-full gap-4">
          {liveDummyTables.slice(5).map((table, index) => (
            <LiveCard
              isMockUp
              key={index}
              table={table}
              businessSlug="navid"
              branchSlug="navid"
            ></LiveCard>
          ))}
        </div>
      </section>
    </div>
  );
};
