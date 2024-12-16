import React, { useRef, useState } from "react";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";

//libraries
import { useFormContext } from "react-hook-form";

//hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

//types
type BorderRadiusType = "full" | "lg" | "md" | "sm";
type RadiusSelectorBtnType = {
  radius: BorderRadiusType;
  activeBtn: BorderRadiusType;
  setActiveBtn: React.Dispatch<React.SetStateAction<BorderRadiusType>>;
};

export default function RadiusSelector() {
  const [activeBtn, setActiveBtn] = useState<BorderRadiusType>("full");

  const borderRadiuses: BorderRadiusType[] = ["full", "lg", "md", "sm"];

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

  useTactileAnimation(BtnRef);

  const handleRadiusChange = (
    e: React.MouseEvent,
    radius: BorderRadiusType
  ) => {
    e.preventDefault();
    setValue("global_border_radius", radius);
    setActiveBtn(radius);
  };

  return (
    <Button
      ref={BtnRef}
      onClick={(e) => handleRadiusChange(e, radius)}
      className={`h-[52px] w-[52px] border-2 bg-sad-blue/80 p-2 transition-all duration-300 ${
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
