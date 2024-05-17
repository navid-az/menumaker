import { logOut } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { getUserData } from "@/lib/getUserData";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  BarChart,
  Power,
  Radar,
  Settings,
  User,
} from "@/app/(dashboard)/dashboard/components/svg";

export async function UserProfile() {
  const user = await getUserData();

  return (
    <DropdownMenu dir="rtl" modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <User className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-primary text-primary-foreground"
        align="end"
      >
        <DropdownMenuLabel>{user.phone_number}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="flex gap-2 py-2">
            <Link href="/dashboard/insights">
              <BarChart className="h-5 w-5"></BarChart>
              <p>داشبورد</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex gap-2 py-2">
            <Link href="/dashboard/liveManagement">
              <Radar className="h-5 w-5"></Radar>
              <p>مدیریت زنده</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex gap-2 py-2">
            <Link href="/dashboard/liveManagement">
              <User className="h-5 w-5"></User>
              <p>پرسنل</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex gap-2 py-2">
            <Link href="/dashboard/liveManagement">
              <Settings className="h-5 w-5"></Settings>
              <p>تنضیمات</p>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <form action={logOut} className="h-full w-full">
              <Button
                type="submit"
                className="h-full w-full items-end justify-start bg-inherit px-2 hover:text-primary"
              >
                <Power className="ml-2 h-5 w-5"></Power>
                <p>خروج از حساب کاربری</p>
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
