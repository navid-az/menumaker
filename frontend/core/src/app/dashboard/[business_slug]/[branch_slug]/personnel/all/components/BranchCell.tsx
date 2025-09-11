//components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// SVGs
import { Building2 } from "lucide-react";

export function BranchCell({ branches }: { branches: string[] }) {
  if (branches.length === 1) {
    return (
      <span className="inline-flex h-8 items-center px-3 py-1 rounded-full text-xs font-medium border-2 bg-primary-foreground text-primary border-primary">
        {branches[0]}
      </span>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="group h-8 inline-flex hover:bg-primary hover:text-primary-foreground transition-colors duration-300 items-center px-3 py-1 justify-between rounded-full text-xs font-medium border-2 bg-primary-foreground text-primary border-primary gap-2">
            <Building2 className="w-4 h-4 text-primary group-hover:text-primary-foreground duration-300" />
            <p className="mt-0.5">{branches.length} شعبه</p>
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="start">
        <div className="flex gap-4 flex-wrap flex-col">
          <p>لیست شعبه ها</p>
          <div className="flex gap-2 flex-wrap">
            {branches.map((branch) => (
              <span
                key={branch}
                className="inline-flex h-8 items-center px-3 py-1 rounded-full text-xs font-medium border-2 bg-primary-foreground text-primary border-primary w-max"
              >
                {branch}
              </span>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
