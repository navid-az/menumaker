import React from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/app/components/svgs/animated/loadingSpinner";

type RegisterBtnType = {
  text: string;
  isLoading: boolean;
};

export default function RegisterBtn({ text, isLoading }: RegisterBtnType) {
  return (
    <Button
      className="h-max w-full py-4 text-xl"
      type="submit"
      size="lg"
      disabled={isLoading ? true : false}
    >
      <p className={` transition-all ${isLoading ? "" : "-translate-x-3"}`}>
        {text}
      </p>
      <span
        className={`mr-2 transition ${
          isLoading ? "opacity-100" : "-translate-x-5 opacity-0"
        }`}
      >
        <LoadingSpinner size={20}></LoadingSpinner>
      </span>
    </Button>
  );
}
