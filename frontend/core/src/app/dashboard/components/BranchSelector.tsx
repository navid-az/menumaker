"use client";

import React, { useEffect } from "react";

import { useParams, usePathname, useRouter } from "next/navigation";

//libraries
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { type FieldErrors } from "react-hook-form";

//SVGs
import { Loader2 } from "lucide-react";

//components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//SVGs
import { ChevronsUpDown, MapPin, Plus } from "lucide-react";

//types
import { BranchType } from "../layout";
import { createBranch } from "@/app/actions";
export type BranchFormType = z.infer<typeof FormSchema>;
type branchSelectorType = {
  branches: BranchType[];
  defaultValues?: {
    name: string;
    slug: string;
    description: string;
    address: string;
    phone_number: string;
  };
};

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "نام شعبه باید حداقل ۲ حرف باشد",
  }),
  slug: z.string().optional(),
  address: z.string().optional(),
  phone_number: z.string().max(15).optional(),
});

export function BranchSelector({
  branches,
  defaultValues,
}: branchSelectorType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? {
          name: defaultValues.name || "",
          slug: defaultValues.slug || "",
          address: defaultValues.address || "",
          phone_number: "",
        }
      : {
          name: "",
          slug: "",
          address: "",
          phone_number: "",
        },
  });

  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ business_slug: string; branch_slug: string }>();

  const [value, setValue] = React.useState(params.branch_slug);

  // change pathname when branch is changed
  useEffect(() => {
    const segments = pathname.split("/");
    segments[3] = value;
    const newPath = segments.join("/");
    setOpen(false);
    setTimeout(() => {
      router.push(newPath);
    }, 200);
  }, [value]);

  async function onSubmit(data: BranchFormType) {
    const res = await createBranch(data, params.business_slug);
    if (res?.success) {
      //wait for route revalidation to happen first
      setTimeout(() => {
        setOpen(false);
      }, 300);
      toast.success("شعبه با موفقیت ایجاد شد");
      form.reset();
    } else {
      toast.error(res?.error || "خطایی در ایجاد شعبه رخ داد.");
    }
  }

  const onError = (errors: FieldErrors<any>) => {
    form.setError("root", {
      type: "required",
      message: "لطفا موارد الزامی را وارد کنید",
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="group min-w-72 justify-between transition-colors duration-300 bg-soft-blue border-sad-blue"
        >
          <div className="flex gap-2">
            <MapPin className="w-5 h-5"></MapPin>
            {value
              ? branches.find((branch) => branch.slug === value)?.name
              : "شعبه را انتخاب کنید..."}
          </div>
          <ChevronsUpDown className="opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-72 p-0">
        <Command className="p-1">
          <CommandInput placeholder="جستوجو شعبه..." className="h-9" />
          <CommandList>
            <CommandEmpty>هیچ شعبه ای یافت نشد</CommandEmpty>
            <CommandGroup
              dir="ltr"
              className="max-h-[125.6px] p-0 pt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent"
            >
              {branches.map((branch) => (
                <CommandItem
                  key={branch.id}
                  value={branch.slug}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                  }}
                  className="flex justify-between flex-row items-center"
                >
                  <span
                    className={cn(
                      "bg-sad-blue text-royal-green px-4 text-xs rounded-full py-1 border-2 border-royal-green",
                      value === branch.slug ? "opacity-100" : "opacity-0"
                    )}
                  >
                    فعال
                  </span>
                  <div className="flex items-center gap-2">
                    {branch.name}
                    <MapPin className="w-5 h-5"></MapPin>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="scale-pro rounded-lg mt-2 border-2 border-primary bg-soft-blue px-4 font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground">
                <Plus className="ml-2 h-5 w-5"></Plus>
                <p>ایجاد شعبه جدید</p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="items-start">
                <DialogTitle>ایجاد شعبه جدید</DialogTitle>
                <DialogDescription className="font-normal">
                  شعبه جدیدی برای مجموعه خود ثبت کنید
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, onError)}
                  id="item-form"
                  className="w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel htmlFor={field.name}>نام</FormLabel>
                        <FormControl>
                          <Input
                            id={field.name}
                            placeholder='مثلاً "تهران-فرمانیه"'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-normal" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>شماره تماس</FormLabel>
                        <FormControl>
                          <Input
                            id={field.name}
                            placeholder="شماره تماس شعبه را وارد کنید"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>آدرس شعبه</FormLabel>
                        <FormControl>
                          <Textarea
                            className="max-h-40"
                            placeholder='مثلاً "تهران، اکباتان، فاز ۳، روبه‌روی نانوایی"'
                            {...field}
                          ></Textarea>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <DialogFooter className="flex w-full flex-col justify-between gap-2">
                <Button
                  disabled={form.formState.isSubmitting}
                  form="item-form"
                  type="submit"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin"></Loader2>
                  )}
                  ایجاد شعبه جدید
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
