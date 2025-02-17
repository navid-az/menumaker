"use client";

import { useRef, useState } from "react";

//SVGs
import { BarChart, Radar, ScrollText, Settings, Users } from "./svg";

//hooks
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { useParams } from "next/navigation";

//libraries
import { cn } from "@/lib/utils";
import { ImperativePanelHandle } from "react-resizable-panels";

//components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import MyBusinessesTab from "./MyBusinessesTab";

//types
import { BusinessType } from "@/app/dashboard/layout";

export default function DashboardNavbar({
  businesses,
}: {
  businesses: BusinessType;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const md = useMediaQuery("(min-width: 768px)");
  const lg = useMediaQuery("(min-width: 1024px)");
  const params = useParams<{ menu_id: string }>();
  const resizablePanel = useRef<ImperativePanelHandle>(null);

  const collapsePanel = () => {
    const panel = resizablePanel.current;
    if (panel) {
      panel.expand();
    }
  };

  return (
    <ResizablePanel
      ref={resizablePanel}
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
      <section className="flex w-full flex-col items-end gap-4 bg-primary px-2 text-soft-blue">
        <MyBusinessesTab
          businesses={businesses}
          position="صاحب مجموعه"
          isCollapsed={isCollapsed}
          collapsePanel={collapsePanel}
        ></MyBusinessesTab>
        <DashboardNavbarBtn
          text="وضعیت مجموعه"
          isCollapsed={isCollapsed}
          basePath={`/dashboard/${params.menu_id}/insights`}
        >
          <BarChart className={`${!isCollapsed && "ml-3"} h-6 w-6`}></BarChart>
        </DashboardNavbarBtn>
        <DashboardNavbarBtn
          text="مدیریت زنده"
          isCollapsed={isCollapsed}
          basePath={`/dashboard/${params.menu_id}/liveManagement`}
        >
          <Radar className={`${!isCollapsed && "ml-3"} h-6 w-6`}></Radar>
        </DashboardNavbarBtn>
        <DashboardNavbarBtn
          text="آیتم و دسته بندی"
          isCollapsed={isCollapsed}
          basePath={`/dashboard/${params.menu_id}/data/items`}
          dynamicPaths={["items", "categories", "offers", "excessCosts"]}
        >
          <ScrollText
            className={`${!isCollapsed && "ml-3"} h-6 w-6`}
          ></ScrollText>
        </DashboardNavbarBtn>
        <DashboardNavbarBtn text="پرسنل" isCollapsed={isCollapsed}>
          <Users className={`${!isCollapsed && "ml-3"} h-6 w-6`}></Users>
        </DashboardNavbarBtn>
        <DashboardNavbarBtn text="تنظیمات" isCollapsed={isCollapsed}>
          <Settings className={`${!isCollapsed && "ml-3"} h-6 w-6`}></Settings>
        </DashboardNavbarBtn>
      </section>
    </ResizablePanel>
  );
}

type DashboardNavbarBtnType = {
  text: string;
  basePath?: string;
  dynamicPaths?: string[];
  isCollapsed: boolean;
  children: React.ReactNode;
};

function DashboardNavbarBtn({
  text,
  basePath = "/",
  dynamicPaths = [],
  isCollapsed,
  children,
}: DashboardNavbarBtnType) {
  const pathName = usePathname();
  const parts = pathName.split("/");
  const lastPathNamePart = parts[parts.length - 1];

  return (
    <Button
      asChild
      className={cn(
        `scale-pro relative h-14 w-full justify-end py-3 text-lg opacity-60 transition-all duration-300 after:absolute after:right-0 after:h-4/6 after:w-1 after:rounded-full after:bg-sky-blue/50 after:opacity-0 after:transition-all after:duration-300 hover:opacity-90 hover:after:opacity-100 md:text-sm lg:text-lg ${
          (basePath == pathName || dynamicPaths.includes(lastPathNamePart)) &&
          "scale-105 pr-6 text-sad-blue !opacity-100 after:bg-sky-blue after:opacity-100"
        } ${
          isCollapsed &&
          (basePath == pathName || dynamicPaths.includes(lastPathNamePart)) &&
          "scale-125 px-4"
        }`
      )}
    >
      <Link
        href={basePath}
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
