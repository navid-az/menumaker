//components
import { Skeleton } from "@/components/ui/skeleton";

//types
import { type MenuGlobalStyling } from "../../page";

const CategoryBtnSkeleton = ({
  globalStyling,
}: {
  globalStyling: MenuGlobalStyling;
}) => {
  return (
    <div className={`flex w-screen gap-2 overflow-x-auto p-2`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton
          key={index}
          style={{ backgroundColor: globalStyling.secondary_color }}
          className="h-10 w-40 rounded-full"
        />
      ))}
    </div>
  );
};

export default CategoryBtnSkeleton;
