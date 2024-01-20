import ToolBar from "../components/ToolBar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "@/app/components/svgs";

export default function Insights() {
  return (
    <Tabs className="h-full" dir="rtl" defaultValue="items">
      <div className="h-full flex-1 rounded-tr-3xl bg-soft-blue p-4">
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
          <Button
            size="lg"
            className="gap-2 rounded-full border-2 border-primary bg-soft-blue px-4 font-bold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="h-5 w-5"></Plus>
            <p className="ltr:mr-1 rtl:ml-1">ایجاد آیتم</p>
          </Button>
        </ToolBar>
        <TabsContent value="items" className="flex">
          <h2>آیتم ها</h2>
        </TabsContent>
        <TabsContent value="item-groups" className="flex">
          <h2>دسته بندی ها</h2>
        </TabsContent>
      </div>
    </Tabs>
  );
}
