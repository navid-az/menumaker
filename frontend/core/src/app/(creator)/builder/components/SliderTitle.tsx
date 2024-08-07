import React, { useEffect, useRef, useState } from "react";

//libraries
import gsap from "gsap";

//hooks
import { useSliderTitle } from "@/lib/stores";
//test
// import { useSlider } from "@/lib/stores";

export default function SliderTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  //test
  // const activeSection = useSlider((state) => state.activeSection);
  // const activeStep = useSlider((state) => state.activeStep);
  // const stepCount = useSlider((state) => state.stepCount);
  // const sectionCount = useSlider((state) => state.sectionCount);

  const sectionTitle = useSliderTitle((state) => state.title);
  const prevSectionTitle = useSliderTitle.getState().title;
  const stepTitle = useSliderTitle((state) => state.subtitle);
  const prevStepTitle = useSliderTitle.getState().subtitle;

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
      <div className="flex justify-between">
        <h1
          ref={titleRef}
          className="select-none text-xl font-black text-royal-green sm:text-3xl"
        >
          {title}
        </h1>
        {/* <div className="flex gap-4 text-lg">
          <span>activeStep:{activeStep}</span>
          <span>stepCount:{stepCount}</span>
          <span>activeSection:{activeSection}</span>
          <span>sectionCount:{sectionCount}</span>
        </div> */}
      </div>
      <h3
        ref={subtitleRef}
        className="select-none text-sm font-medium text-royal-green sm:text-base"
      >
        {subtitle}
      </h3>
    </>
  );
}
