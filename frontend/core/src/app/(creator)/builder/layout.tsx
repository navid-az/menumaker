import React from "react";
import Image from "next/image";

export default function MenuBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container m-auto flex items-center justify-center overflow-hidden sm:justify-between">
      <div className="flex h-screen w-screen justify-center sm:w-7/12 lg:w-6/12">
        {children}
      </div>
      <div className="hidden w-5/12 justify-end px-12 sm:flex lg:w-6/12">
        <Image
          src="/svgs/iphone.svg"
          width={280}
          height={570}
          alt="menu prototype"
        ></Image>
      </div>
    </section>
  );
}
