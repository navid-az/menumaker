"use client";

import React, { useEffect } from "react";

import { useParams, usePathname, useRouter } from "next/navigation";

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
import { ChevronsUpDown, MapPin, Plus } from "lucide-react";

//types
import { BranchType } from "../layout";

export function BranchSelector({ branches }: { branches: BranchType[] }) {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ business_slug: string; branch_slug: string }>();

  const [value, setValue] = React.useState(params.branch_slug);

  // change pathname when branch is changed
  useEffect(() => {
    const segments = pathname.split("/");
    segments[3] = value;
    const newPath = segments.join("/");
    setOpen(false);
    setTimeout(() => {
      router.push(newPath);
    }, 200);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="group min-w-72 justify-between transition-colors duration-300 bg-soft-blue border-sad-blue"
        >
          <div className="flex gap-2">
            <MapPin className="w-5 h-5"></MapPin>
            {value
              ? branches.find((branch) => branch.slug === value)?.name
              : "شعبه را انتخاب کنید..."}
          </div>
          <ChevronsUpDown className="opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
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
                  value={branch.slug}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                  }}
                  className="flex justify-between flex-row items-center"
                >
                  <span
                    className={cn(
                      "bg-sad-blue text-royal-green px-4 text-xs rounded-full py-1 border-2 border-royal-green",
                      value === branch.slug ? "opacity-100" : "opacity-0"
                    )}
                  >
                    فعال
                  </span>
                  <div className="flex items-center gap-2">
                    {branch.name}
                    <MapPin className="w-5 h-5"></MapPin>
                  </div>
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
