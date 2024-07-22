//utils
import { cn } from "@/lib/utils";

//types
type SliderCardType = {
  isActive?: boolean;
  children?: React.ReactNode;
};

export function SliderCard({ isActive, children }: SliderCardType) {
  return (
    <li
      className={cn(
        ` duration-2000 flex w-full cursor-pointer select-none flex-col justify-between gap-2 rounded-lg border-[3px] bg-soft-blue p-2 text-royal-green transition-all ease-in-out sm:p-3 ${
          isActive ? "border-royal-green" : "border-sad-blue"
        }`
      )}
    >
      {children}
    </li>
  );
}
