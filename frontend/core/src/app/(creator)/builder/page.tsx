"use client";

import React, { useEffect, useRef, useState } from "react";

//libraries
import gsap from "gsap";

//components
import Builder from "./components/builder/Builder";
import Setup from "./components/setup/Setup";
import { Button } from "@/components/ui/button";

//hooks
import { useSlider } from "@/lib/stores";

export default function Page() {
  const [showBuilder, setShowBuilder] = useState(false);

  const { reset } = useSlider();

  const setupFormRef = useRef(null);
  const builderFormRef = useRef(null);

  const tl = gsap.timeline();
  const hideSetupFormTl = gsap.timeline({
    paused: true,
  });

  useEffect(() => {
    tl.set(setupFormRef.current, { display: "flex" })
      .from(setupFormRef.current, {
        opacity: 0,
        x: 150,
        duration: 0.45,
        ease: "power3.out",
        delay: 0.5,
      })
      .from(
        setupFormRef.current,
        {
          duration: 0.45,
          filter: "blur(4px)",
          ease: "power3.out",
        },
        "<0.1"
      );
  }, []);

  useEffect(() => {
    if (showBuilder) {
      tl.set(builderFormRef.current, { display: "flex" })
        .from(builderFormRef.current, {
          opacity: 0,
          x: 150,
          duration: 0.45,
          ease: "power3.out",
          delay: 0.5,
        })
        .from(
          builderFormRef.current,
          {
            duration: 0.45,
            filter: "blur(4px)",
            ease: "power3.out",
          },
          "<0.1"
        );
    }
  }, [showBuilder]);

  const handleToggleForm = () => {
    hideSetupFormTl
      .to(setupFormRef.current, {
        opacity: 0,
        x: -100,
        duration: 0.45,
        ease: "power3.out",
      })
      .set(setupFormRef.current, {
        display: "none",
      })
      //reset useSlider store onComplete
      //render builder form onComplete
      .eventCallback("onComplete", () => {
        setShowBuilder(true);
        reset();
      });

    hideSetupFormTl.play(); // Trigger the timeline manually
  };

  return (
    <section className="container m-auto flex h-screen w-full items-center justify-between gap-12 overflow-hidden">
      {showBuilder ? (
        <Builder ref={builderFormRef}></Builder>
      ) : (
        <Setup
          handleCustomMenu={handleToggleForm}
          handlePreBuiltMenu={handleToggleForm}
          ref={setupFormRef}
        ></Setup>
      )}
      {/* <div className="absolute left-10 top-10 flex h-max w-max gap-2">
        <Button onClick={handleToggleForm}>next form</Button>
      </div> */}
    </section>
  );
}
