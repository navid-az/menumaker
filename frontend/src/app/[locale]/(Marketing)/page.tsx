//components
import FeatureNameList from "./components/FeatureNameList";
import LiveManagementSection from "./components/sections/LiveManagementSection";
import StepsSection from "./components/sections/StepsSection";
import BentoFeaturesSection from "./components/sections/BentoFeaturesSection";
import HeroSection from "./components/sections/HeroSection";

//functions
import getLocale from "@/lib/i18n/getLocale";

export default async function Home() {
  const locale = await getLocale()

  return (
    <main className="items-center flex-1">
      <HeroSection></HeroSection>
      <FeatureNameList></FeatureNameList>
      <BentoFeaturesSection></BentoFeaturesSection>
      <LiveManagementSection locale={locale}></LiveManagementSection>
      <StepsSection locale={locale}></StepsSection>
    </main >
  );
}
