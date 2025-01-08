//components
import ToolBar from "../../components/ToolBar";
import Tools from "../../components/Tools";
import {
  DashboardTabs,
  DashboardTabsTrigger,
} from "../../components/DashboardTabs";

export default async function DataLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ menu_id: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

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
