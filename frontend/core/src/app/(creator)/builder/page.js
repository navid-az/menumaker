import FormSection from "./components/homePageForm";
import { FormTab } from "./components/homePageForm";

export default function MenuBuilder() {
  return (
    <main className="">
      <FormSection title="صفحه اصلی">
        <FormTab
          title="تک بخشی"
          description="دارای یک دکمه اصلی برای ورود به صفحه منو"
          icon_src="/images/single.svg"
          type="radio"
          input_type="text"
          id={1}
        ></FormTab>
        <FormTab
          title="تک بخشی"
          description="دارای یک دکمه اصلی برای ورود به صفحه منو"
          icon_src="/images/single.svg"
          type="toggle"
          input_type="text"
          id={1}
        ></FormTab>
        <FormTab
          title="تک بخشی"
          description="دارای یک دکمه اصلی برای ورود به صفحه منو"
          icon_src="/images/single.svg"
          type="toggle"
          input_type="text"
          id={1}
        ></FormTab>
      </FormSection>
    </main>
  );
}
