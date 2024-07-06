//components
import ToolBar from "../../components/ToolBar";
import Tools from "../../components/Tools";
import {
  DashboardTabs,
  DashboardTabsTrigger,
} from "../../components/DashboardTabs";

export default function DataLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { menu_id: string };
}) {
  return (
    <>
      <ToolBar>
        <DashboardTabs>
          <DashboardTabsTrigger
            path="items"
            title="آیتم ها"
          ></DashboardTabsTrigger>
          <DashboardTabsTrigger
            path="categories"
            title="دسته بندی ها"
          ></DashboardTabsTrigger>
          <DashboardTabsTrigger
            disabled
            path="offers"
            title="تخفیف ها"
          ></DashboardTabsTrigger>
          <DashboardTabsTrigger
            disabled
            path="costs"
            title="هزینه های مازاد"
          ></DashboardTabsTrigger>
        </DashboardTabs>
        {/* tools of the toolbar depend on the current route */}
        <Tools params={params}></Tools>
      </ToolBar>
      <div className="mt-4">{children}</div>
    </>
  );
}
