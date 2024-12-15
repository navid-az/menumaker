"use client";

//components
import { MenuItemPreview } from "./MenuItemPreview";

//libraries
import { InView } from "react-intersection-observer";

//hooks
import { useCategoryBtn } from "@/lib/stores";

//types
export type CategoriesType = {
  id: number;
  menu: string;
  //   items: MenuItemType[];
  icon: {
    name: string;
    image: string;
  };
  name: string;
  text_color: string;
  child_bg: string;
  parent_bg: string;
  is_active: boolean;
};

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
];

export default function MenuItemsWrapperPreview({
  colors,
}: {
  colors: string[];
}) {
  const setActiveCategory = useCategoryBtn(
    (state) => state.updateActiveCategory
  );

  const setInView = (inView: boolean, entry: IntersectionObserverEntry) => {
    if (inView) {
      setActiveCategory(entry.target.getAttribute("id") as string);
    }
  };

  return (
    <div className="flex h-max w-full flex-col gap-3 px-3">
      {categoryData?.map(
        (category) =>
          category["items"].length > 0 && (
            <InView onChange={setInView} rootMargin="-80%" key={category.id}>
              {({ ref }) => {
                return (
                  <section
                    ref={ref}
                    key={category.id}
                    id={category.id.toString()}
                  >
                    {/* <ItemsCategoryTitle
                        categoryIcon={category.icon.image}
                        categoryName={category.name}
                      /> */}
                    <div className="relative grid w-full grid-cols-2 justify-between gap-3">
                      {category["items"].map((item) => (
                        <MenuItemPreview
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          description={item.description}
                          is_available={item.is_available}
                          price={item.price}
                          image={item.image}
                          animations={["ripple", "tactile"]}
                          colors={colors}
                        ></MenuItemPreview>
                      ))}
                    </div>
                  </section>
                );
              }}
            </InView>
          )
      )}
    </div>
  );
}
