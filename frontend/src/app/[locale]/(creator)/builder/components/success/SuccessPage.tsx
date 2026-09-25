import React from "react";

//components
import { Button } from "@/components/ui/button";
import Link from "next/link";

//libraries
import QrCodeGenerator from "@/components/global/QrCodeGenerator";
import { useTranslations } from "next-intl";

//SVGs
import { LoaderCircle } from "lucide-react";

//configs
import { APP_URL } from "@/lib/config";

//types
import { type Business } from "@/app/types/api/business";

export default function SuccessPage({
  newBusiness,
}: {
  newBusiness: Business | null;
}) {
  const t = useTranslations('builder.successPage')

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="aspect-square w-[clamp(400px,40vw,700px)] border-sad-blue border-2 rounded-full"></div>
        <div className="aspect-square w-[clamp(600px,60vw,1000px)] border-sad-blue border-2 rounded-full absolute"></div>
        <div className="aspect-square w-[clamp(800px,80vw,1300px)] border-sad-blue border-2 rounded-full absolute"></div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-9 px-4">
        <div className="flex flex-col justify-center items-center gap-1.5">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t("title")}
          </h2>
          <p className="font-normal text-sm sm:text-base text-center">
            {t("description.0")}
            <br />
            {t("description.1")}
          </p>
        </div>
        {newBusiness?.slug ? (
          <QrCodeGenerator
            url={`${APP_URL}/${newBusiness.slug}/menu`}
          ></QrCodeGenerator>
        ) : (
          <LoaderCircle className="animate-spin w-14 h-14"></LoaderCircle>
        )}
        <div className="flex gap-4 justify-between w-full max-w-sm rtl:flex-row-reverse">
          <Button
            disabled
            className="flex-1 transition-all font-normal hover:scale-105 scale-pro bg-soft-blue text-royal-green duration-300 border-sad-blue border-2 hover:border-royal-green"
          >
            {t("buttons.edit")}
          </Button>
          <Button
            disabled={!newBusiness?.slug}
            className="flex-1 transition-all font-normal hover:scale-105 scale-pro duration-300 border-2 bg-royal-green border-royal-green text-soft-blue"
            asChild
          >
            <Link
              href={`/dashboard/${newBusiness?.slug}/${newBusiness?.branches[0].slug}/data/items`}
            >
              {t("buttons.continue")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
