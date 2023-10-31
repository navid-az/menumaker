import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// react query
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ItemsCategory({ params }) {
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
    <div className="hide-scrollbar avoid-stretch fixed z-20 flex w-full gap-1 overflow-auto bg-soft-blue p-2 py-2 sm:px-4">
      {!isLoading ? (
        data["categories"].map(
          (category) =>
            category.is_active &&
            category["items"].length > 0 && (
              <CategoryBtn key={category.id} name={category.name}></CategoryBtn>
            )
        )
      ) : (
        <Skeleton
          width={70}
          height="32px"
          containerClassName="flex-1 flex gap-1"
          count={10}
          className="!rounded-full opacity-70"
        />
      )}
    </div>
  );
}
function CategoryBtn({ name }) {
  return (
    <div className="h-full w-max rounded-full bg-royale-green px-4 py-1 text-center text-sky-blue">
      <p className=" inline-block">{name}</p>
    </div>
  );
}

// const wait = (duration) => {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// };
