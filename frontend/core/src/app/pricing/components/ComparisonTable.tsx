import React from "react";

//functions
import { cn } from "@/lib/utils";

//components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, CircleX } from "lucide-react";

const ComparisonTable = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("relative w-full", className)} {...props} />;
};

const ComparisonTableHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex items-center h-32 top-0 bg-white sticky z-20 border-b-3 border-royal-green/5",
        className
      )}
      {...props}
    />
  );
};

const ComparisonTableHeaderCell = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex-1 h-20 flex items-center", className)} {...props}>
      <h2 className="font-semibold text-4xl px-10">{props.children}</h2>
    </div>
  );
};

const ComparisonTableContent = ({
  className,
  defaultValue,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { defaultValue?: string[] }) => {
  return (
    <Accordion type="multiple" className="w-full" defaultValue={defaultValue}>
      {props.children}
    </Accordion>
  );
};

const ComparisonTableSection = ({
  className,
  value,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  value: string;
}) => {
  return (
    <AccordionItem className="relative border-b-0" value={value}>
      {props.children}
    </AccordionItem>
  );
};

const ComparisonTableSectionTrigger = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className="sticky top-32 z-10">
      <AccordionTrigger className="w-full bg-white cursor-pointer hover:bg-gray-50 flex text-royal-green items-center border-b-2 border-royal-green/5 h-20 px-10 font-semibold text-2xl">
        {props.children}
      </AccordionTrigger>
    </div>
  );
};

const ComparisonTableSectionContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <AccordionContent className="w-full flex flex-col pb-0">
      {props.children}
    </AccordionContent>
  );
};

const ComparisonTableRow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="w-full flex border-b-2 items-center transition-all duration-300 hover:bg-cyan-50 py-6 border-royal-green/5 h-10">
      {props.children}
    </div>
  );
};

const ComparisonTableCell = ({
  className,
  disabled = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { disabled?: boolean }) => {
  return (
    <div className="flex-1 gap-3 h-10 flex items-center px-10">
      {disabled ? (
        <CircleX className="size-5 text-royal-green opacity-60"></CircleX>
      ) : (
        <CheckCircle2 className="size-5 text-royal-green"></CheckCircle2>
      )}
      <div className={cn("flex gap-2 items-center", disabled && "opacity-50")}>
        {props.children}
      </div>
    </div>
  );
};

const ComparisonTableCellTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <p className={cn("text-base font-medium text-royal-green")}>
      {props.children}
    </p>
  );
};
const ComparisonTableCellDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <p className={cn("text-base font-light text-[#256067]")}>
      {props.children}
    </p>
  );
};

export {
  ComparisonTable,
  ComparisonTableHeader,
  ComparisonTableContent,
  ComparisonTableSection,
  ComparisonTableSectionTrigger,
  ComparisonTableSectionContent,
  ComparisonTableRow,
  ComparisonTableCell,
  ComparisonTableCellTitle,
  ComparisonTableCellDescription,
  ComparisonTableHeaderCell,
};
