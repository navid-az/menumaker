import Form from "./components/homePageForm";
import { FormTab, ToggleBtn, FormSection } from "./components/homePageForm";

export default function MenuBuilder() {
  return (
    <main className="flex">
      <Form title="صفحه اصلی">
        <FormSection title="صفحه اصلی">
          <FormTab
            title="تک بخشی"
            description="دارای یک دکمه اصلی برای ورود به صفحه منو"
            icon_src="/images/single.svg"
            id={1}
          ></FormTab>
          <FormTab
            title="چند بخشی"
            description="دارای یک دکمه اصلی برای ورود به صفحه منو"
            icon_src="/images/couple.svg"
            type="radio"
            id={2}
          ></FormTab>
          <FormTab
            title="بدون صفحه اصلی"
            description="دارای یک دکمه اصلی برای ورود به صفحه منو"
            icon_src="/images/none.svg"
            type="radio"
            id={3}
          ></FormTab>
        </FormSection>
        <FormSection title="صفحه اصلی">
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
            id={2}
          ></FormTab>
          <FormTab
            title="تک بخشی"
            description="دارای یک دکمه اصلی برای ورود به صفحه منو"
            icon_src="/images/single.svg"
            type="toggle"
            id={3}
          ></FormTab>
        </FormSection>
      </Form>
    </main>
  );
}
