"use client";

import React, { useEffect, useRef, useState } from "react";

//libraries
import gsap from "gsap";

//components
import Builder from "./components/builder/Builder";
import Setup from "./components/setup/Setup";

//hooks
import { useSlider } from "@/lib/stores";

export default function Page() {
  const [showBuilder, setShowBuilder] = useState(false);

  const { reset } = useSlider();

  const setupFormRef = useRef(null);
  const builderFormRef = useRef(null);

  const hideSetupFormTl = gsap.timeline({
    paused: true,
  });

  useEffect(() => {
    const setupForm = setupFormRef.current;

    // Ensure initial styles are set
    gsap.set(setupForm, {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    });

    const tl = gsap.timeline();
    tl.set(setupForm, { display: "flex" })
      .from(setupForm, {
        x: 150,
        opacity: 0,
        ease: "power3.out",
        duration: 0.45,
        delay: 0.5,
      })
      .from(
        setupForm,
        {
          filter: "blur(4px)",
          duration: 0.45,
          ease: "power3.out",
        },
        "<0.1"
      );

    return () => {
      tl.kill(); // Stop and clear the timeline
    };
  }, []);

  useEffect(() => {
    if (showBuilder) {
      const showBuilderFormTl = gsap.timeline();

      showBuilderFormTl
        .set(builderFormRef.current, { display: "flex" })
        .from(builderFormRef.current, {
          x: 150,
          opacity: 0,
          duration: 0.45,
          delay: 0.5,
          ease: "power3.out",
        })
        .from(
          builderFormRef.current,
          {
            filter: "blur(4px)",
            duration: 0.45,
            ease: "power3.out",
          },
          "<0.1"
        );
      return () => {
        showBuilderFormTl.kill(); // Stop and clear the timeline
      };
    }
  }, [showBuilder]);

  const handleToggleForm = () => {
    hideSetupFormTl

      .to(setupFormRef.current, {
        filter: "blur(4px)",
        duration: 0.45,
        ease: "power3.out",
      })
      .to(
        setupFormRef.current,
        {
          opacity: 0,
          x: -150,
          duration: 0.45,
          ease: "power3.out",
        },
        "<0.1"
      )
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
