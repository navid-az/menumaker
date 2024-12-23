//components
import ItemAdder from "@/components/global/ItemAdder";
import PaletteBuilder from "@/components/global/PaletteBuilder";
import SuggestedPalettes from "@/components/global/SuggestedPalettes";
import RadiusSelector from "@/components/global/itemAdderButtons/RadiusSelector";

//types
import { UseFormReturn } from "react-hook-form";
import { formSchemaType } from "./page";
import { keyOfFormSchemaType } from "./page";

export type stepTabBase = {
  title: string;
  description: string;
  iconSrc: string;
  action?: React.ReactNode;
};
type stepTabType = stepTabBase &
  (
    | { alwaysOn: true; name?: never } // If alwaysOn is true, no `name`
    | { alwaysOn?: false; name: keyOfFormSchemaType }
  );
export type sliderStepType =
  | {
      title: string;
      isRadioGroup: true; // If true, modify `tabs` accordingly
      name: keyOfFormSchemaType;
      tabs: (Omit<stepTabType, "name"> & { name?: never; value: string })[]; // Tabs without `name`
      condition: () => boolean;
    }
  | {
      title: string;
      isRadioGroup?: false; // Default or explicitly false
      name?: keyOfFormSchemaType;
      tabs: stepTabType[]; // Standard tabs with `name` logic from `stepTabType`
      condition: () => boolean;
    };
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
        //switches and always on
        tabs: [
          {
            name: "categories_display_type",
            title: "پالت های پیشنهادی",
            description: "ترکیب رنگ های پیش فرز",
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
            alwaysOn: true,
            title: "رنگ بندی منو",
            description: "پالت رنگی دلخواه خود را برای ظاهر منوی ایجاد کنید",
            iconSrc: "/images/form-icons/pallet.svg",
            action: <PaletteBuilder></PaletteBuilder>,
          },
        ],
      },
      {
        title: "رنگ بندی و ویژگی های ظاهری مورد نظر خود را انتخاب کنید",
        condition: () => true,
        //switches and always on
        tabs: [
          {
            alwaysOn: true,
            title: "خمیدگی گوشه ها",
            description: "میزان خمیدگی گوشه های اجزای منو",
            iconSrc: "/images/form-icons/border.svg",
            action: <RadiusSelector></RadiusSelector>,
          },
          {
            name: "categories_display_type",
            title: "انیمیشن",
            description: "انیمیشنی که هنگام کلیک روی اجزای منو اجرا میشود",
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
        isRadioGroup: true,
        name: "main_page_type",
        title: "تعداد بخش های منو خود را مشخص کنید",
        condition: () => true,
        //radio buttons
        tabs: [
          {
            value: "single",
            title: "تک بخشی",
            description: "یک دکمه اصلی برای ورود به صفحه منو",
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
            value: "couple",
            title: "چند بخشی",
            description: "دارای بخش های جداگانه مانند منو کافه و منو رستوران",
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
            value: "none",
            title: "بدون صفحه اصلی",
            description:
              "مشتری بلافاصله پس از اسکن QR کد وارد صفحه آیتم ها میشود",
            iconSrc: "/images/form-icons/none.svg",
          },
        ],
      },
      {
        title: "ویژگی های مورد نظر خود را انتخاب کنید",
        condition: () => true,
        //switches
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
        isRadioGroup: true,
        name: "item_page_type",
        title: "نوع قالب مورد نظر خود را انتخاب کنید",
        condition: () => true,
        //radio buttons
        tabs: [
          {
            value: "horizontal",
            title: "افقی",
            description: "لیست آیتم ها به صورت افقی نمایش داده میشود",
            iconSrc: "/images/form-icons/horizontal-layout.svg",
          },
          {
            value: "vertical",
            title: "عمودی",
            description: "لیست آیتم ها به صورت عمودی نمایش داده میشود",
            iconSrc: "/images/form-icons/vertical-layout.svg",
          },
        ],
      },
      {
        isRadioGroup: true,
        name: "categories_display_type",
        title: "نوع نمایش دسته بندی آیتم ها را انتخاب کنید",
        condition: () => true,
        //radio buttons
        tabs: [
          {
            value: "slider",
            title: "اسلایدی",
            description: "مدل پیش فرز نمایش آیتم ها",
            iconSrc: "/images/form-icons/horizontal-layout.svg",
          },
          {
            value: "circular",
            title: "چرخشی",
            description: "آیتم ها به صورت یک نیم دایره نمایش داده میشوند",
            iconSrc: "/images/form-icons/vertical-layout.svg",
          },
        ],
      },
      {
        title: "ویژگی های مورد نظر خود را انتخاب کنید",
        condition: () => true,
        //switches
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
