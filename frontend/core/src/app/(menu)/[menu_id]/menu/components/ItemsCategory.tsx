//libraries
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

//components
import CategoryBtn from "./CategoryBtn";
import { Skeleton } from "@/components/ui/skeleton";

//data(instance)
const categoryData = {
  type: "horizontal",
  primary_color: "#431407",
  secondary_color: "#fdba74",
  show_background: false,
  animation: ["ripple", "tactile"],
};

//types
export type AnimationVariant = "ripple" | "tactile" | "pulse";
type ItemType = {
  id: number;
  menu: string;
  category: string;
  name: string;
  description: string;
  image: string;
  price: number;
  is_available: boolean;
  is_active: boolean;
};
export type CategoryType = {
  id: number;
  name: string;
  icon: { name: string; image: string };
  is_active: boolean;
  items: ItemType[];
};
type ItemCategoryType = {
  params: { menu_id: string };
  type?: "vertical" | "horizontal";
  variant?: "minimal" | "classic";
  isSticky?: boolean;
  hasBackGround?: boolean;
  allowAnimation?: boolean;
};

// GET menu categories
export async function getCategories(menu_id: string) {
  try {
    let res = await fetch(`http://127.0.0.1:8000/menu/${menu_id}/categories`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error", error);
  }
}

export default async function ItemsCategory({
  params,
  type = "horizontal",
  variant = "minimal",
  isSticky = true,
  hasBackGround = false,
  allowAnimation = true,
}: ItemCategoryType) {
  let categories = await getCategories(params.menu_id);

  return (
    <div
      className={`hide-scrollbar avoid-stretch backdrop-blur-lg ${
        isSticky && "sticky"
      } top-0 z-50 flex overflow-y-auto ${
        hasBackGround && "bg-primary"
      } p-2 transition-all ${
        type == "horizontal"
          ? "w-full flex-row gap-2"
          : "flex-color h-screen w-2/12 flex-col gap-4"
      }`}
    >
      {categories.map(
        (category: CategoryType) =>
          category.is_active &&
          category["items"].length > 0 && (
            <CategoryBtn
              key={category.id}
              id={category.id.toString()}
              name={category.name}
              parentType={type}
              animationType={allowAnimation ? ["tactile", "ripple"] : []}
              icon={category.icon.image}
              style={{
                background: categoryData.secondary_color,
                color: categoryData.primary_color,
              }}
            ></CategoryBtn>
          )
      )}
    </div>
  );
}

//loading skeleton for category buttons
export interface CategoryBtnSkeletonType
  extends VariantProps<typeof categoryBtnSkeletonVariants> {
  parentType?: string;
  size?: "default" | "sm" | "lg" | "icon";
  animationType?: AnimationVariant[];
  className?: string;
}

const categoryBtnSkeletonVariants = cva(
  "w-20 bg-primary-foreground/50 border-2 border-transparent",
  {
    variants: {
      borderRadius: {
        default: "rounded-full",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
      borderRadius: "default",
    },
  }
);

function CategoryBtnSkeleton({
  borderRadius,
  size,
  className,
}: CategoryBtnSkeletonType) {
  return (
    <Skeleton
      className={cn(
        categoryBtnSkeletonVariants({ borderRadius, size, className })
      )}
    ></Skeleton>
  );
}
