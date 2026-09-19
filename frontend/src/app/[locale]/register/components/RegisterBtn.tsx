import React from "react";
import { Button } from "@/components/ui/button";

//SVGs
import { LoaderCircle } from "lucide-react";

type RegisterBtnType = {
  text: string;
  isLoading: boolean;
  onClick?: () => void;
};

export default function RegisterBtn({
  text,
  isLoading,
  onClick,
}: RegisterBtnType) {
  return (
    <Button
      className="h-max z-20 w-full py-4 text-xl bg-royal-green text-soft-blue"
      type="submit"
      size="lg"
      disabled={isLoading ? true : false}
      onClick={onClick}
    >
      <p className={` transition-all ${isLoading ? "" : "ltr:translate-x-2 rtl:-translate-x-5"}`}>
        {text}
      </p>
      <span
        className={`mr-2 transition ${isLoading ? "opacity-100" : "ltr:translate-x-2 rtl:-translate-x-5 opacity-0"
          }`}
      >
        <LoaderCircle size={20} className="animate-spin"></LoaderCircle>
      </span>
    </Button>
  );
}
