//components
import { TabsTrigger } from "@/components/ui/tabs";
import ToolBar from "../../components/ToolBar";
import Link from "next/link";
import DashboardTabs from "../../components/DashboardTabs";
import Tools from "../../components/Tools";

export default function DataLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { menu_id: string };
}) {
  return (
    <div className="bg-white p-4">
      <ToolBar>
        <DashboardTabs dir="rtl">
          <TabsTrigger asChild className="rounded-full" value="items">
            <Link href="items">آیتم ها</Link>
          </TabsTrigger>
          <TabsTrigger asChild className="rounded-full" value="categories">
            <Link href="categories">دسته بندی ها</Link>
          </TabsTrigger>
          <TabsTrigger disabled className="rounded-full" value="offers">
            تخفیف ها
          </TabsTrigger>
          <TabsTrigger disabled className="rounded-full" value="prices">
            هزینه های مازاد
          </TabsTrigger>
        </DashboardTabs>
        {/* tools of the toolbar depend on the current route */}
        <Tools params={params}></Tools>
      </ToolBar>
      <div className="mt-4">{children}</div>
    </div>
  );
}
