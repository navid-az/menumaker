import React from "react";

//components
import {
  BuilderTabs,
  BuilderTabsSection,
  BuilderTabsStep,
} from "../(creator)/builder/components/BuilderTabs";
import { BuilderTabsCard } from "../(creator)/builder/components/‌BuilderTabsCard";

export default function Page() {
  return (
    <BuilderTabs>
      <BuilderTabsSection title="صفحه اصلی" sectionNum={1}>
        <BuilderTabsStep title="برای ینسبایسبمنشایب" sectionNum={1} stepNum={1}>
          <BuilderTabsCard>card 1</BuilderTabsCard>
          <BuilderTabsCard>card 2</BuilderTabsCard>
        </BuilderTabsStep>
        <BuilderTabsStep title="برای " sectionNum={1} stepNum={2}>
          <BuilderTabsCard>card 3</BuilderTabsCard>
        </BuilderTabsStep>
      </BuilderTabsSection>
      <BuilderTabsSection title="صفحه منو" sectionNum={2}>
        <BuilderTabsStep title="دهبیسبها" sectionNum={2} stepNum={1}>
          <BuilderTabsCard>card 4</BuilderTabsCard>
          <BuilderTabsCard>card 5</BuilderTabsCard>
        </BuilderTabsStep>
        <BuilderTabsStep title="بیسشبشیسلیش" sectionNum={2} stepNum={2}>
          <BuilderTabsCard>card 6</BuilderTabsCard>
        </BuilderTabsStep>
        <BuilderTabsStep title="title" sectionNum={2} stepNum={3}>
          <BuilderTabsCard>card 7</BuilderTabsCard>
          <BuilderTabsCard>card 8</BuilderTabsCard>
          <BuilderTabsCard>card 9</BuilderTabsCard>
          <BuilderTabsCard>card 10</BuilderTabsCard>
        </BuilderTabsStep>
      </BuilderTabsSection>
      <BuilderTabsSection title="صفحه سفارشات" sectionNum={3}>
        <BuilderTabsStep title="سلام خوبی" sectionNum={3} stepNum={1}>
          <BuilderTabsCard>card 11</BuilderTabsCard>
          <BuilderTabsCard>card 12</BuilderTabsCard>
          <BuilderTabsCard>card 13</BuilderTabsCard>
        </BuilderTabsStep>
        <BuilderTabsStep title="سلام چیکارا میکنی؟" sectionNum={3} stepNum={2}>
          <BuilderTabsCard>card 14</BuilderTabsCard>
          <BuilderTabsCard>card 15</BuilderTabsCard>
          <BuilderTabsCard>card 16</BuilderTabsCard>
        </BuilderTabsStep>
        <BuilderTabsStep title="title" sectionNum={3} stepNum={3}>
          <BuilderTabsCard>card 17</BuilderTabsCard>
          <BuilderTabsCard>card 18</BuilderTabsCard>
          <BuilderTabsCard>card 19</BuilderTabsCard>
        </BuilderTabsStep>
        <BuilderTabsStep title="title" sectionNum={3} stepNum={4}>
          <BuilderTabsCard>card 20</BuilderTabsCard>
          <BuilderTabsCard>card 21</BuilderTabsCard>
          <BuilderTabsCard>card 22</BuilderTabsCard>
        </BuilderTabsStep>
      </BuilderTabsSection>
    </BuilderTabs>
  );
}
