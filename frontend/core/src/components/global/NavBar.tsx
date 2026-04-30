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
  const [scrolled, setScrolled] = useState(false);

  // Listen for scroll events to update the scrolled state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="p-4 lg:px-16 w-full sticky z-50 top-0">
      <nav
        className={cn(
          "bg-sad-blue/20 w-full lg:gap-20 border-2 border-royal-green/5 xl:gap-32 rounded-lg flex items-center transition-all duration justify-between p-4 text-xl text-royal-green",
          scrolled ? " backdrop-blur-xl" : "backdrop-blur-sm"
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
                  className="w-full h-auto text-xl justify-start bg-primary-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/">راهکار ها</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-primary-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/builder">ساخت منو هوشمند</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-primary-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/pricing">تعرفه ها</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-primary-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/pricing">درباره ها</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-primary-foreground text-gray-600 py-4"
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
            scrolled={scrolled}
            title="راهکار ها"
          ></NavBtn>
          <NavBtn
            href="/builder"
            scrolled={scrolled}
            title="ساخت منو هوشمند"
          ></NavBtn>
          <NavBtn href="/pricing" scrolled={scrolled} title="تعرفه ها"></NavBtn>
          <NavBtn href="/" scrolled={scrolled} title="درباره ما"></NavBtn>
          <NavBtn href="/" scrolled={scrolled} title="تماس با ما"></NavBtn>
        </div>
        <AuthSection></AuthSection>
      </nav>
    </div>
  );
}

const NavBtn = ({
  href,
  title,
  scrolled,
  isLink = true,
}: {
  href: string;
  title: string;
  scrolled: boolean;
  isLink?: boolean;
}) => {
  return (
    <Button
      asChild
      className={cn(
        "hover:bg-royal-green/5 scale-pro hover:scale-105 bg-inherit text-primary font-medium text-base rounded-full transition-all duration-300",
        scrolled ? "text-soft-blue" : "text-primary"
      )}
    >
      <Link href={href}>
        {title}
        {!isLink && <ChevronLeft className="size-4"></ChevronLeft>}
      </Link>
    </Button>
  );
};
