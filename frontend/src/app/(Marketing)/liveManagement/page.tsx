import React from "react";

//components
import DashboardMockup from "@/app/(Marketing)/components/liveManagement/DashboardMockup";
import Hero from "../components/liveManagement/Hero";

export default function Page() {

  return (
    <div className="h-full w-full">
      {/* Live management intro hero */}
      <Hero></Hero>
      {/* Animated dashboard mockup */}
      <DashboardMockup></DashboardMockup>
    </div>
  );
}


