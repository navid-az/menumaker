import Image from "next/image";

//types
type ItemsCategoryTitleType = {
  id: number;
  categoryName?: string;
  categoryIcon?: string;
  sticky?: boolean;
  direction?: "center" | "right" | "left";
  parentType?: "vertical" | "horizontal";
};

const ItemsCategoryTitle = ({
  id,
  categoryName,
  categoryIcon,
  sticky = false,
  direction = "center",
  parentType = "vertical",
}: ItemsCategoryTitleType) => {
  if (categoryIcon || categoryName) {
    return (
      <span
        className={`${sticky && "sticky top-14 z-30"} ${
          parentType == "vertical" ? " top-0" : "top-12"
        } flex items-center justify-start gap-2 p-2`}
      >
        {direction != "right" && (
          <span className="h-1 flex-1 rounded-full bg-gradient-to-r from-orange-300 from-30%"></span>
        )}
        {categoryIcon && (
          <div className="relative h-6 w-6 flex-none">
            <Image
              src={"http://localhost:8000" + categoryIcon}
              fill
              alt="category icon"
            ></Image>
          </div>
        )}
        {categoryName && (
          <p className="flex-none text-center text-xl text-orange-500">
            {categoryName}
          </p>
        )}
        {direction != "left" && (
          <span className="h-1 flex-1 rotate-180 rounded-full bg-gradient-to-r from-orange-300 from-30%"></span>
        )}
      </span>
    );
  } else {
    return null;
  }
};

export default ItemsCategoryTitle;
