import React from "react";

//components
import { Slider, SliderSection, SliderStep } from "./components/Slider";
import { SliderCard } from "./components/SliderCard";

export default function Page() {
  return (
    <Slider>
      <SliderSection title="title" sectionNum={1}>
        <SliderStep title="title" sectionNum={1} stepNum={1}>
          <SliderCard>card 1</SliderCard>
          <SliderCard>card 2</SliderCard>
        </SliderStep>
        <SliderStep title="title" sectionNum={1} stepNum={2}>
          <SliderCard>card 3</SliderCard>
        </SliderStep>
      </SliderSection>
      <SliderSection title="title" sectionNum={2}>
        <SliderStep title="title" sectionNum={2} stepNum={1}>
          <SliderCard>card 4</SliderCard>
          <SliderCard>card 5</SliderCard>
        </SliderStep>
        <SliderStep title="title" sectionNum={2} stepNum={2}>
          <SliderCard>card 6</SliderCard>
        </SliderStep>
        <SliderStep title="title" sectionNum={2} stepNum={3}>
          <SliderCard>card 7</SliderCard>
          <SliderCard>card 8</SliderCard>
          <SliderCard>card 9</SliderCard>
          <SliderCard>card 10</SliderCard>
        </SliderStep>
      </SliderSection>
      <SliderSection title="title" sectionNum={3}>
        <SliderStep title="title" sectionNum={3} stepNum={1}>
          <SliderCard>card 11</SliderCard>
          <SliderCard>card 12</SliderCard>
          <SliderCard>card 13</SliderCard>
        </SliderStep>
        <SliderStep title="title" sectionNum={3} stepNum={2}>
          <SliderCard>card 14</SliderCard>
          <SliderCard>card 15</SliderCard>
          <SliderCard>card 16</SliderCard>
        </SliderStep>
        <SliderStep title="title" sectionNum={3} stepNum={3}>
          <SliderCard>card 17</SliderCard>
          <SliderCard>card 18</SliderCard>
          <SliderCard>card 19</SliderCard>
        </SliderStep>
        <SliderStep title="title" sectionNum={3} stepNum={4}>
          <SliderCard>card 20</SliderCard>
          <SliderCard>card 21</SliderCard>
          <SliderCard>card 22</SliderCard>
        </SliderStep>
      </SliderSection>
    </Slider>
  );
}
