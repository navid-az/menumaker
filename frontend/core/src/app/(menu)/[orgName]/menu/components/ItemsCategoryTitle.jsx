export default function ItemsCategoryTitle({ categoryName, sticky = false }) {
  return (
    <div
      className={`${
        sticky && "sticky"
      } left-2 right-2 top-12 z-10 bg-white py-2 text-lg font-semibold`}
    >
      <p className="text-center">{categoryName}</p>
    </div>
  );
}
