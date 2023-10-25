import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ItemsCategory() {
  const categories = [
    { name: "پیتزا", is_active: true },
    { name: "برگر", is_active: true },
    { name: "نوشیدنی گرم", is_active: true },
    { name: "نوشیدنی سرد", is_active: false },
  ];

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("http://127.0.0.1:8000/menu/");
      return data;
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="hide-scrollbar avoid-stretch fixed z-20 flex w-full justify-end gap-1 overflow-x-auto bg-white p-2 py-2 sm:px-4">
      {data.map((menu) =>
        menu["categories"].map((category) => (
          <CategoryBtn name={category.name}></CategoryBtn>
        ))
      )}
    </div>
  );
}

const wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};
function CategoryBtn({ name }) {
  return (
    <div className=" h-full w-max rounded-full bg-royale-green px-4 py-1 text-center text-sky-blue">
      <p className=" inline-block">{name}</p>
    </div>
  );
}
