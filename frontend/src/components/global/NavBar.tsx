"use client";

import { useState, useEffect } from "react";

//components
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
} from "../ui/sheet";
import AuthSection from "./AuthSection";
import Logo from "./Logo";

//SVGs
import { ChevronLeft, Menu, X } from "lucide-react";

//libraries
import { cn } from "@/lib/utils";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // how far you need to scroll before hiding starts
    const threshold = 80;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when near the top
      if (currentScrollY < threshold) {
        setHidden(false);
      }
      // hide when scrolling down
      else if (currentScrollY > lastScrollY) {
        setHidden(true);
      }
      // show when scrolling up
      else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={cn("p-4 lg:px-16 w-full sticky z-50 top-0 transition-all duration-300", hidden && "-translate-y-full")}>
      <nav
        className={cn(
          "bg-sad-blue/20 w-full backdrop-blur-xl lg:gap-20 border-2 border-royal-green/5 xl:gap-32 rounded-lg flex items-center transition-all duration justify-between p-4 text-xl text-royal-green",

        )}
      >
        <div className="flex gap-4 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="lg:hidden" size="icon">
                <Menu></Menu>
              </Button>
            </SheetTrigger>
            <SheetContent showCloseButton={false} className="p-8">
              <SheetHeader className="p-0">
                <SheetClose asChild>
                  <Button className="lg:hidden" size="icon">
                    <X></X>
                  </Button>
                </SheetClose>

                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 justify-between text-white">
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-royal-green-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/">راهکار ها</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-royal-green-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/builder">ساخت منو هوشمند</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-royal-green-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/pricing">تعرفه ها</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-royal-green-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/pricing">درباره ها</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-royal-green-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/pricing">تماس با ها</Link>
                </Button>
              </div>
              <SheetFooter></SheetFooter>
            </SheetContent>
          </Sheet>

          <Link href="/" className="relative w-32 h-10">
            <Logo></Logo>
          </Link>
        </div>
        <div className="hidden justify-between items-center flex-1 lg:flex">
          <NavBtn
            isLink={false}
            href="/"
            title="راهکار ها"
          ></NavBtn>
          <NavBtn
            href="/builder"
            title="ساخت منو هوشمند"
          ></NavBtn>
          <NavBtn href="/pricing" title="تعرفه ها"></NavBtn>
          <NavBtn href="/" title="درباره ما"></NavBtn>
          <NavBtn href="/" title="تماس با ما"></NavBtn>
        </div>
        <AuthSection></AuthSection>
      </nav>
    </div>
  );
}

const NavBtn = ({
  href,
  title,
  isLink = true,
}: {
  href: string;
  title: string;
  isLink?: boolean;
}) => {
  return (
    <Button
      asChild
      className={cn(
        "hover:bg-royal-green/5 scale-pro hover:scale-105 bg-inherit text-royal-green font-medium text-base rounded-full transition-all duration-300",
      )}
    >
      <Link href={href}>
        {title}
        {!isLink && <ChevronLeft className="size-4"></ChevronLeft>}
      </Link>
    </Button>
  );
};
