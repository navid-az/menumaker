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

export function UserProfile({
  user,
  businesses,
  children,
}: {
  user: User;
  businesses: any;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const DEMO_MODE_ENABLED = process.env.NEXT_PUBLIC_DEMO_MODE_ENABLED === 'true'


  async function handleLogout() {
    const res = await logOut();

    if (res?.loggedOut) {
      router.refresh();
    }
  }

  return (
    <DropdownMenu dir="rtl" modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-primary-foreground text-primary"
        align="end"
      >
        <DropdownMenuLabel className="flex justify-between items-center">
          {user.phone_number}
          {DEMO_MODE_ENABLED && user.is_demo &&
            <div className="bg-yellow-50 text-yellow-800 border-yellow-400 border rounded-full flex justify-between items-center gap-2 px-2 pl-2.5 py-1">
              <Info className="size-3" />
              <p className="text-xs font-normal">اکانت دمو</p>
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
                <p>آمار و تحلیل</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link
                href={`/dashboard/${businesses[0].slug}/${businesses[0].branches[0].slug}/liveManagement/all`}
              >
                <Radio></Radio>
                <p>مدیریت زنده</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link
                href={`/dashboard/${businesses[0].slug}/${businesses[0].branches[0].slug}/data/items`}
              >
                <ScrollText></ScrollText>
                <p>اطلاعات منو</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link
                href={`/dashboard/${businesses[0].slug}/${businesses[0].branches[0].slug}/personnel/all`}
              >
                <Users></Users>
                <p>پرسنل</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link href={`/dashboard/${businesses[0].slug}/${businesses[0].branches[0].slug}/settings`}>
                <Settings></Settings>
                <p>تنضیمات</p>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link href={"/builder"}>
                <Plus></Plus>
                <p>ثبت مجموعه جدید</p>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="p-0 focus:bg-red-50">
            <form className="h-full w-full" action={handleLogout}>
              <Button
                type="submit"
                className="h-full w-full text-red-600 focus:text-red-600 justify-start items-center bg-inherit px-2"
              >
                <Power className="size-5"></Power>
                <p>خروج از حساب کاربری</p>
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
