//components
import FeatureNameCapsule from "./FeatureNameCapsule";
import { GradientSpan } from "./GradientSpan";

//libraries
import { getTranslations } from "next-intl/server";

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

export default async function FeatureNameList() {
  const t = await getTranslations("landing.featureNameList");

  return (
    <div className="w-full justify-center flex flex-col items-center gap-8 py-24 ">
      <div className="flex w-full flex-col items-center text-center text-royal-green">
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-12 md:leading-19 color-royal-green">
            {t('title.0')}
            <br className="hidden lg:block" />
            <GradientSpan variant="dark">{t('title.1')}</GradientSpan>
          </h2>
          <h3 className="text-teal-950/60 font-normal max-w-5/6 md:max-w-xl text-sm md:text-xl leading-relaxed">
            {t('subtitle')}
          </h3>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-11/12 md:max-w-3xl">
        <FeatureNameCapsule
          className="bg-yellow-200 border-yellow-700/40 text-yellow-900"
          name={t('names.0')}
          svg={<Palette className="w-4.5 h-4.5" />}
        ></FeatureNameCapsule>
        <FeatureNameCapsule
          className="bg-lime-200 border-lime-700/40 text-lime-900"
          name={t('names.1')}
          svg={<Radio className="w-4.5 h-4.5" />}
        ></FeatureNameCapsule>
        <FeatureNameCapsule
          className="bg-violet-200 border-violet-700/40 text-violet-900"
          name={t('names.2')}
          svg={<ShoppingBag className="w-4.5 h-4.5" />}
        ></FeatureNameCapsule>
        <FeatureNameCapsule
          className="bg-fuchsia-200 border-fuchsia-700/40 text-fuchsia-900"
          name={t('names.3')}
          svg={<ClipboardList className="w-4.5 h-4.5" />}
        ></FeatureNameCapsule>
        <FeatureNameCapsule
          className="bg-orange-200 border-orange-700/40 text-orange-900"
          name={t('names.4')}
          svg={<CalendarClock className="w-4.5 h-4.5" />}
        ></FeatureNameCapsule>
        <FeatureNameCapsule
          className="bg-green-200 border-green-700/40 text-green-900"
          name={t('names.5')}
          svg={<ChartColumn className="w-4.5 h-4.5" />}
        ></FeatureNameCapsule>
        <FeatureNameCapsule
          className="bg-blue-200 border-blue-700/40 text-blue-900"
          name={t('names.6')}
          svg={<ShieldCheck className="w-4.5 h-4.5" />}
        ></FeatureNameCapsule>
        <FeatureNameCapsule
          className="bg-rose-200 border-rose-700/40 text-rose-900"
          name={t('names.7')}
          svg={<Boxes className="w-4.5 h-4.5" />}
        ></FeatureNameCapsule>
      </div>
    </div>
  );
}
