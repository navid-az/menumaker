//components
import { Button } from "@/components/ui/button";

//SVGs
import { Menu, User2 } from "lucide-react";

//hooks
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { UserProfile } from "@/components/global/UserProfile";

export function DashboardHeader({ menu_id }: { menu_id: string }) {
  // const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <header className="flex h-max w-screen justify-between bg-primary p-4 lg:p-8">
      <section className="flex justify-between gap-2">
        <h2 className="font-extrabold text-primary-foreground lg:text-2xl">
          داشبورد مدیریت
        </h2>
        {/* {isMobile && <Menu color="cyan"></Menu>} */}
      </section>
      <Button className=" rounded-full bg-gray-900">
        {menu_id}
        <User2 className="mr-2"></User2>
      </Button>
      <UserProfile></UserProfile>
    </header>
  );
}
