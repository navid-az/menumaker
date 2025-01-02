import React from "react";

//components
import Builder from "./components/builder/Builder";

export default function Page() {
  return (
    <section className="container m-auto flex h-screen w-full items-center justify-between gap-12 overflow-hidden">
      <Builder></Builder>
    </section>
  );
}
