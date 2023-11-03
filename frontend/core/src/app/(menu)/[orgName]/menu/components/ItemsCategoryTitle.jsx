export default function ItemsCategoryTitle({
  categoryName,
  sticky = false,
  parentType,
  id,
}) {
  return (
    <>
      <div
        className={`${sticky && "sticky"} ${
          parentType == "vertical" ? "top-0" : "top-12"
        } z-10 bg-white py-2 text-lg font-semibold`}
      >
        <div className="flex justify-between">
          <p className="text-center">{categoryName}</p>
        </div>
      </div>
      <div
        id={`category-title-${id}`}
        className={`
        absolute top-0`}
      ></div>
    </>
  );
}
