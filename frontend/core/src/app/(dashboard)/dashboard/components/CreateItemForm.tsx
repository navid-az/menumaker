"use client";
import React, { useState } from "react";

//zod validator
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//hooks
import { useForm } from "react-hook-form";

//actions
import { createItem } from "@/app/actions";

//SVGs
import { Bot, Plus } from "lucide-react";

const FormSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().optional(),
  price: z.string().optional(),
  category: z.string({ required_error: "انتخاب دسته بندی الزامی است" }),
});

export function CreateItemForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="item-form"
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تصویر</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" {...field}></Input>
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
                <Input type="number" className="text-left" {...field} />
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
                  {/* ~~~~~ direction setter ~~~~~ */}
                  <Select
                    dir="rtl"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="گروه مورد نظر را انتخاب کنید"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="burger">burger</SelectItem>
                      <SelectItem value="pizza">pizza</SelectItem>
                      <SelectItem value="pasta">pasta</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
      </form>
    </Form>
  );
}
