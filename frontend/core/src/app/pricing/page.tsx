"use client";

import FormTab, {
  FormTabTitle,
  FormTabBody,
} from "../(creator)/builder/components/FormTab";
// import FormTabBody from "../(creator)/builder/components/FormTabBody";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import ItemAdder from "../components/ItemAdder";

const formSchema = z.object({
  main_page_type: z.enum(["single", "multiple", "none"]),
  // menu_section_count: z.number().nonnegative().lt(4),
  menu_sections: z.array(
    z.object({
      id: z.string(),
      icon: z.string(),
      name: z.string(),
    })
  ),
  // link_is_active: z.boolean().default(false),
  // link: z.string().array(),
  phone_number_is_active: z.boolean().default(false),
  // phone_number: z.string().array(),
  location_is_active: z.boolean().default(false),
  // location: z.string().array(),
  // item_page_type: z.enum(["horizontal", "vertical"]),
});

type formSchemaType = z.infer<typeof formSchema>;

function BuilderForm() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number_is_active: false,
      location_is_active: false,
      menu_sections: [],
    },
  });
  function onSubmit(values: formSchemaType) {
    // form.setValue(
    //   "menu_sections",
    //   [{ id: "dd", name: "fiasdf", icon: "dfasdf" }],
    //   { shouldValidate: false }
    // );
    values["menu_sections"] = [{ id: "5", name: "sss", icon: "sss" }];
    console.log(values);
  }
  const formData = form.watch(); //invalidated
  useEffect(() => {
    formData["menu_sections"] = [{ id: "5", name: "sss", icon: "sss" }];
    console.log(formData);
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="phone_number_is_active"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormTab isActive={field.value}>
                  <FormTabTitle
                    title="salam"
                    description="salame bishtar"
                    icon="/images/form-icons/couple.svg"
                  >
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    ></Switch>
                  </FormTabTitle>
                  <FormTabBody isOpen={field.value}>
                    <ItemAdder name="niggass" placeholder="nigga"></ItemAdder>
                  </FormTabBody>
                </FormTab>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location_is_active"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormTab isActive={field.value}>
                  <FormTabTitle
                    title="salam"
                    description="salame bishtar"
                    icon="/images/form-icons/couple.svg"
                  >
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    ></Switch>
                  </FormTabTitle>
                  <FormTabBody isOpen={field.value}>
                    <ItemAdder name="niggass" placeholder="nigga"></ItemAdder>
                  </FormTabBody>
                </FormTab>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="main_page_type"
          render={({ field }) => (
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormItem>
                  <FormControl>
                    <FormTab isActive={field.value === "single"}>
                      <FormTabTitle
                        title="salam"
                        description="salame bishtar"
                        icon="/images/form-icons/couple.svg"
                      >
                        <RadioGroupItem value="single" />
                      </FormTabTitle>
                    </FormTab>
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormControl>
                    <FormTab isActive={field.value === "multiple"}>
                      <FormTabTitle
                        title="salam"
                        description="salame bishtar"
                        icon="/images/form-icons/couple.svg"
                      >
                        <RadioGroupItem value="multiple" />
                      </FormTabTitle>
                      <FormTabBody isOpen={field.value === "multiple"}>
                        <ItemAdder
                          name="niggass"
                          placeholder="nigga"
                        ></ItemAdder>
                      </FormTabBody>
                    </FormTab>
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormControl>
                    <FormTab isActive={field.value === "none"}>
                      <FormTabTitle
                        title="salam"
                        description="salame bishtar"
                        icon="/images/form-icons/couple.svg"
                      >
                        <RadioGroupItem value="none" />
                      </FormTabTitle>
                      <FormTabBody isOpen={field.value === "none"}>
                        <ItemAdder
                          name="niggass"
                          placeholder="nigga"
                        ></ItemAdder>
                      </FormTabBody>
                    </FormTab>
                  </FormControl>
                </FormItem>
                <FormMessage />
              </RadioGroup>
            </FormControl>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
{
}

export default function Pricing() {
  let type = "vertical";

  return (
    <div className={"flex h-max w-full flex-col gap-4 bg-lime-300  p-4"}>
      <BuilderForm></BuilderForm>
    </div>
  );
}

//   <main className="items-center">
//     <Image
//       src="/images/two-square.svg"
//       width={465}
//       height={390}
//       alt="two square"
//       className="absolute -right-72 top-32 rotate-[170deg]"
//     ></Image>
//     <Image
//       src="/images/two-square.svg"
//       width={726}
//       height={630}
//       alt="two square"
//       className=" absolute -left-28 top-48 -z-10 -rotate-[11.92deg]"
//     ></Image>
//     <div className="container m-auto px-14">
//       <div className=" mt-[15rem] flex flex-col items-end gap-2 py-20">
//         <h1 className="rtl h-auto text-right text-5xl font-bold leading-normal text-royal-green">
//           منو کسب و کار خود را تنها با <br />! چند کلیک ایجاد کنید
//         </h1>
//         <span className="h-2 w-48 rounded-md bg-sky-blue"></span>
//       </div>
//     </div>
//     {/* green section */}
//     <section className="flex w-full flex-col items-center justify-center bg-royal-green">
//       <div className="container -mt-80 flex items-end justify-between px-14">
//         <Image
//           src="/images/iphone-14-prototype.svg"
//           width={277}
//           height={570}
//           alt="menu prototype"
//         ></Image>
//         <div className="flex flex-col items-end gap-7">
//           <h2 className="text-right text-3xl font-medium leading-normal text-sky-blue">
//             بزرگ ترین سامانه ساخت منو هوشمند برای
//             <br />
//             رستوران و کافی شاپ ها
//           </h2>
//           <Link
//             className="flex gap-2 rounded-lg bg-sky-blue px-4 py-2 text-lg font-medium text-royal-green"
//             href="/"
//           >
//             <Image
//               src="/images/arrow-left.svg"
//               width={24}
//               height={24}
//               alt="arrow"
//             ></Image>
//             تست منو میکر
//           </Link>
//         </div>
//       </div>
//       {/* benefits description */}
//       <section className="container grid grid-cols-2 grid-rows-2 gap-7 px-14  py-24 ">
//         <Benefits
//           icon="/images/click.svg"
//           title="دسترسی آسان"
//           body="منو شما از هر کجا و در هر زمان فقط با اسکن QR کد ایجاد شده قابل مشاهده و دسترسی میباشد"
//         />
//         <Benefits
//           icon="/images/lightening.svg"
//           title="سرعت بالا"
//           body="منو میکر مجهز به بروزترین تکنولوژی ها بوده و این موجب سرعت فوق العاده منو شما میگردد.
// به طوری که مشتری متواند بدون لحظه ای تاخیر بین صفحات جابجا شود"
//         />
//         <Benefits
//           icon="/images/edit.svg"
//           title="ویرایش در هر لحظه"
//           body="اعمال تغییرات همچون قیمت ها، موجودی محصولات و شکل ظاهری منو به سادگی و تنها با چند کلیک قابل انجام میباشد"
//         />
//         <Benefits
//           icon="/images/color-ajust.svg"
//           title="تنوع باورنکردنی"
//           body="منو میکر طوری طراحی شده که شما میتوانید تمامی بخش های منو از نوع آن تا شکل و طرح و رنگ منو رو بسته به نیاز
//  و سلیقه خود تغییر دهید"
//         />
//       </section>
//     </section>
//     <div className="mt-20 flex w-full flex-col items-center gap-4 text-center text-royal-green">
//       <h2 className="text-5xl font-bold">!ساخت منو تنها در ۴ مرحله</h2>
//       <p className="text-lg font-normal">
//         برای راه اندازی و استفاده از منو هوشمند تنها کافیست ۴ مرحله ساده را طی
//         کنید
//         <br />و هرگاه نیاز به هرگونه تغییری بود به سادگی تغییرات را اعمال کنید
//       </p>
//     </div>
//     {/* <GetHomePages></GetHomePages> */}
//   </main>
