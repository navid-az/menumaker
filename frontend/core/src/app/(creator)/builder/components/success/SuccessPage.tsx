import React from "react";

//components
import { Button } from "@/components/ui/button";
import Link from "next/link";

//libraries
import QrCodeGenerator from "@/components/global/QrCodeGenerator";

//SVGs
import { LoaderCircle } from "lucide-react";

export default function SuccessPage({
  businessSlug,
}: {
  businessSlug: string;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className=" w-[700px] h-[700px] absolute -z-10 border-sad-blue border-2 rounded-full"></div>
      <div className=" w-[1000px] h-[1000px] absolute -z-10 border-sad-blue border-2 rounded-full"></div>
      <div className=" w-[1300px] h-[1300px] absolute -z-10 border-sad-blue border-2 rounded-full"></div>
      <div className="flex flex-col items-center justify-center gap-9">
        <div className="flex flex-col items-center gap-1.5">
          <h2 className="font-bold text-3xl">منو شما با موفقیت ایجاد شد!</h2>
          <p className="font-normal text-base text-center">
            کافیه QR کد زیر رو روی میزها یا هرجای دیگه قرار بدید <br />
            تا مشتری‌ها بتونن منوی شما رو ببینن.
          </p>
        </div>
        {businessSlug ? (
          <QrCodeGenerator
            url={`http://localhost:3000/${businessSlug}/menu`}
          ></QrCodeGenerator>
        ) : (
          <LoaderCircle className="animate-spin w-14 h-14"></LoaderCircle>
        )}
        <div className="flex gap-4 justify-between w-full">
          <Button
            disabled={!businessSlug}
            className="flex-1 transition-all font-normal hover:scale-105 scale-pro duration-300 border-2 bg-royal-green border-royal-green text-soft-blue"
            asChild
          >
            <Link href={`/dashboard/${businessSlug}/data/items`}>ادامه</Link>
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
