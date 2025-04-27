"use client";

//zod validator
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//components
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AssetPickerPopOver } from "@/components/global/itemAdderButtons/AssetPickerPopOver";

//hooks
import { useForm } from "react-hook-form";

import { AssetGroupType } from "@/components/global/AssetPicker";
import { createCategory } from "@/app/actions";

const FormSchema = z.object({
  name: z.string(),
  icon: z.object({ name: z.string(), image: z.string(), id: z.number() }),
});

export function CreateCategoryForm({
  assetGroups,
}: {
  assetGroups: AssetGroupType[];
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      icon: {
        id: 0,
        name: "",
        image: "",
      },
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await createCategory("venhan", { name: data.name, icon: data.icon.id });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="item-form"
        className="flex w-full items-end gap-2 space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>نام دسته</FormLabel>
              <FormControl>
                <Input type="text" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AssetPickerPopOver
                  value={field.value}
                  onChange={field.onChange}
                  assetGroups={assetGroups}
                ></AssetPickerPopOver>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
