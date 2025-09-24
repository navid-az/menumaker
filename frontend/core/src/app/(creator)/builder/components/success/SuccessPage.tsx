import React from "react";

//components
import { Button } from "@/components/ui/button";
import Link from "next/link";

//libraries
import QrCodeGenerator from "@/components/global/QrCodeGenerator";

//SVGs
import { LoaderCircle } from "lucide-react";

//types
import { BusinessType } from "@/app/dashboard/layout";

export default function SuccessPage({
  businessData,
}: {
  businessData: BusinessType | null;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="aspect-square w-[clamp(400px,40vw,700px)] border-sad-blue border-2 rounded-full"></div>
        <div className="aspect-square w-[clamp(600px,60vw,1000px)] border-sad-blue border-2 rounded-full absolute"></div>
        <div className="aspect-square w-[clamp(800px,80vw,1300px)] border-sad-blue border-2 rounded-full absolute"></div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-9 px-4 max-w-sm">
        <div className="flex flex-col items-center gap-1.5">
          <h2 className="text-xl font-bold sm:text-3xl">
            منو شما با موفقیت ایجاد شد!
          </h2>
          <p className="font-normal text-xs sm:text-base text-center">
            کافیه QR کد زیر رو روی میزها یا هرجای دیگه قرار بدید <br />
            تا مشتری‌ها بتونن منوی شما رو ببینن.
          </p>
        </div>
        {businessData?.slug ? (
          <QrCodeGenerator
            url={`http://localhost:3000/${businessData.slug}/menu`}
          ></QrCodeGenerator>
        ) : (
          <LoaderCircle className="animate-spin w-14 h-14"></LoaderCircle>
        )}
        <div className="flex gap-4 justify-between w-full">
          <Button
            disabled={!businessData?.slug}
            className="flex-1 transition-all font-normal hover:scale-105 scale-pro duration-300 border-2 bg-royal-green border-royal-green text-soft-blue"
            asChild
          >
            <Link
              href={`/dashboard/${businessData?.slug}/${businessData?.branches[0].slug}/data/items`}
            >
              ادامه
            </Link>
          </Button>
          <Button
            disabled
            className="flex-1 transition-all font-normal hover:scale-105 scale-pro bg-soft-blue text-royal-green duration-300 border-sad-blue border-2 hover:border-royal-green"
          >
            ویرایش
          </Button>
        </div>
      </div>
    </div>
  );
}
