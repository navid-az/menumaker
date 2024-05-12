"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

//SVGs
import { BarChart, Radar, Settings, User } from "./svg";

//hooks
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { useState } from "react";

//components
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import MyPlacesTab from "./MyPlacesTab";

//types
import type { PlacesType } from "../layout";

export default function DashboardNavbar({ places }: { places: PlacesType }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const md = useMediaQuery("(min-width: 768px)");
  const lg = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      <ResizablePanel
        onCollapse={() => {
          setIsCollapsed(true);
        }}
        collapsible
        collapsedSize={lg ? 6 : md ? 9.5 : 20}
        minSize={lg ? 19 : md ? 25 : 16}
        maxSize={lg ? 23 : md ? 30 : 25}
        defaultSize={lg ? 20 : md ? 28 : 20}
        onExpand={() => {
          setIsCollapsed(false);
        }}
      >
        <section className="flex h-full w-full flex-col items-end gap-4 bg-primary px-2 pb-8 text-soft-blue">
          <MyPlacesTab
            places={places}
            name="ونهان"
            position="صاحب محموعه"
          ></MyPlacesTab>
          <DashboardNavbarBtn
            text="وضعیت مجموعه"
            isCollapsed={isCollapsed}
            path="/dashboard/insights"
          >
            <BarChart
              className={`${!isCollapsed && "ml-3"} h-6 w-6`}
            ></BarChart>
          </DashboardNavbarBtn>
          <DashboardNavbarBtn
            text="مدیریت زنده"
            isCollapsed={isCollapsed}
            path="/dashboard/liveManagement"
          >
            <Radar className={`${!isCollapsed && "ml-3"} h-6 w-6`}></Radar>
          </DashboardNavbarBtn>
          <DashboardNavbarBtn text="پرسنل" isCollapsed={isCollapsed}>
            <User className={`${!isCollapsed && "ml-3"} h-6 w-6`}></User>
          </DashboardNavbarBtn>
          <DashboardNavbarBtn text="تنظیمات" isCollapsed={isCollapsed}>
            <Settings
              className={`${!isCollapsed && "ml-3"} h-6 w-6`}
            ></Settings>
          </DashboardNavbarBtn>
        </section>
      </ResizablePanel>
      <ResizableHandle withHandle></ResizableHandle>
    </>
  );
}

type DashboardNavbarBtnType = {
  text: string;
  path?: string;
  isCollapsed: boolean;
  children: React.ReactNode;
};

function DashboardNavbarBtn({
  text,
  path = "/",
  isCollapsed,
  children,
}: DashboardNavbarBtnType) {
  const pathName = usePathname();

  return (
    <Button
      asChild
      className={cn(
        `relative h-14 w-full justify-end py-3 text-lg text-sad-blue/60 transition-all duration-300 after:absolute after:right-0 after:h-4/6 after:w-1 after:rounded-full after:bg-sky-blue/50 after:opacity-0 after:transition-all after:duration-300 hover:text-sad-blue/90 hover:after:opacity-100 md:text-sm lg:text-lg ${
          pathName == path &&
          "scale-105 pr-6 text-sad-blue after:bg-sky-blue after:opacity-100"
        } ${isCollapsed && pathName == path && "scale-125 px-4"}`
      )}
    >
      <Link
        href={path}
        className={`flex ${
          isCollapsed ? "justify-center" : "justify-between"
        } gap-4`}
      >
        <div className="flex items-center">
          {children}
          {!isCollapsed && <p>{text}</p>}
        </div>
        {!isCollapsed && <p>5</p>}
      </Link>
    </Button>
  );
}
