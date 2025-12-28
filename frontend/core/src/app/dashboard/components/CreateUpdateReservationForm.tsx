"use client";

import { useEffect, useState } from "react";

// zod validator
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldErrors } from "react-hook-form";

// components
import { Input } from "@/components/ui/input";
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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// SVGs
import {
  Edit2,
  Loader2,
  CalendarClock,
  ChevronDownIcon,
  Search,
  CheckCircle2,
} from "lucide-react";

// hooks
import { useForm } from "react-hook-form";

// types
type CreateUpdateReservationFormType = {
  branchSlug: string;
  title: string;
  description: string;
  defaultValues?: z.infer<typeof FormSchema>;
  // tableId?: number;
};

//actions
import { createReservation } from "@/app/actions/dashboard/liveManagement";

// functions
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  reservation_date: z.date(),
  reservation_time: z.string().min(1, "زمان رزرو الزامی است"),
  party_size: z.coerce.number().min(1, "تعداد مهمان ها باید حداقل 1 باشد"),
  table_id: z.number({ message: "انتخاب میز الزامی است" }),
  name: z.string().min(1, "نام مشتری الزامی است"),
  email: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().email().optional()
  ),
  phone_number: z.string().min(1, "شماره تماس الزامی است"),
  duration_minutes: z.number().optional(),
});

// Safely combine Date object + time string → ISO datetime
const getReservationStart = (date: Date, time: string): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const fullTime = time.length === 5 ? `${time}:00` : time;

  const localDateTime = new Date(`${formattedDate}T${fullTime}`);
  const reservationStart = localDateTime.toISOString();
  return reservationStart;
};

