"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

//SVGs
import { BarChart, Radar, ScrollText, Settings, User } from "./svg";

//hooks
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";

//components
import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";
import MyPlacesTab from "./MyPlacesTab";

//types
// import { PlacesType } from "../../layout"
import { PlacesType } from "@/app/(dashboard)/dashboard/layout";

export default function DashboardNavbar({ places }: { places: PlacesType }) {
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
        <MyPlacesTab
          places={places}
          position="صاحب مجموعه"
          isCollapsed={isCollapsed}
          collapsePanel={collapsePanel}
        ></MyPlacesTab>
        <DashboardNavbarBtn
          text="وضعیت مجموعه"
          isCollapsed={isCollapsed}
          path={`/dashboard/${params.menu_id}/insights`}
        >
          <BarChart className={`${!isCollapsed && "ml-3"} h-6 w-6`}></BarChart>
        </DashboardNavbarBtn>
        <DashboardNavbarBtn
          text="مدیریت زنده"
          isCollapsed={isCollapsed}
          path={`/dashboard/${params.menu_id}/liveManagement`}
        >
          <Radar className={`${!isCollapsed && "ml-3"} h-6 w-6`}></Radar>
        </DashboardNavbarBtn>
        <DashboardNavbarBtn
          text="آیتم و دسته بندی ها"
          isCollapsed={isCollapsed}
          path={`/dashboard/${params.menu_id}/items`}
        >
          <ScrollText
            className={`${!isCollapsed && "ml-3"} h-6 w-6`}
          ></ScrollText>
        </DashboardNavbarBtn>
        <DashboardNavbarBtn text="پرسنل" isCollapsed={isCollapsed}>
          <User className={`${!isCollapsed && "ml-3"} h-6 w-6`}></User>
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
        `scale-pro relative h-14 w-full justify-end py-3 text-lg text-sad-blue/60 transition-all duration-300 after:absolute after:right-0 after:h-4/6 after:w-1 after:rounded-full after:bg-sky-blue/50 after:opacity-0 after:transition-all after:duration-300 hover:text-sad-blue/90 hover:after:opacity-100 md:text-sm lg:text-lg ${
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
