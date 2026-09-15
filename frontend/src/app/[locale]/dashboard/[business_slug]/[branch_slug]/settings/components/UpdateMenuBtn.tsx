import React from "react";

//components
import { Button } from "@/components/ui/button";
import Link from "next/link";

//SVGs
import {
  ConciergeBell,
  Languages,
  Link2,
  Paintbrush,
  Palette,
  PencilRuler,
  PhoneCall,
  ScrollText,
  Search,
  Sparkles,
  SquareRoundCorner,
  SwatchBook,
} from "lucide-react";

const iconRows: readonly (readonly (typeof Palette)[])[] = [
  // Row 1
  [Palette, Palette, Palette, Palette, PencilRuler, Palette, Palette],
  // Row 2
  [
    Palette,
    Palette,
    Palette,
    ConciergeBell,
    Link2,
    PhoneCall,
    SquareRoundCorner,
  ],
  // Row 3
  [Palette, ScrollText, Sparkles, Search, Palette, Palette, Palette],
  // Row 4
  [Palette, Palette, Languages, Paintbrush, SwatchBook, Palette, Palette],
];

const rowHasHoverPush = [true, false, true, false];

export default function UpdateMenuBtn({
  businessSlug,
  branchSlug,
}: {
  businessSlug: string;
  branchSlug: string;
}) {
  return (
    <Button
      asChild
      className="group w-full cursor-pointer h-60 relative flex justify-start px-20 overflow-hidden hover:bg-amber-50 hover:text-amber-950 rounded-4xl hover:border-royal-green duration-300 transition-all bg-soft-blue border-2 border-royal-green/20 text-royal-green "
    >
      <Link
        href={`/${businessSlug}/menu/update?returnTo=/dashboard/${businessSlug}/${branchSlug}/settings`}
      >
        <div className="flex items-start flex-col justify-between gap-4">
          <h4 className="font-semibold text-4xl">ویرایش منو دیجیتال</h4>
          <p className="">برای ویرایش منو دیجیتال کلیک کنید</p>
        </div>
        <div className="flex flex-col gap-4 -rotate-45 absolute -top-24 -left-40 text-red-400">
          {iconRows.map((icons, index) => (
            <div
              key={index}
              className={`flex gap-4 transition-all duration-300 ${rowHasHoverPush[index] ? "group-hover:pr-12" : ""
                }`}
            >
              {icons.map((Icon, colIdx) => (
                <IconSquare key={colIdx}>
                  <Icon className="size-10" />
                </IconSquare>
              ))}
            </div>
          ))}
        </div>
      </Link>
    </Button>
  );
}

function IconSquare({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-20 items-center flex justify-center shadow-lg shadow-zinc-700 rounded-xl bg-royal-green text-soft-blue transition-all duration-300 group-hover:text-yellow-200">
      <div className="rotate-45">{children}</div>
    </div>
  );
}