export function CreateUpdateReservationForm({
  branchSlug,
  title,
  description,
  defaultValues,
}: CreateUpdateReservationFormType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? {
          reservation_date: defaultValues.reservation_date,
          reservation_time: defaultValues.reservation_time,
          party_size: defaultValues.party_size,
          table_id: defaultValues.table_id,
          duration_minutes: defaultValues.duration_minutes,
          name: defaultValues.name || "",
          email: defaultValues.email || "",
          phone_number: defaultValues.phone_number || "",
        }
      : {
          reservation_date: new Date(),
          reservation_time: "",
          party_size: 2,
          table_id: undefined,
          duration_minutes: 60,
          name: "",
          email: "",
          phone_number: "",
        },
  });

  // required to fetch available tables on demand
  const date = form.watch("reservation_date");
  const time = form.watch("reservation_time");
  const partySize = form.watch("party_size");

  // control dialog component
  const [open, setOpen] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const tableId = form.watch("table_id");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { reservation_date, reservation_time, ...rest } = data;
    const reservationStart = getReservationStart(
      reservation_date,
      reservation_time
    );
    const normalizedData = {
      number_of_guests: data.party_size,
      reservation_start: reservationStart,
      ...rest,
    };
    try {
      if (!defaultValues) {
        // Create new reservation
        const res = await createReservation(tableId, normalizedData);
        if (res?.success) {
          setTimeout(() => {
            setOpen(false);
          }, 300);
          toast.success("رزرو با موفقیت ایجاد شد");
          form.reset();
        } else {
          // table conflict on submit
          if (res.status === 409) {
            toast.error(
              "میز انتخاب شده دیگر در دسترس نمیباشد. لطفا میز دیگری را انتخاب کنید."
            );
            return;
          }
          toast.error(res?.error || "خطایی در ایجاد رزرو رخ داد");
        }
      } else if (defaultValues && tableId) {
        // Update existing reservation - to be implemented
      }
    } catch (error) {
      toast.error("خطایی در پردازش درخواست رخ داد. لطفاً دوباره تلاش کنید.");
    }
  }

  const onError = (errors: FieldErrors<any>) => {
    console.log("Form errors:", errors);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!defaultValues ? (
          <Button
            size="lg"
            className="scale-pro rounded-full border-2 border-primary bg-soft-blue px-4 font-semibold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
          >
            <CalendarClock className="ml-2 h-5 w-5"></CalendarClock>
            <p>{title}</p>
          </Button>
        ) : (
          <Button size="icon" variant="ghost" className="rounded-full">
            <Edit2 className="h-5 w-5"></Edit2>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="gap-8 sm:max-w-4/6">
        <DialogHeader className="items-start">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="font-normal">
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit, onError)}
            id="category-form"
            className="grid gap-8 md:grid-cols-2"
          >
            <section className="flex-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>نام مشتری</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="نام مشتری"
                        type="text"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <section className="flex gap-2 items-start">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="w-full pt-6">
                      <FormLabel>شماره تماس</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="شماره تماس"
                          type="text"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full pt-6">
                      <FormLabel>ایمیل مشتری</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ایمیل مشتری"
                          type="email"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
              <section className="flex gap-2 w-full pt-6 items-start">
                <FormField
                  control={form.control}
                  name="reservation_date"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>تاریخ</FormLabel>
                      <FormControl>
                        <Popover
                          open={openDatePicker}
                          onOpenChange={setOpenDatePicker}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date-picker"
                              className="w-full justify-between font-normal"
                            >
                              {field.value
                                ? new Intl.DateTimeFormat("fa-IR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }).format(field.value)
                                : "تاریخ را انتخاب کنید"}
                              <ChevronDownIcon className="w-5 h-5 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setOpenDatePicker(false);
                              }}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reservation_time"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>ساعت</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          id="time-picker"
                          step="1"
                          value={field.value}
                          onChange={field.onChange}
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
              <section className="flex gap-2 w-full items-start">
                <FormField
                  control={form.control}
                  name="party_size"
                  render={({ field }) => (
                    <FormItem className="pt-6 flex-1">
                      <FormLabel>تعداد مهمان ها</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step={1}
                          value={field.value}
                          onChange={field.onChange}
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration_minutes"
                  render={({ field }) => (
                    <FormItem className="pt-6 flex-1">
                      <FormLabel>مدت زمان استفاده</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={30}
                          max={480}
                          step={30}
                          value={field.value}
                          onChange={field.onChange}
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
            </section>
            <FormField
              control={form.control}
              name="table_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>میز های قابل رزرو</FormLabel>
                  <FormControl>
                    <AvailableTableList
                      date={date}
                      time={time}
                      partySize={partySize}
                      value={field.value}
                      onChange={field.onChange}
                      branchSlug={branchSlug}
                    ></AvailableTableList>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* global error */}
            {form.formState.errors.root && (
              <p className="mt-3 text-sm text-red-600">
                {form.formState.errors.root?.message}
              </p>
            )}
          </form>
        </Form>
        <DialogFooter className="flex w-full flex-col justify-between gap-2">
          <Button
            disabled={form.formState.isSubmitting}
            form="category-form"
            type="submit"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin"></Loader2>
            )}
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AvailableTableList({
  date,
  time,
  partySize,
  duration = 60,
  value,
  onChange,
  defaultValue,
  branchSlug,
}: {
  date?: Date;
  time?: string;
  partySize?: number;
  duration?: number;
  value?: number;
  onChange?: (value: number) => void;
  defaultValue?: number;
  branchSlug: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [availableTables, setAvailableTables] = useState([]);
  const [internalState, setInternalState] = useState<number | null>(
    defaultValue || null
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalState;

  useEffect(() => {
    // all three should be provided before fetching available tables
    if (!date || !time || !partySize) return;

    const handler = setTimeout(() => {
      fetchAvailableTables(date, time, partySize);
    }, 400);
    return () => clearTimeout(handler);
  }, [date, time, partySize]);

  const fetchAvailableTables = async (
    date: Date,
    time: string,
    partySize: number
  ) => {
    if (!date || !time || !partySize) {
      setAvailableTables([]);
      return;
    }
    try {
      const reservationStart = getReservationStart(date, time);

      const res = await fetch(
        `http://localhost:8000/tables/check-availability/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            branch_slug: branchSlug,
            start_dt: reservationStart,
            party_size: partySize,
            duration_minutes: duration || 60,
          }),
        }
      );
      if (!res.ok) {
        // throw new Error("خطا در دریافت میزهای موجود");
        const errorData = await res.json();
        console.log(errorData);
      }
      const data = await res.json();
      setAvailableTables(data || []);
    } catch (err: any) {
      setError("Could not load available tables");
      setAvailableTables([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    table_id: number
  ) => {
    e.preventDefault();
    if (isControlled) {
      onChange?.(table_id);
    } else {
      setInternalState(table_id);
      onChange?.(table_id);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 flex-col flex-1">
      {availableTables.length === 0 && !loading ? (
        <div className=" flex flex-col items-center gap-4">
          <Search className="w-10 h-10 stroke-1 text-primary opacity-70 animate-bounce"></Search>
          <p className="text-center font-light text-primary opacity-70">
            برای مشاهده میز های موجود تاریخ و<br /> ساعت و تعداد مهمان را وارد
            کنید
          </p>
        </div>
      ) : (
        <div className="flex pl-2 w-full h-[310px] flex-col gap-2 max-h-[310px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent">
          {availableTables.map((table: any, index) => (
            <Button
              type="button"
              onClick={(e) => handleClick(e, table.id)}
              key={index}
              className={cn(
                "w-full px-2 py-3 min-h-14 overflow-hidden bg-soft-blue border-2 hover:border-primary/50 cursor-pointer transition-all duration-300 border-primary/10 flex items-center justify-between rounded-md",
                currentValue === table.id &&
                  "border-primary hover:border-primary"
              )}
            >
              <div className="flex gap-2">
                <CheckCircle2
                  className={cn(
                    "text-primary transition-all w-5 h-5 duration-300",
                    currentValue === table.id
                      ? "mr-0 opacity-100"
                      : "-mr-5 opacity-0"
                  )}
                ></CheckCircle2>
                <p className="text-primary">{table.name}</p>
              </div>
              <div className="bg-primary text-secondary rounded-full px-3 py-1">
                <p className="text-xs font-medium">{table.seats} صندلی</p>
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
