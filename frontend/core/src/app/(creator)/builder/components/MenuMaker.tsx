"use client";

import React, { useEffect, useRef, useState } from "react";

//components
import { toast } from "sonner";
import Setup from "./setup/Setup";
import BuilderTest from "./builder/BuilderTest";
import SuccessPage from "./success/SuccessPage";
import PricingPlans from "@/app/(Marketing)/pricing/components/PricingPlans";

//hooks
import { useSlider } from "@/lib/stores";

//libraries
import { motion, AnimatePresence } from "motion/react";

//types
import { type AssetGroupType } from "@/components/global/AssetPicker";
import { type SubscriptionPlan } from "@/app/types/api/subscription";
import { type Business } from "@/app/types/api/business";
type BuilderFormStep = "setup" | "billing" | "builder" | "qr";

//hooks
import { useRouter, useSearchParams } from "next/navigation";

export default function MenuMaker({
  plans,
  businesses,
  assetGroups,
}: {
  plans: SubscriptionPlan[];
  businesses: Business[];
  assetGroups: AssetGroupType[];
}) {
  const [activeForm, setActiveForm] = useState<BuilderFormStep>("setup");
  const [newBusiness, setNewBusiness] = useState<Business | null>(null);
  const [businessSlug, setBusinessSlug] = useState<string>("");

  const router = useRouter();
  const { reset } = useSlider();

  const setupFormRef = useRef(null);
  const builderFormRef = useRef(null);

  const searchParams = useSearchParams();

  // Determine onboarding step from business/subscription state
  useEffect(() => {
    if (businesses.length === 0) {
      // New user must create a business before continuing
      setActiveForm("setup");
    } else if (businesses.length === 1) {
      const business = businesses[0];

      setBusinessSlug(business.slug);

      if (business.subscription_status === "active") {
        if (business.has_menu) {
          setActiveForm("qr");
        } else {
          setActiveForm("builder");
        }
      } else {
        // Business exists but subscription is required
        setActiveForm("billing");
      }
    } else {
      // Multi-business support is not part of MVP
      router.push("/");
    }
  }, [businesses]);

  // set business slug upon creation of a new business
  useEffect(() => {
    if (newBusiness) {
      setBusinessSlug(newBusiness.slug);
    } else {
      if (businesses[0]) {
        setNewBusiness(businesses[0]);
        setBusinessSlug(businesses[0].slug);
      }
    }
  }, [newBusiness, businesses]);

  // show success message if user is redirected via successful payment
  useEffect(() => {
    if (searchParams.get("status") === "OK") {
      const timer = setTimeout(() => {
        toast.success("پرداخت با موفقیت انجام شد");
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Reset slider states on form change and on initial mount
  useEffect(() => {
    reset();
  }, [activeForm]);

  const onBuilderSuccess = () => {
    setActiveForm("qr");
  };

  return (
    <section className="flex h-screen w-full items-center justify-between gap-12 overflow-hidden">
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
              // handleCustomMenu={() => setActiveForm("billing")}
              // handlePreBuiltMenu={() => setActiveForm("billing")}
              setNewBusiness={setNewBusiness}
              onSuccess={() => setActiveForm("billing")}
            ></Setup>
          </motion.div>
        )}

        {activeForm === "billing" && (
          <motion.div
            className="w-full px-20"
            key="billing"
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
            <PricingPlans
              isCompact
              businessSlug={businessSlug}
              plans={plans}
            ></PricingPlans>
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
            <SuccessPage newBusiness={newBusiness}></SuccessPage>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
