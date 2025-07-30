"use client";

import * as React from "react";

//libraries
import { cn } from "@/lib/utils";

//components
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//SVGs
import { ChevronsUpDown, Plus } from "lucide-react";

export function BranchSelector({
  branches,
}: {
  branches: {
    id: number;
    name: string;
    address: string;
    phone_number: number;
  }[];
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-72 justify-between bg-soft-blue border-sad-blue"
        >
          {value
            ? branches.find((branch) => branch.name === value)?.name
            : "شعبه را انتخاب کنید..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-72 p-0">
        <Command className="p-1">
          <CommandInput placeholder="جستوجو شعبه..." className="h-9" />
          <CommandList>
            <CommandEmpty>هیچ شعبه ای یافت نشد</CommandEmpty>
            <CommandGroup
              dir="ltr"
              className="max-h-[125.6px] p-0 pt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent"
            >
              {branches.map((branch) => (
                <CommandItem
                  key={branch.id}
                  value={branch.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="flex justify-between flex-row items-center"
                >
                  <span
                    className={cn(
                      "bg-sad-blue text-royal-green px-4 text-xs rounded-full py-1 border-2 border-royal-green",
                      value === branch.name ? "opacity-100" : "opacity-0"
                    )}
                  >
                    فعال
                  </span>
                  {branch.name}
                  {/* <Check
                    className={cn(
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <Button className="w-full mt-2">
            <Plus></Plus>
            ایجاد شعبه جدید
          </Button>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
