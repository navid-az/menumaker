import React from "react";

//components
import FeatureNameCapsule from "./FeatureNameCapsule";

//SVGs
import {
  Boxes,
  CalendarClock,
  ChartColumn,
  ClipboardList,
  Palette,
  Radio,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

export default function FeatureNameList() {
  return (
    <div className="flex flex-wrap justify-center gap-3 max-w-11/12 md:max-w-3xl xl:max-w-6xl">
      <FeatureNameCapsule
        className="bg-yellow-200 border-yellow-700/40 text-yellow-900"
        name="منوساز"
        svg={<Palette className="w-4.5 h-4.5" />}
      ></FeatureNameCapsule>
      <FeatureNameCapsule
        className="bg-lime-200 border-lime-700/40 text-lime-900"
        name="مدیریت زنده"
        svg={<Radio className="w-4.5 h-4.5" />}
      ></FeatureNameCapsule>
      <FeatureNameCapsule
        className="bg-violet-200 border-violet-700/40 text-violet-900"
        name="سفارش آنلاین"
        svg={<ShoppingBag className="w-4.5 h-4.5" />}
      ></FeatureNameCapsule>
      <FeatureNameCapsule
        className="bg-fuchsia-200 border-fuchsia-700/40 text-fuchsia-900"
        name="نظرسنجی"
        svg={<ClipboardList className="w-4.5 h-4.5" />}
      ></FeatureNameCapsule>
      <FeatureNameCapsule
        className="bg-orange-200 border-orange-700/40 text-orange-900"
        name="رزرواسیون"
        svg={<CalendarClock className="w-4.5 h-4.5" />}
      ></FeatureNameCapsule>
      <FeatureNameCapsule
        className="bg-green-200 border-green-700/40 text-green-900"
        name="آمار و تحلیل"
        svg={<ChartColumn className="w-4.5 h-4.5" />}
      ></FeatureNameCapsule>
      <FeatureNameCapsule
        className="bg-blue-200 border-blue-700/40 text-blue-900"
        name="مدیریت دسترسی"
        svg={<ShieldCheck className="w-4.5 h-4.5" />}
      ></FeatureNameCapsule>
      <FeatureNameCapsule
        className="bg-rose-200 border-rose-700/40 text-rose-900"
        name="انبارداری"
        svg={<Boxes className="w-4.5 h-4.5" />}
      ></FeatureNameCapsule>
    </div>
  );
}
