import React from "react";
import FormTab from "../(creator)/builder/components/FormTab";
import {
  BuilderTabs,
  BuilderTabsSection,
} from "../(creator)/builder/components/BuilderTabs";

export default function Page() {
  return (
    <BuilderTabs>
      <BuilderTabsSection>hello</BuilderTabsSection>
      <BuilderTabsSection>bro</BuilderTabsSection>
    </BuilderTabs>
  );
}
