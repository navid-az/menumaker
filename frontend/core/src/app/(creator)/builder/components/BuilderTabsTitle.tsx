import React, { useEffect, useRef, useState } from "react";

//libraries
import gsap from "gsap";

//hooks
import { useBuilderTabsTitle } from "@/lib/stores";

export default function BuilderTabsTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  const sectionTitle = useBuilderTabsTitle((state) => state.title);
  const prevSectionTitle = useBuilderTabsTitle.getState().title;
  const stepTitle = useBuilderTabsTitle((state) => state.subtitle);
  const prevStepTitle = useBuilderTabsTitle.getState().subtitle;

  const [title, setTitle] = useState(prevSectionTitle);
  const [subtitle, setSubtitle] = useState(prevStepTitle);

  //animate section title change
  //initially it will show previous section title before fading it to the newly set title for better UI
  useEffect(() => {
    gsap.to(titleRef.current, {
      x: 30,
      opacity: 0,
      duration: 0.28,
    });
    setTimeout(() => {
      //change section title to the newly updated global state title
      setTitle(sectionTitle);

      gsap.to(titleRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.28,
      });
    }, 150);
  }, [sectionTitle]);

  //animate step title change
  //initially it will show previous step title before fading it to the newly set title for better UI
  useEffect(() => {
    gsap.to(subtitleRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.38,
    });
    setTimeout(() => {
      //change step title to the newly updated global state title
      setSubtitle(stepTitle);

      gsap.to(subtitleRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.38,
      });
    }, 150);
  }, [stepTitle]);

  return (
    <>
      <h1
        ref={titleRef}
        className="select-none text-xl font-black text-royal-green sm:text-3xl"
      >
        {title}
      </h1>
      <h3
        ref={subtitleRef}
        className="select-none text-sm font-medium text-royal-green sm:text-base"
      >
        {subtitle}
      </h3>
    </>
  );
}
