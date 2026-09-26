"use client";

import { useState, useEffect, Suspense } from "react";

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
import LocaleSwitcher from "./LocalSwitcher";
import { useTranslations } from "next-intl";

export function Navbar({ locale }: { locale: string }) {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const t = useTranslations('navbar')

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
    <div className={cn("p-4 pb-0 lg:px-16 w-full sticky z-50 top-0 transition-all duration-300", hidden && "-translate-y-full")}>
      <nav
        dir="ltr"
        className={cn(
          "bg-sad-blue/20 w-full backdrop-blur-xl lg:gap-12 border-2 border-royal-green/5 xl:gap-32 rounded-lg flex items-center transition-all duration justify-between p-1.5 lg:p-4 text-xl text-royal-green",

        )}
      >
        <Suspense fallback={null}>
          <div className="flex gap-2">
            <AuthSection locale={locale} />
            <LocaleSwitcher />
          </div>
        </Suspense>
        <div className="hidden justify-between rtl:flex-row-reverse items-center flex-1 lg:flex">
          <NavBtn
            isLink={false}
            href="/"
            title={t('links.0')}
          ></NavBtn>
          <NavBtn
            href="/builder"
            title={t('links.1')}
          ></NavBtn>
          <NavBtn href="/pricing" title={t('links.2')}></NavBtn>
          <NavBtn href="/" title={t('links.3')}></NavBtn>
          <NavBtn href="/" title={t('links.4')}></NavBtn>
        </div>
        <div className="flex lg:gap-4 items-center">
          <Link href="/" className="relative w-32 h-8 lg:h-10">
            <Logo className="h-full"></Logo>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="lg:hidden bg-royal-green" size="icon">
                <Menu></Menu>
              </Button>
            </SheetTrigger>
            <SheetContent showCloseButton={false} side={locale === 'fa' ? 'right' : 'left'} className="p-8">
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
                  <Link href="/">{t('links.0')}</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-royal-green-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/builder">{t('links.1')}</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-royal-green-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/pricing">{t('links.2')}</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-royal-green-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/pricing">{t('links.3')}</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full h-auto text-xl justify-start bg-royal-green-foreground text-gray-600 py-4"
                  asChild
                >
                  <Link href="/pricing">{t('links.4')}</Link>
                </Button>
              </div>
              <SheetFooter></SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
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
        "hover:bg-royal-green/5 rtl:flex-row-reverse scale-pro hover:scale-105 bg-inherit text-royal-green font-medium text-base rounded-full transition-all duration-300",
      )}
    >
      <Link href={href}>
        {title}
        {!isLink && <ChevronLeft className="size-4 rotate-180 rtl:rotate-0"></ChevronLeft>}
      </Link>
    </Button>
  );
};
