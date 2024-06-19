"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createItem } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Bot } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import FileField from "./FileField";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string(),
  category: z.number(),
  is_active: z.boolean(),
  price: z.number(),
});

export function CreateItemForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      category: 2,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createItem(data);
  }

  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <FileField></FileField>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <div className="flex w-full items-center gap-2">
                  <Input placeholder="پیتزا پپرونی" {...field} />
                  <Button
                    disabled
                    className="flex-none"
                    type="button"
                    size="icon"
                  >
                    <Bot className="h-6 w-6"></Bot>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>توضیحات</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-40"
                  placeholder="توضیحات مربوط به آیتم"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قیمت</FormLabel>
              <FormControl>
                <Input className=" text-left" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex gap-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>گروه</FormLabel>
                <FormControl>
                  <Select dir="rtl">
                    {/* ~~~~~ direction setter ~~~~~ */}
                    <SelectTrigger>
                      <SelectValue placeholder="گروه مورد نظر را انتخاب کنید"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="burger">cheeseburger</SelectItem>
                        <SelectItem value="pizza">peperoni</SelectItem>
                        <SelectItem value="pasta">alfredo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>شعب</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="w-full justify-start px-3 hover:bg-inherit"
                        variant="outline"
                      >
                        انتخاب شعب
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" w-[228px]">
                      <DropdownMenuCheckboxItem
                        checked={showStatusBar}
                        onCheckedChange={setShowStatusBar}
                      >
                        Status Bar
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={showActivityBar}
                        onCheckedChange={setShowActivityBar}
                        disabled
                      >
                        Activity Bar
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={showPanel}
                        onCheckedChange={setShowPanel}
                      >
                        Panel
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <br />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}
