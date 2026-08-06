"use client";

import React from "react";

//SVGs
import {
    Users,
    Infinity,
    CloudCheck,
    ClockAlert,
} from "@/app/components/icons/DuoTone";
import { DashboardMockup, LiveManagementPanelMockup } from "@/components/global/Mockup/DashboardMockup";

export default function LiveManagementIntro() {
    return (
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
                    <DashboardMockup isCompact>
                        <LiveManagementPanelMockup isCompact></LiveManagementPanelMockup>
                    </DashboardMockup>
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
    )
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
