"use client";

import React, { useEffect, useRef, useState } from "react";

//components
import Setup from "./setup/Setup";
import BuilderTest from "./builder/BuilderTest";
import SuccessPage from "./success/SuccessPage";

//types
import { type AssetGroupType } from "@/components/global/AssetPicker";

//hooks
import { useSlider } from "@/lib/stores";

//libraries
import { motion, AnimatePresence } from "motion/react";

export default function MenuMaker({
  assetGroups,
}: {
  assetGroups: AssetGroupType[];
}) {
  const [activeForm, setActiveForm] = useState<"setup" | "builder" | "qr">(
    "setup"
  );
  const [businessSlug, setBusinessSlug] = useState("");

  const { reset } = useSlider();

  const setupFormRef = useRef(null);
  const builderFormRef = useRef(null);

  //reset slider states on form change and on initial mount
  useEffect(() => {
    reset();
  }, [activeForm]);

  const onBuilderSuccess = () => {
    setActiveForm("qr");
  };

  return (
    <section className="container m-auto flex h-screen w-full items-center justify-between gap-12 overflow-hidden">
      <AnimatePresence mode="wait">
        {activeForm === "setup" && (
          <motion.div
            className="w-full"
            key="setup"
            initial={{ opacity: 0, x: 200, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              x: -200,
              filter: "blur(4px)",
              transition: {
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              },
            }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <Setup
              ref={setupFormRef}
              handleCustomMenu={() => setActiveForm("builder")}
              handlePreBuiltMenu={() => setActiveForm("builder")}
              setBusinessSlug={setBusinessSlug}
            ></Setup>
          </motion.div>
        )}

        {activeForm === "builder" && (
          <motion.div
            className="w-full"
            key="builder"
            initial={{
              opacity: 0,
              x: 200,
              filter: "blur(4px)",
              transition: { delay: 0.8 },
            }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -200, filter: "blur(4px)" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <BuilderTest
              ref={builderFormRef}
              businessSlug={businessSlug}
              assetGroups={assetGroups}
              onSuccess={() => onBuilderSuccess()}
            ></BuilderTest>
          </motion.div>
        )}

        {activeForm === "qr" && (
          <motion.div
            key="qr"
            initial={{ opacity: 0, x: 200, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -200, filter: "blur(4px)" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="w-screen"
          >
            <SuccessPage businessSlug={businessSlug}></SuccessPage>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
