//components
import FeatureNameList from "./components/FeatureNameList";
import LiveManagementSection from "./components/sections/LiveManagementSection";
import { GradientSpan } from "./components/GradientSpan";
import StepsSection from "./components/sections/StepsSection";
import BentoFeaturesSection from "./components/sections/BentoFeaturesSection";
import HeroSection from "./components/sections/HeroSection";

export default function Home() {
  return (
    <main className="items-center flex-1">
      <HeroSection></HeroSection>
      <div className="py-24 flex w-full flex-col items-center gap-8 text-center text-royal-green">
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-12 md:leading-19 color-royal-green">
            فراتر از یک
            <br className="hidden lg:block" />
            <GradientSpan variant="dark"> منوی دیجیتال</GradientSpan>
          </h2>
          <h3 className="text-teal-950/60 font-normal max-w-5/6 md:max-w-xl text-sm md:text-xl leading-relaxed">
            منومیکر یک سیستم عملیاتی کامل برای رستوران‌های مدرن است — از منوی زیبا
            تا مدیریت سفارش، رزرو، و آنالیتیکس لحظه‌ای.
          </h3>
        </div>
        <FeatureNameList></FeatureNameList>
      </div>
      <BentoFeaturesSection></BentoFeaturesSection>
      <LiveManagementSection></LiveManagementSection>
      <StepsSection></StepsSection>
    </main>
  );
}
