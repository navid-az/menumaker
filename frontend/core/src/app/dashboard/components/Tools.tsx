"use client";

import React from "react";

//components
import { Button } from "@/components/ui/button";
import FormDialog from "./FormDialog";
import { CreateItemForm } from "./CreateItemForm";

//hooks
import { usePathname } from "next/navigation";

//SVGs
import { Filter } from "lucide-react";

export default function Tools({ params }: { params: { menu_id: string } }) {
  const pathName = usePathname();

  return (
    <>
      {pathName == `/dashboard/${params.menu_id}/data/items` ? (
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            className="scale-pro h-11 w-11 rounded-full border-2 border-primary bg-soft-blue font-bold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
          >
            <Filter className="h-5 w-5"></Filter>
          </Button>
          <FormDialog
            title="ایجاد آیتم"
            description="با انتخاب گزینه های مورد نظر آیتمی جدید به منو اضافه کنید"
          >
            <CreateItemForm></CreateItemForm>
          </FormDialog>
        </div>
      ) : pathName == `/dashboard/${params.menu_id}/data/categories` ? (
        <FormDialog
          title="ایجاد دسته بندی"
          description="با انتخاب گزینه های مورد نظر دسته بندی جدید به منو اضافه کنید"
        >
          <CreateItemForm></CreateItemForm>
        </FormDialog>
      ) : (
        ""
      )}
    </>
  );
}
