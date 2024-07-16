import React from "react";

//components
import {
  BuilderTabs,
  BuilderTabsSection,
} from "../(creator)/builder/components/BuilderTabs";
import { BuilderTabsCard } from "../(creator)/builder/components/‌BuilderTabsCard";

export default function Page() {
  return (
    <BuilderTabs>
      <BuilderTabsSection sectionNum={1}>
        <BuilderTabsCard></BuilderTabsCard>
        <BuilderTabsCard></BuilderTabsCard>
        <BuilderTabsCard></BuilderTabsCard>
      </BuilderTabsSection>
      <BuilderTabsSection sectionNum={2}>
        <BuilderTabsCard></BuilderTabsCard>
        <BuilderTabsCard></BuilderTabsCard>
      </BuilderTabsSection>
    </BuilderTabs>
  );
}
