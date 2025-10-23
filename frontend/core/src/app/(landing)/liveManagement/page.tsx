import LiveCard from "@/app/dashboard/components/LiveCard";
import { Button } from "@/components/ui/button";
import React from "react";

//types
import { type TableType } from "@/app/dashboard/[business_slug]/[branch_slug]/liveManagement/all/page";

//SVGs
import {
  Users,
  Infinity,
  CloudCheck,
  ClockAlert,
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

export default function Page() {
  return (
    <div className="relative lg:flex-row flex-col gap-8 w-full flex h-[2000px] overflow-hidden px-4 lg:px-12 xl:px-16">
      <div className="flex flex-col gap-8 w-11/12 lg:basis-2/5">
        <h2 className="text-royal-green md:text-5xl/18 sm:text-4xl/14 xl:text-5xl/18 text-xl/8">
          مشاهده وضعیت میز ها
          <br className="hidden md:flex" /> و سفارشات آنلاین به{" "}
          <br className="hidden md:flex" />
          صورت{" "}
          <span className="text-grad bg-gradient-to-b from-[#94D9E2] to-[#06434C] bg-clip-text text-transparent">
            لحظه ای
          </span>
        </h2>
        <div className="flex flex-col gap-4">
          <h4 className="text-xs sm:text-base text-royal-green/70">
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
        <div className="gap-10 w-full hidden sm:flex">
          <div className="flex flex-col gap-4">
            <FeatureHighlight
              icon={
                <CloudCheck
                  className="w-4 h-4 lg:w-5 lg:h-5"
                  primaryColor="var(--royal-green)"
                ></CloudCheck>
              }
              text="ذخیره سفارشات"
            ></FeatureHighlight>
            <FeatureHighlight
              icon={
                <Users
                  className="w-4 h-4 lg:w-5 lg:h-5"
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
                  className="w-4 h-4 lg:w-5 lg:h-5"
                  primaryColor="var(--royal-green)"
                  size={20}
                ></Infinity>
              }
              text="ثبت بی نهایت میز"
            ></FeatureHighlight>
            <FeatureHighlight
              icon={
                <ClockAlert
                  className="w-4 h-4 lg:w-5 lg:h-5"
                  primaryColor="var(--royal-green)"
                  size={20}
                ></ClockAlert>
              }
              text="نمایش زمان و تاریخ اعلان"
            ></FeatureHighlight>
          </div>
        </div>
      </div>
      <div className="relative lg:absolute xl:-left-[500px] h-max 2xl:-left-[450px] lg:-left-[700px] max-h-[280px]">
        <div className="relative w-max scale-45 sm:scale-85 lg:scale-75 xl:scale-85 2xl:scale-100 origin-top-right pr-32 sm:pr-48 lg:pr-0">
          <LiveManagementMockUp></LiveManagementMockUp>
          <div className="absolute z-50 w-full -bottom-2 left-0 h-[350px] bg-gradient-to-t from-white from-45% via-white/95 via-55% to-transparent pointer-events-none" />
        </div>
      </div>
      <div className="sm:gap-10 sm:hidden sm:justify-center justify-between w-full z-30 flex mt-8">
        <div className="flex flex-col gap-2">
          <FeatureHighlight
            icon={
              <CloudCheck
                className="w-4 h-4 lg:w-5 lg:h-5"
                primaryColor="var(--royal-green)"
              ></CloudCheck>
            }
            text="ذخیره سفارشات"
          ></FeatureHighlight>
          <FeatureHighlight
            icon={
              <Users
                className="w-4 h-4 lg:w-5 lg:h-5"
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
                className="w-4 h-4 lg:w-5 lg:h-5"
                primaryColor="var(--royal-green)"
                size={20}
              ></Infinity>
            }
            text="ثبت بی نهایت میز"
          ></FeatureHighlight>
          <FeatureHighlight
            icon={
              <ClockAlert
                className="w-4 h-4 lg:w-5 lg:h-5"
                primaryColor="var(--royal-green)"
                size={20}
              ></ClockAlert>
            }
            text="نمایش زمان و تاریخ اعلان"
          ></FeatureHighlight>
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
    <div className="flex gap-2 items-center">
      {icon}
      <p className="font-normal text-xs lg:text-sm">{text}</p>
    </div>
  );
};

const LiveManagementMockUp = () => {
  return (
    <div className="flex flex-col w-max gap-4 border-1 h-max p-4 rounded-[40px] border-[#C5E5E9]/20 bg-[#243B3E]">
      <div className="w-full bg-[#C5E5E9]/20 p-2 border-1 rounded-full border-[#C5E5E9]/40">
        <div className="bg-[#F8FEFF] border-1 border-royal-green w-max p-1 rounded-full gap-2 flex">
          <Button className="rounded-full bg-royal-green text-white text-sm px-6">
            همه
          </Button>
          <Button className="rounded-full bg-inherit text-royal-green text-sm hover:bg-royal-green/10 px-6">
            میز ها
          </Button>
          <Button className="rounded-full bg-inherit text-royal-green text-sm hover:bg-royal-green/10">
            سفارشات آنلاین
          </Button>
        </div>
      </div>
      <section className="w-full flex flex-col gap-4">
        <div className="w-full gap-4 flex">
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
        <div className="w-full gap-4 flex">
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
