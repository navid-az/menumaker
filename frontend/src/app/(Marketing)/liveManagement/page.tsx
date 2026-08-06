import React from "react";

//components
import Hero from "../components/liveManagement/Hero";
import LiveManagementIntro from "../components/liveManagement/LiveManagementIntro";

export default function Page() {

  return (
    <div className="h-full w-full">
      {/* Live management intro hero */}
      <Hero></Hero>
      {/* Animated dashboard mockup */}
      <LiveManagementIntro></LiveManagementIntro>
    </div>
  );
}


