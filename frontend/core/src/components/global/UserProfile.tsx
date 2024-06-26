import Link from "next/link";
import { getUserData } from "@/lib/getUserData";
import { getUserPlaces } from "@/lib/getUserPlaces";

//actions
import { logOut } from "@/app/actions";

//components
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
import {
  BarChart,
  Power,
  Radar,
  Settings,
} from "@/app/dashboard/components/svg";

//types
import type { PlacesType } from "@/app/dashboard/layout";
import { User, User2Icon } from "lucide-react";

export async function UserProfile() {
  const { pk, phone_number } = await getUserData();
  const places: PlacesType = await getUserPlaces(pk);

  return (
    <DropdownMenu dir="rtl" modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <User2Icon className="h-6 w-6"></User2Icon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-primary text-primary-foreground"
        align="end"
      >
        <DropdownMenuLabel>{phone_number}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="flex gap-2 py-2">
            <Link href={`/dashboard/${places[0].menu_id}/insights`}>
              <BarChart className="h-5 w-5"></BarChart>
              <p>داشبورد</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex gap-2 py-2">
            <Link href={`/dashboard/${places[0].menu_id}/liveManagement`}>
              <Radar className="h-5 w-5"></Radar>
              <p>مدیریت زنده</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex gap-2 py-2">
            <Link href={`/dashboard/${places[0].menu_id}/liveManagement`}>
              <User className="h-5 w-5"></User>
              <p>پرسنل</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex gap-2 py-2">
            <Link href={`/dashboard/${places[0].menu_id}/liveManagement`}>
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
