export default function ItemsCategory() {
  const categories = [
    { name: "پیتزا", is_active: true },
    { name: "برگر", is_active: true },
    { name: "نوشیدنی گرم", is_active: true },
    { name: "نوشیدنی سرد", is_active: false },
  ];
  return (
    <div className="hide-scrollbar avoid-stretch fixed z-20 flex w-full justify-end gap-1 overflow-x-auto bg-white p-2 py-2 sm:px-4">
      {categories.map(
        (category) =>
          category.is_active && <CategoryBtn name={category.name}></CategoryBtn>
      )}
    </div>
  );
}

function CategoryBtn({ name }) {
  return (
    <div className=" h-full w-max rounded-full bg-royale-green px-4 py-1 text-center text-sky-blue">
      <p className=" inline-block">{name}</p>
    </div>
  );
}
