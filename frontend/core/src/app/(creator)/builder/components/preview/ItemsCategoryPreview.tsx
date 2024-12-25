"use client";

//components
import CategoryBtnPreview from "./CategoryBtnPreview";

// mockup data
const categoryData = [
  {
    id: 1,
    menu: "venhan",
    items: [
      {
        id: 63,
        menu: "venhan",
        category: "سالاد",
        name: "سالاد سزار",
        description:
          "کاهو,سس سزار,زیتون سیاه,نان مخصوص, روغن زیتون,۲۵۰ گرم سینه مرغ گریل شده,گوجه تازه",
        image: "/media/menu/items/images/salad-sezar-680607864_mMwX2iP.jpg",
        price: 267000,
        is_available: true,
        is_active: true,
      },
      {
        id: 64,
        menu: "venhan",
        category: "سالاد",
        name: "سالاد مخصو وایل وود",
        description: "",
        image: "/media/menu/items/images/50-1504337676_rsdSWwT.jpg",
        price: 324000,
        is_available: false,
        is_active: false,
      },
      {
        id: 65,
        menu: "venhan",
        category: "سالاد",
        name: "مون سالاد",
        description: "",
        image:
          "/media/menu/items/images/%D9%85%D9%88%D9%86-%D8%B3%D8%A7%D9%84%D8%A7%D8%AF-1657896697_ZNDjYeI.jpg",
        price: 214000,
        is_available: false,
        is_active: false,
      },
    ],
    icon: {
      name: "salad",
      image: "/media/iconPicker/icons/salad-colored-outline.svg",
    },
    name: "سالاد",
    text_color: "#FFFFFF",
    child_bg: "#FFFFFF",
    parent_bg: "#FFFFFF",
    is_active: true,
  },
  {
    id: 2,
    menu: "venhan",
    items: [
      {
        id: 55,
        menu: "venhan",
        category: "برگر",
        name: "برگر قارچ",
        description: "۲۰۰ گرم گوشت راسته",
        image: "/media/menu/items/images/Double-Cheeseburger-1_zxnT1WT.jpg",
        price: 250000,
        is_available: false,
        is_active: true,
      },
      {
        id: 61,
        menu: "venhan",
        category: "برگر",
        name: "سیب زمینی",
        description: "",
        image: "/media/menu/items/images/fires.jpg",
        price: 20000,
        is_available: false,
        is_active: false,
      },
    ],
    icon: {
      name: "burger",
      image: "/media/iconPicker/icons/cheeseburger-colored-outline.svg",
    },
    name: "برگر",
    text_color: "#FFFFFF",
    child_bg: "#FFFFFF",
    parent_bg: "#FFFFFF",
    is_active: true,
  },
  {
    id: 9,
    menu: "venhan",
    items: [
      {
        id: 66,
        menu: "venhan",
        category: "پاستا",
        name: "پاستا آلفردو",
        description: "خیلی خوبه قول میدم",
        image: "/media/menu/items/images/unnamed-768x596-3631302702.jpg",
        price: 328000,
        is_available: true,
        is_active: false,
      },
    ],
    icon: {
      name: "spaghetti",
      image: "/media/iconPicker/icons/pasta-minimal.svg",
    },
    name: "پاستا",
    text_color: "#FFFFFF",
    child_bg: "#FFFFFF",
    parent_bg: "#FFFFFF",
    is_active: true,
  },
  {
    id: 11,
    menu: "venhan",
    items: [
      {
        id: 67,
        menu: "venhan",
        category: "نوشیدنی های سرد",
        name: "آفوگاتو",
        description: "",
        image:
          "/media/menu/items/images/%D8%B7%D8%B1%D8%B2-%D8%AA%D9%87%DB%8C%D9%87-%D8%A2%D9%81%D9%88%DA%AF%D8%A7%D8%AA%D9%88-2422785558.jpg",
        price: 93000,
        is_available: true,
        is_active: true,
      },
    ],
    icon: {
      name: "lemon-juice",
      image: "/media/iconPicker/icons/lemonjuice-colored-outline.svg",
    },
    name: "نوشیدنی های سرد",
    text_color: "#FFFFFF",
    child_bg: "#FFFFFF",
    parent_bg: "#FFFFFF",
    is_active: true,
  },
];

export type CategoryType = {
  id: number;
  name: string;
  icon: { name: string; image: string };
  is_active: boolean;
  // items: MenuItemType[];
};
type ItemsCategoryType = {
  type?: "vertical" | "horizontal";
  variant?: "minimal" | "classic";
  isSticky?: boolean;
  hasBackGround?: boolean;
  allowAnimation?: boolean;
  colors: string[];
  globalBorderRadius: "full" | "lg" | "md" | "sm";
};

export default function ItemsCategoryPreview({
  type = "horizontal",
  variant = "minimal",
  isSticky = true,
  hasBackGround = false,
  allowAnimation = true,
  colors,
  globalBorderRadius,
}: ItemsCategoryType) {
  return (
    <div
      className={`hide-scrollbar avoid-stretch h-200px overflow-x-auto pb-4 backdrop-blur-lg ${
        isSticky && "sticky"
      } flex ${hasBackGround && "bg-primary"} p-2 transition-all ${
        type == "horizontal"
          ? "h-max w-full flex-row gap-2"
          : "flex-color h-full w-2/12 flex-col gap-4"
      }`}
    >
      {categoryData.map((category) => (
        <CategoryBtnPreview
          key={category.id}
          id={category.id.toString()}
          name={category.name}
          parentType={type}
          icon={category.icon.image}
          animations={["ripple", "tactile"]}
          colors={colors}
          globalBorderRadius={globalBorderRadius}
        ></CategoryBtnPreview>
      ))}
    </div>
  );
}
