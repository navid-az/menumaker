//SVGs
import { Plus } from "@/app/components/svgs";

//components
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Items, columns } from "../../items/columns";
import { DataTable } from "../../items/data-table";
import ToolBar from "../../components/ToolBar";
import { CreateItemForm } from "../../components/CreateItemForm";

//server function
import { revalidatePath } from "next/cache";

async function getData(menu_id: string): Promise<Items[]> {
  const data = await fetch(`http://127.0.0.1:8000/menu/${menu_id}/items/`, {
    next: { revalidate: 5 },
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
  const data = await getData(params.menu_id);

  return (
    <Tabs className="h-full" dir="rtl" defaultValue="items">
      <div className="h-full flex-1 overflow-y-auto p-4">
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
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="gap-2 rounded-full border-2 border-primary bg-soft-blue px-4 font-bold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground"
              >
                <Plus className="h-5 w-5"></Plus>
                <p className="ltr:mr-1 rtl:ml-1">ایجاد آیتم</p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h3>ایجاد آیتم</h3>
              </DialogHeader>
              <CreateItemForm />
            </DialogContent>
          </Dialog>
        </ToolBar>
        <TabsContent value="items" className="flex flex-col gap-2">
          <h2>آیتم ها</h2>
          <DataTable columns={columns} data={data} />
        </TabsContent>
        <TabsContent value="item-groups" className="flex">
          <h2>دسته بندی ها</h2>
        </TabsContent>
      </div>
    </Tabs>
  );
}
