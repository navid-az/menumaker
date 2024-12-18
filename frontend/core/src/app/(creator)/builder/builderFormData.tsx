//components
import ItemAdder from "@/components/global/ItemAdder";
import PaletteBuilder from "@/components/global/PaletteBuilder";
import SuggestedPalettes from "@/components/global/SuggestedPalettes";

//types
import { UseFormReturn } from "react-hook-form";
import { formSchemaType } from "./page";
import { keyOfFormSchemaType } from "./page";

export type stepTabBase = {
  title: string;
  description: string;
  iconSrc: string;
  isRadio?: boolean;
  action?: React.ReactNode;
  alwaysOn?: boolean;
};
type stepTabType = stepTabBase &
  (
    | { isRadio: true; value: string; name: keyOfFormSchemaType }
    | { isRadio?: false; value?: string; name?: keyOfFormSchemaType }
  );
export type sliderStepBase = {
  title: string;
  isRadioGroup?: boolean;
  tabs: stepTabType[];
  condition: () => boolean;
};
type sliderStepType = sliderStepBase &
  (
    | { isRadioGroup: true; name: keyOfFormSchemaType }
    | { isRadioGroup?: false; name?: keyOfFormSchemaType }
  );
export type sliderDataType = {
  title: string;
  steps: sliderStepType[];
  condition: () => boolean;
};

export const getSliderData = (
  form: UseFormReturn<formSchemaType>
): sliderDataType[] => [
  {
    title: "شخصی سازی",
    condition: () => true,
    steps: [
      {
        title: "رنگ بندی و ویژگی های ظاهری مورد نظر خود را انتخاب کنید",
        condition: () => true,
        tabs: [
          {
            name: "link_is_active",
            title: "پالت های پیشنهادی",
            description: "ترکیب رنگ های پیش فرز",
            value: "couple",
            iconSrc: "/images/form-icons/palette.svg",
            action: (
              <SuggestedPalettes
                palettes={[
                  ["#264653", "#E76F51"],
                  ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D"],
                  ["#CBDFBD", "#F19C79", "#A44A3F"],
                  ["#011627", "#FF3366", "#2EC4B6", "#F7B801", "#E71D36"],
                  ["#A8DADC", "#457B9D", "#E63946", "#F1FAEE"],
                ]}
              ></SuggestedPalettes>
            ),
          },
          {
            name: "color_palette",
            title: "رنگ بندی منو",
            description: "پالت رنگی دلخواه خود را برای ظاهر منوی ایجاد کنید",
            value: "single",
            iconSrc: "/images/form-icons/pallet.svg",
            alwaysOn: true,
            action: <PaletteBuilder></PaletteBuilder>,
          },
        ],
      },
      {
        title: "رنگ بندی و ویژگی های ظاهری مورد نظر خود را انتخاب کنید",
        isRadioGroup: true,
        name: "main_page_type",
        condition: () => true,
        tabs: [
          {
            title: "رنگبندی",
            description: "تم رنگی و نمای ظاهری منو",
            value: "single",
            iconSrc: "/images/form-icons/pallet.svg",
            action: (
              <ItemAdder
                name="menu_sections"
                limit={1}
                placeholder="نام بخش"
              ></ItemAdder>
            ),
          },
          {
            title: "انیمیشن",
            description: "انیمیشنی که هنگام کلیک روی اجزای منو اجرا میشود",
            value: "couple",
            iconSrc: "/images/form-icons/sparkles.svg",
            action: (
              <ItemAdder
                name="menu_sections"
                limit={3}
                placeholder="نام بخش"
              ></ItemAdder>
            ),
          },
        ],
      },
    ],
  },

  {
    title: "صفحه اصلی",
    condition: () => true,
    steps: [
      {
        title: "تعداد بخش های منو خود را مشخص کنید",
        isRadioGroup: true,
        name: "main_page_type",
        condition: () => true,
        tabs: [
          {
            title: "تک بخشی",
            description: "یک دکمه اصلی برای ورود به صفحه منو",
            value: "single",
            iconSrc: "/images/form-icons/single.svg",
            action: (
              <ItemAdder
                name="menu_sections"
                limit={1}
                placeholder="نام بخش"
              ></ItemAdder>
            ),
          },
          {
            title: "چند بخشی",
            description: "دارای بخش های جداگانه مانند منو کافه و منو رستوران",
            value: "couple",
            iconSrc: "/images/form-icons/couple.svg",
            action: (
              <ItemAdder
                name="menu_sections"
                limit={3}
                placeholder="نام بخش"
              ></ItemAdder>
            ),
          },
          {
            title: "بدون صفحه اصلی",
            description:
              "مشتری بلافاصله پس از اسکن QR کد وارد صفحه آیتم ها میشود",
            value: "none",
            iconSrc: "/images/form-icons/none.svg",
          },
        ],
      },
      {
        title: "ویژگی های مورد نظر خود را انتخاب کنید",
        condition: () => true,
        tabs: [
          {
            name: "link_is_active",
            title: "لینک ها",
            description: "لینک های تلگرام و اینستاگرام و ...",
            iconSrc: "/images/form-icons/link.svg",
            action: (
              <ItemAdder
                name="links"
                limit={4}
                placeholder="نام بخش"
              ></ItemAdder>
            ),
          },
          {
            name: "phone_number_is_active",
            title: "شماره تماس",
            description: "لینک های تلگرام و اینستاگرام و ...",
            iconSrc: "/images/form-icons/phone.svg",
            action: (
              <ItemAdder
                name="phone_numbers"
                limit={3}
                placeholder="نام بخش"
              ></ItemAdder>
            ),
          },
          {
            name: "location_is_active",
            title: "موقعیت مکانی",
            description: "لینک های تلگرام و اینستاگرام و ...",
            iconSrc: "/images/form-icons/pin.svg",
          },
        ],
      },
      //   {
      //     title: "ویژگی های مورد نظر خود را انتخاب کنید",
      //     condition: () => form.watch("link_is_active"),
      //     tabs: [
      //       {
      //         name: "link_is_active",
      //         title: "لینک ها",
      //         description: "لینک های تلگرام و اینستاگرام و ...",
      //         iconSrc: "/images/form-icons/link.svg",
      //       },
      //       {
      //         name: "phone_number_is_active",
      //         title: "شماره تماس",
      //         description: "لینک های تلگرام و اینستاگرام و ...",
      //         iconSrc: "/images/form-icons/link.svg",
      //       },
      //       {
      //         name: "location_is_active",
      //         title: "موقعیت مکانی",
      //         description: "لینک های تلگرام و اینستاگرام و ...",
      //         iconSrc: "/images/form-icons/pin.svg",
      //       },
      //     ],
      //   },
    ],
  },
  {
    title: "صفحه آیتم ها",
    condition: () => form.watch("phone_number_is_active"),
    steps: [
      {
        title: "نوع قالب مورد نظر خود را انتخاب کنید",
        isRadioGroup: true,
        name: "item_page_type",
        condition: () => true,
        tabs: [
          {
            title: "افقی",
            description: "لیست آیتم ها به صورت افقی نمایش داده میشود",
            iconSrc: "/images/form-icons/horizontal-layout.svg",
            value: "horizontal",
          },
          {
            title: "عمودی",
            description: "لیست آیتم ها به صورت عمودی نمایش داده میشود",
            iconSrc: "/images/form-icons/vertical-layout.svg",
            value: "vertical",
          },
        ],
      },
      {
        title: "نوع نمایش دسته بندی آیتم ها را انتخاب کنید",
        isRadioGroup: true,
        name: "categories_display_type",
        condition: () => true,
        tabs: [
          {
            title: "اسلایدی",
            description: "مدل پیش فرز نمایش آیتم ها",
            iconSrc: "/images/form-icons/horizontal-layout.svg",
            value: "slider",
          },
          {
            title: "چرخشی",
            description: "آیتم ها به صورت یک نیم دایره نمایش داده میشوند",
            iconSrc: "/images/form-icons/vertical-layout.svg",
            value: "circular",
          },
        ],
      },
      {
        title: "ویژگی های مورد نظر خود را انتخاب کنید",
        condition: () => true,
        tabs: [
          {
            name: "waiter_request_is_active",
            title: "درخواست گارسون",
            description:
              "دکمه ای که به مشتری این امکان را میدهد که گارسون را صدا بزند",
            iconSrc: "/images/form-icons/concierge-bell.svg",
          },
          {
            name: "search_item_is_active",
            title: "جستجو آیتم ها",
            description: "قابلیت جستجو آیتم ها",
            iconSrc: "/images/form-icons/search.svg",
          },
        ],
      },
    ],
  },
];

