import React from "react";
import Image from "next/image";

export default function MenuBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container m-auto flex items-center justify-center gap-12 overflow-hidden sm:justify-between">
      <div className="md: lg:pr flex h-screen w-screen justify-center p-2 sm:w-7/12 sm:px-0 lg:mr-12 lg:w-6/12 xl:mr-32 xl:w-5/12">
        {children}
      </div>
      <div className="hidden h-screen w-5/12 select-none justify-center sm:flex lg:w-6/12">
        <Image
          src="/svgs/iphone.svg"
          width={290}
          height={570}
          alt="menu prototype"
        ></Image>
      </div>
    </section>
  );
}
