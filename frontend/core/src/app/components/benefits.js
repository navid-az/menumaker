import React from "react";
import Image from "next/image";

export default function Benefits({ icon, title, body }) {
  return (
    <div className=" flex flex-col items-end gap-4 rounded-2xl border-2 border-royal-green-dark bg-royal-green-dark p-7 text-right text-sky-blue duration-300  ease-in-out hover:border-sky-blue hover:shadow-inner">
      <h4 className="flex items-center gap-4 text-2xl font-medium">
        {title}
        <Image src={icon} width={30} height={30} alt="lightening"></Image>
      </h4>
      <p className=" text-base font-light leading-relaxed">{body}</p>
    </div>
  );
}
