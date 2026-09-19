"use client";

import React from "react";

//hooks
import { useRouter } from "next/navigation";

//actions
import { logOut } from "@/app/actions/auth/register";

//components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//SVGs
import {
  Plus,
  Power,
  User2Icon,
  Settings,
  Users,
  ChartColumn,
  Radio,
  ScrollText,
  Info,
} from "lucide-react";

//types
import { User } from "@/app/types/api/auth";

//libraries
import { useTranslations } from "next-intl";

export function UserProfile({
  user,
  businesses,
  locale,
  children,
}: {
  user: User;
  businesses: any;
  locale: string,
  children: React.ReactNode;
}) {
  const router = useRouter();

  const t = useTranslations('userProfile')

  const DEMO_MODE_ENABLED = process.env.NEXT_PUBLIC_DEMO_MODE_ENABLED === 'true'


  async function handleLogout() {
    await logOut();
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-primary-foreground text-primary"
        align={locale === "fa" ? "end" : "start"}
      >
        <DropdownMenuLabel className="flex justify-between items-center">
          {user.phone_number}
          {DEMO_MODE_ENABLED && user.is_demo &&
            <div className="bg-yellow-50 text-yellow-800 border-yellow-400 border rounded-full flex justify-between items-center gap-2 px-1 py-1">
              <Info className="size-4" />
              <p className="text-xs font-normal pe-1">{t('demo.capsule')}</p>
            </div>
          }
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {businesses && businesses.length ? (
          <DropdownMenuGroup>
            <DropdownMenuItem disabled asChild className="group flex gap-2 py-2">
              <Link
                href={`/dashboard/${businesses[0].slug}/${businesses[0].branches[0].slug}/insights`}
              >
                <ChartColumn></ChartColumn>
                <p>{t('navButtons.0')}</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link
                href={`/dashboard/${businesses[0].slug}/${businesses[0].branches[0].slug}/liveManagement/all`}
              >
                <Radio></Radio>
                <p>{t('navButtons.1')}</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link
                href={`/dashboard/${businesses[0].slug}/${businesses[0].branches[0].slug}/data/items`}
              >
                <ScrollText></ScrollText>
                <p>{t('navButtons.2')}</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link
                href={`/dashboard/${businesses[0].slug}/${businesses[0].branches[0].slug}/personnel/all`}
              >
                <Users></Users>
                <p>{t('navButtons.3')}</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link href={`/dashboard/${businesses[0].slug}/${businesses[0].branches[0].slug}/settings`}>
                <Settings></Settings>
                <p>{t('navButtons.4')}</p>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link href={"/builder"}>
                <Plus></Plus>
                <p>{t('createBusinessButton')}</p>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout} className="flex gap-2 py-2 focus:bg-red-50 text-red-600 focus:text-red-600">
            <Power className="text-red-600"></Power>
            <p>{t('navButtons.5')}</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
