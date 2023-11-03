import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// react query
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ItemsCategory({ params, type }) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/single/${params.orgName}`
      );
      return data;
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div
      className={`hide-scrollbar avoid-stretch sticky top-0 z-20 flex overflow-y-auto bg-royale-green p-2 sm:px-4 ${
        type == "vertical"
          ? "h-screen w-2/12 flex-col flex-wrap gap-4"
          : "w-full flex-row gap-1"
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
function CategoryBtn({ name, parentType, id }) {
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

  return (
    <button
      onClick={moveToCat}
      type="button"
      id={`category-${id}`}
      className={`flex items-center justify-center rounded-full bg-sky-blue text-center text-royale-green ${
        parentType == "vertical"
          ? "aspect-square h-auto w-full"
          : "h-full w-max px-4 py-1"
      }`}
    >
      <p className="inline-block">{name}</p>
    </button>
  );
}
