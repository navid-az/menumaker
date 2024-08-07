import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// react query
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useRef } from "react";
import { useRippleAnimation } from "../../hooks/useRippleAnimation";
import { useTactileAnimation } from "../../hooks/useTactileAnimation";
import { Button } from "@/components/ui/button";

// import Button from "@/app/components/Button";

export default function ItemsCategory({ params, type }) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/single/${params.menu_id}`
      );
      return data;
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div
      className={`hide-scrollbar avoid-stretch sticky top-0 z-50 flex overflow-y-auto bg-royal-green p-2 transition-all sm:px-4 ${
        type == "vertical"
          ? "h-screen w-2/12 flex-col flex-wrap gap-4"
          : "w-screen flex-row gap-1"
      }`}
    >
      {!isLoading ? (
        data["categories"].map(
          (category) =>
            category.is_active &&
            category["items"].length > 0 && (
              <CategoryBtn
                id={category.id}
                key={category.id}
                name={category.name}
                parentType={type}
              ></CategoryBtn>
            )
        )
      ) : (
        <Skeleton
          width={type == "vertical" ? "100%" : 70}
          height={type == "vertical" ? "" : 32}
          containerClassName={` flex ${
            type == "vertical" ? "flex-col" : "flex-row flex-1 gap-1"
          }`}
          count={10}
          className={`relative !rounded-full  ${
            type == "vertical" ? "pt-[100%]" : ""
          } opacity-70`}
        />
      )}
    </div>
  );
}

function CategoryBtn({ name, parentType, id, children }) {
  const moveToCat = () => {
    const categoryTitle = document.getElementById(`category-title-${id}`);
    const verticalCategoriesNavHeight = 48;

    window.scroll({
      top:
        window.scrollY +
        categoryTitle.getBoundingClientRect().top -
        (parentType != "vertical" && verticalCategoriesNavHeight),
      behavior: "smooth",
    });
  };
  const buttonRef = useRef();
  useRippleAnimation(buttonRef, {
    size: 50,
    duration: 400,
  });
  useTactileAnimation(buttonRef, {});

  return (
    <Button
      id={`category-${id}`}
      onClick={moveToCat}
      size="sm"
      className=" relative h-8 flex-none rounded-full bg-sky-blue px-4 text-royal-green"
      ref={buttonRef}
    >
      {name}
    </Button>
  );
}
