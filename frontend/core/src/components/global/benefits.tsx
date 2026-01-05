import React from "react";
import Image from "next/image";

type BenefitType = { iconSrc: string; title: string; body: string };

export default function Benefits({ iconSrc, title, body }: BenefitType) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border-2 border-[#0D2528] bg-[#0D2528] p-7 text-right text-sky-blue duration-300  ease-in-out hover:border-sky-blue hover:shadow-inner">
      <h4 className="flex text-sky-blue items-center gap-4 text-2xl font-medium">
        <Image src={iconSrc} width={28} height={28} alt="benefits icon"></Image>
        {title}
      </h4>
      <p className="text-soft-blue text-base font-light leading-relaxed">
        {body}
      </p>
    </div>
  );
}
