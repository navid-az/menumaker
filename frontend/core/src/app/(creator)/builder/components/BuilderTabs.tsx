"use client";

import React, { useEffect } from "react";

//components
import { BuilderTabsNavigator } from "./BuilderTabsNavigator";

//hooks
import { useBuilderTabs } from "@/lib/stores";

export function BuilderTabs({ children }: { children: React.ReactNode }) {
  return (
    <section className="container flex w-screen flex-col justify-center gap-4 bg-white p-2 transition-all duration-300 ease-in-out xs:px-4 x:px-12 sm:gap-7">
      <header className="w-full">
        <h1
          id="section-title"
          className=" text-xl font-black text-royal-green sm:text-3xl"
        >
          صفحه اصلی
        </h1>
      </header>
      <div className="relative">{children}</div>
      <footer className="flex items-center justify-between">
        <BuilderTabsNavigator></BuilderTabsNavigator>
      </footer>
    </section>
  );
}

export function BuilderTabsSection({
  isActive,
  id,
  sectionNum,
  children,
}: {
  isActive?: boolean;
  id?: string;
  sectionNum: number;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (isActive) {
    }
  }, [isActive]);

  const activeSection = useBuilderTabs((state) => state.activeSection);

  return (
    <section
      //   id={`form-section-${id}`}
      // relative
      className={`${
        sectionNum == activeSection ? "opacity-100" : "opacity-0"
      } flex w-full flex-col gap-2 bg-red-300 transition duration-200 ease-in-out`}
    >
      {children}
    </section>
  );
}