//   {
//     title: "شخصی سازی",
//     condition: () => true,
//     steps: [
//       {
//         title: "رنگبندی مورد نظر خود را انتخاب کنید",
//         isRadioGroup: true,
//         name: "item_page_type",
//         condition: () => true,
//         tabs: [
//           {
//             title: "افقی",
//             description: "لیست آیتم ها به صورت افقی نمایش داده میشود",
//             iconSrc: "/images/form-icons/horizontal-layout.svg",
//             value: "horizontal",
//           },
//           {
//             title: "عمودی",
//             description: "لیست آیتم ها به صورت عمودی نمایش داده میشود",
//             iconSrc: "/images/form-icons/vertical-layout.svg",
//             value: "vertical",
//           },
//         ],
//       },
//       {
//         title: "انیمیشن های مورد نظر خود را انتخاب کنید",
//         isRadioGroup: true,
//         name: "item_page_type",
//         condition: () => true,
//         tabs: [
//           {
//             title: "دکمه ها",
//             description: "انیمیشن برای تمامی دکمه های منو",
//             iconSrc: "/images/form-icons/horizontal-layout.svg",
//             value: "horizontal",
//           },
//           {
//             title: "آیتم ها",
//             description: "انیمیشن برای کارت آیتم",
//             iconSrc: "/images/form-icons/vertical-layout.svg",
//             value: "vertical",
//           },
//         ],
//       },
//     ],
//   },
