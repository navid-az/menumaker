import React from "react";

//components
import { Button } from "@/components/ui/button";

export function BuilderTabsNavigator() {
  return (
    <>
      <Button className="h-9 rounded-full px-5 sm:h-10 sm:px-6">بعدی</Button>
      <div className="flex gap-1 rounded-full bg-soft-blue p-1">
        <BuilderTabsNavigatorDot active></BuilderTabsNavigatorDot>
        <BuilderTabsNavigatorDot></BuilderTabsNavigatorDot>
      </div>
      <Button className="h-9 rounded-full px-5 sm:h-10 sm:px-6">قبلی</Button>
    </>
  );
}

export function BuilderTabsNavigatorDot({ active }: { active?: boolean }) {
  return (
    <div
      className={`scale-pro h-3 w-3 cursor-pointer rounded-full border-2 transition-all duration-300 hover:scale-110 hover:border-primary sm:h-3.5 sm:w-3.5 ${
        active ? "border-primary bg-primary" : "border-sad-blue bg-sad-blue"
      }`}
    ></div>
  );
}
