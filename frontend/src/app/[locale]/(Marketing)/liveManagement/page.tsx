import React from "react";

//components
import Hero from "../components/liveManagement/Hero";
import LiveManagementIntro from "../components/liveManagement/LiveManagementIntro";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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


