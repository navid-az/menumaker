"use client";

import React, { useEffect, useRef } from "react";

//libraries
import gsap from "gsap";

//components
import { BuilderTabsNavigator } from "./BuilderTabsNavigator";

//hooks
import { useBuilderTabs } from "@/lib/stores";

export function BuilderTabs({ children }: { children: React.ReactNode }) {
  const activeSectionHeight = useBuilderTabs(
    (state) => state.activeSectionHeight
  );

  const sectionsContainerRef = useRef<HTMLDivElement>(null);

  //change the height of the tabs container depending on the height of the active section
  useEffect(() => {
    if (sectionsContainerRef.current) {
      sectionsContainerRef.current.style.height = `${activeSectionHeight}px`;
    }
  }, [activeSectionHeight]);

  return (
    <section className="container flex h-screen w-screen flex-col items-center justify-center gap-4 p-2 transition-all duration-300 ease-in-out xs:px-4 x:px-12 sm:gap-7">
      <header className="w-full">
        <h1
          id="section-title"
          className="text-xl font-black text-royal-green sm:text-3xl"
        >
          صفحه اصلی
        </h1>
      </header>
      <div
        ref={sectionsContainerRef}
        className={`relative flex h-full w-full transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
      <footer className="flex w-full items-center justify-between">
        <BuilderTabsNavigator></BuilderTabsNavigator>
      </footer>
    </section>
  );
}

export function BuilderTabsSection({
  sectionNum,
  children,
}: {
  isActive?: boolean;
  id?: string;
  sectionNum: number;
  children: React.ReactNode;
}) {
  const builderSectionRef = useRef<HTMLDivElement>(null);
  const changeActiveSectionHeight = useBuilderTabs(
    (state) => state.changeActiveSectionHeight
  );
  useEffect(() => {
    //show the active section
    if (sectionNum == activeSection) {
      if (builderSectionRef.current) {
        gsap.to(builderSectionRef.current, {
          x: 0,
          duration: 0.05,
          opacity: 1,
          pointerEvents: "auto",
          delay: 0.03,
        });
        const height = builderSectionRef.current.offsetHeight;
        changeActiveSectionHeight(height);
      }
      //hide previous section
    } else if (sectionNum < activeSection) {
      gsap.to(builderSectionRef.current, {
        x: -200,
        duration: 0.05,
        opacity: 0,
        pointerEvents: "none",
      });
      //hide next section
    } else if (sectionNum > activeSection) {
      gsap.to(builderSectionRef.current, {
        x: 200,
        duration: 0.05,
        opacity: 0,
        pointerEvents: "none",
      });
    }
  });
  const activeSection = useBuilderTabs((state) => state.activeSection);

  return (
    <section
      ref={builderSectionRef}
      className={`absolute flex w-full flex-col gap-2 transition duration-200 ease-in-out`}
    >
      {children}
    </section>
  );
}
