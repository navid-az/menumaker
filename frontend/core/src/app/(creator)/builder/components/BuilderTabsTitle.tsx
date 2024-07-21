import React, { useEffect, useRef, useState } from "react";

//libraries
import gsap from "gsap";

//hooks
import { useBuilderTabsTitle } from "@/lib/stores";

export default function BuilderTabsTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const sectionTitle = useBuilderTabsTitle((state) => state.title);
  const prevSectionTitle = useBuilderTabsTitle.getState().title;

  const [title, setTitle] = useState(prevSectionTitle);

  //animate title change
  //initially it will show previous title before fading it to the newly set title for better UI
  useEffect(() => {
    gsap.to(titleRef.current, {
      x: 30,
      opacity: 0,
      duration: 0.28,
      pointerEvents: "auto",
    });
    setTimeout(() => {
      //change title to the newly updated global state title
      setTitle(sectionTitle);

      gsap.to(titleRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.28,
        pointerEvents: "auto",
      });
    }, 150);
  }, [sectionTitle]);

  return (
    <h1
      ref={titleRef}
      className="text-xl font-black text-royal-green sm:text-3xl"
    >
      {title}
    </h1>
  );
}
