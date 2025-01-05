"use client";

import React, { useState } from "react";

//components
import Builder from "./components/builder/Builder";
import Setup from "./components/setup/Setup";

export default function Page() {
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <section className="container m-auto flex h-screen w-full items-center justify-between gap-12 overflow-hidden">
      {showBuilder ? (
        <Builder></Builder>
      ) : (
        <Setup setShowBuilder={setShowBuilder}></Setup>
      )}
    </section>
  );
}
