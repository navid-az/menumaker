export default function ItemsCategory({ scrolled }) {
  return (
    <div className="hide-scrollbar avoid-stretch fixed z-20 w-full gap-1 overflow-x-auto bg-white p-2 py-2 sm:px-4">
      <CategoryBtn name="پیتزا"></CategoryBtn>
      <CategoryBtn name="برگر"></CategoryBtn>
      <CategoryBtn name="نوشیدنی سرد"></CategoryBtn>
      <CategoryBtn name="نوشیدنی گرم"></CategoryBtn>
      <CategoryBtn name="پاستا"></CategoryBtn>
      <CategoryBtn name="پاستا"></CategoryBtn>
      <CategoryBtn name="پاستا"></CategoryBtn>
      <CategoryBtn name="پاستا"></CategoryBtn>
      <CategoryBtn name="پاستا"></CategoryBtn>
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
