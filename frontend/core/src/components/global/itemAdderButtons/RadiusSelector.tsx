import React, { useEffect, useRef, useState } from "react";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";

//libraries
import { useFormContext } from "react-hook-form";

//hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

//types
export type GlobalBorderRadiusType = "full" | "lg" | "md" | "sm";
type RadiusSelectorBtnType = {
  radius: GlobalBorderRadiusType;
  activeBtn: GlobalBorderRadiusType;
  setActiveBtn: React.Dispatch<React.SetStateAction<GlobalBorderRadiusType>>;
};

export default function RadiusSelector() {
  const [activeBtn, setActiveBtn] = useState<GlobalBorderRadiusType>("full");

  const borderRadiuses: GlobalBorderRadiusType[] = ["full", "lg", "md", "sm"];

  return (
    <div className="flex h-max w-full justify-end gap-2 rounded-md">
      {borderRadiuses.map((radius, index) => (
        <RadiusSelectorBtn
          key={index}
          radius={radius}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
        ></RadiusSelectorBtn>
      ))}
    </div>
  );
}

function RadiusSelectorBtn({
  radius,
  activeBtn,
  setActiveBtn,
}: RadiusSelectorBtnType) {
  const { setValue } = useFormContext();
  const BtnRef = useRef(null);

  //animate button
  useTactileAnimation(BtnRef);

  const handleRadiusChange = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveBtn(radius);
  };

  useEffect(() => {
    setValue("global_styling.border_radius", activeBtn);
  }, [activeBtn]);

  return (
    <Button
      size="icon"
      ref={BtnRef}
      onClick={handleRadiusChange}
      className={`scale-pro h-[52px] w-[52px] border-2 bg-sad-blue/80 transition-[border-color] duration-300 ${
        activeBtn === radius
          ? "border-primary hover:border-primary"
          : "border-transparent hover:border-primary/30"
      }`}
    >
      <Image
        width={24}
        height={24}
        alt="border-radius-icon"
        src={`/images/form-icons/radius-${radius}.svg`}
      ></Image>
    </Button>
  );
}
