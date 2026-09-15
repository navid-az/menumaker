"use client";

import { useState, useEffect } from "react";

//SVGs
import { X, CircleAlert } from "lucide-react";

const STORAGE_KEY = "demo_banner_dismissed";

export default function DemoBanner({ isDemo }: { isDemo: boolean }) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    setDismissed(stored === "true");
  }, []);

  if (!isDemo || dismissed) return null;

  const handleClose = () => {
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, "true");
  };

  return (
    <div className="w-full select-none bg-yellow-100 text-yellow-800 text-xs font-normal py-2 px-4 flex items-center justify-center relative">
      <div className="flex justify-center items-center">
        <CircleAlert className="w-3.5 h-3.5 ml-2"></CircleAlert>
        <span>
          شما در حال مشاهده اکانت Demo هستید. اطلاعات اولیه صرفا برای نمایش
          ویژگی های پروژه میباشد.
        </span>
      </div>
      <button onClick={handleClose} className="absolute right-4 cursor-pointer">
        <X size={16} />
      </button>
    </div>
  );
}
