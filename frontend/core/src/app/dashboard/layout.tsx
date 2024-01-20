"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { BarChart, Radar, Settings, User } from "./components/svg";
import Link from "next/link";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Menu, User2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const md = useMediaQuery("(min-width: 768px)");
  const lg = useMediaQuery("(min-width: 1024px)");
  return (
    <div className="flex h-screen flex-col bg-primary">
      <DashboardHeader></DashboardHeader>
      <ResizablePanelGroup
        autoSaveId="dashboard-size"
        direction="horizontal"
        className="flex flex-1"
      >
        {md && (
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
              <DashboardNavbar isCollapsed={isCollapsed}></DashboardNavbar>
            </ResizablePanel>
            <ResizableHandle withHandle></ResizableHandle>
          </>
        )}
        <ResizablePanel defaultSize={lg ? 80 : md ? 72 : 80}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

function DashboardHeader() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <header className="flex h-max w-screen justify-between bg-primary p-4 lg:p-8">
      <section className="flex justify-between gap-2">
        <h2 className="font-extrabold text-primary-foreground lg:text-2xl">
          داشبورد مدیریت
        </h2>
        {isMobile && <Menu color="cyan"></Menu>}
      </section>
      <Button size="icon" className=" rounded-full bg-gray-400">
        <User2></User2>
      </Button>
    </header>
  );
}

function DashboardNavbar({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <section className="flex h-full w-full flex-col items-end gap-4 bg-primary px-2 py-8 text-soft-blue">
      <DashboardNavbarBtn
        text="وضعیت مجموعه"
        isCollapsed={isCollapsed}
        path="/dashboard/insights"
      >
        <BarChart className={`${!isCollapsed && "ml-3"} h-6 w-6`}></BarChart>
      </DashboardNavbarBtn>
      <DashboardNavbarBtn
        text="مدیریت زنده"
        isCollapsed={isCollapsed}
        path="/dashboard/liveManagement"
      >
        <Radar className={`${!isCollapsed && "ml-3"} h-6 w-6`}></Radar>
      </DashboardNavbarBtn>
      <DashboardNavbarBtn text="کارمندان مجموعه" isCollapsed={isCollapsed}>
        <User className={`${!isCollapsed && "ml-3"} h-6 w-6`}></User>
      </DashboardNavbarBtn>
      <DashboardNavbarBtn text="تنظیمات" isCollapsed={isCollapsed}>
        <Settings className={`${!isCollapsed && "ml-3"} h-6 w-6`}></Settings>
      </DashboardNavbarBtn>
    </section>
  );
}

function DashboardNavbarBtn({
  text,
  path = "/",
  isCollapsed,
  children,
}: {
  text: string;
  path?: string;
  isCollapsed: boolean;
  children: React.ReactNode;
}) {
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

// before creating 'DashboardNavButton' button example
{
  /* <Button
        asChild
        className="h-max w-full items-center bg-cyan-800 py-3 text-xl text-sad-blue"
      >
        <Link className="flex justify-between gap-4" href="/dashboard/insights">
          {!isCollapsed && <p>5</p>}
          <div className="flex">
            {!isCollapsed && <p>وضعیت مجموعه</p>}
            <BarChart
              className={`${!isCollapsed && "ml-2"} h-7 w-7`}
            ></BarChart>
          </div>
        </Link>
      </Button> */
}
