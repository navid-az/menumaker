//components
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Item, itemColumns } from "../../items/columns";
import { Category, categoryColumns } from "../../categories/columns";
import { DataTable } from "../../items/data-table";
import ToolBar from "../../components/ToolBar";
import { CreateItemForm } from "../../components/CreateItemForm";
import FormDialog from "../../components/FormDialog";

//server function
import { revalidatePath } from "next/cache";

//menu categories data
async function getMenuCategoriesData(menu_id: string): Promise<Category[]> {
  const data = await fetch(
    `http://127.0.0.1:8000/menu/${menu_id}/categories/`,
    {
      next: { tags: ["categories"] },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }

  revalidatePath("/dashboard/insights");
  return data.json();
}

//menu items data
async function getMenuItemsData(menu_id: string): Promise<Item[]> {
  const data = await fetch(`http://127.0.0.1:8000/menu/${menu_id}/items/`, {
    next: { tags: ["items"] },
  });
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  revalidatePath("/dashboard/insights");
  return data.json();
}

export default async function Insights({
  params,
}: {
  params: { menu_id: string };
}) {
  const itemsData = await getMenuItemsData(params.menu_id);
  const categoriesData = await getMenuCategoriesData(params.menu_id);

  return (
    <Tabs
      className="flex h-full flex-1 flex-col overflow-y-auto p-4"
      dir="rtl"
      defaultValue="items"
    >
      <ToolBar>
        <TabsList className="h-max gap-2 rounded-full border-2 border-primary bg-soft-blue p-1">
          <TabsTrigger className="rounded-full" value="items">
            آیتم ها
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="item-groups">
            دسته بندی ها
          </TabsTrigger>
          <TabsTrigger disabled className="rounded-full" value="offers">
            تخفیف ها
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="prices">
            هزینه های مازاد
          </TabsTrigger>
        </TabsList>
        <FormDialog
          title="ایجاد آیتم"
          description="با انتخاب گزینه های مورد نظر آیتمی جدید به منو اضافه کنید"
        >
          <CreateItemForm></CreateItemForm>
        </FormDialog>
      </ToolBar>
      <TabsContent value="items" className="mt-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl">آیتم ها</h2>
          <DataTable columns={itemColumns} data={itemsData} />
        </div>
      </TabsContent>
      <TabsContent value="item-groups" className="mt-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl">دسته بندی ها</h2>
          <DataTable columns={categoryColumns} data={categoriesData} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
