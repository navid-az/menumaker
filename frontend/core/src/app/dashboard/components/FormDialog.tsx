import React from "react";

//components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

//SVGs
import { Plus } from "lucide-react";

//types
type FormDialogType = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function FormDialog({
  title,
  description,
  children,
}: FormDialogType) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="scale-pro gap-2 rounded-full border-2 border-primary bg-soft-blue px-4 font-bold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
        >
          <Plus className="h-5 w-5"></Plus>
          <p className="ltr:mr-1 rtl:ml-1">{title}</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className=" items-start ">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="font-normal">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button form="item-form" type="submit">
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
