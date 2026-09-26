"use client";

import { useState } from "react";

//components
import { toast } from "sonner";
import RegisterBtn from "@/app/[locale]/register/components/RegisterBtn";

//actions
import { initiatePayment } from "@/app/actions/subscription/checkout";

//hooks
import { useSearchParams } from "next/navigation";

//types
import { type SubscriptionPlan } from "@/app/types/api/subscription";

//libraries
import { useTranslations } from "next-intl";

export default function CheckoutForm({
  planData,
}: {
  planData: SubscriptionPlan;
}) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations('checkout.form')

  const businessSlug = searchParams.get("business");
  const duration = searchParams.get("duration");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!businessSlug || !duration) {
      onError(new Error("Missing required checkout parameters"));
      return;
    }

    try {
      setIsLoading(true);

      await initiatePayment(businessSlug, planData.slug, Number(duration));
    } catch (error) {
      onError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function onError(error: unknown) {
    console.error(error);

    toast.error(t('form.toasts.onError'));
  }

  return (
    <form onSubmit={onSubmit}>
      <RegisterBtn isLoading={isLoading} text={t('submitBtn')}></RegisterBtn>
    </form>
  );
}
