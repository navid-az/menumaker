//components
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

//functions
import { createCookie } from "../actions/auth/register";
import { createDemoUser } from "../actions/auth/register";

export default function DemoModeBtn() {
  async function startDemo() {
    const result = await createDemoUser();
    if (result.success) {
      const { access, refresh } = result.tokens;
      createCookie("access", access);
      createCookie("refresh", refresh);
      toast.success("(Demo Mode)ورود با موفقیت انجام شد");
    } else {
      toast.error("خطایی رخ داد!");
    }
  }
  return (
    <div className="group flex flex-col gap-4 w-full p-4 rounded-md bg-white border-2 border-sad-blue transition-all duration-300 has-[button:hover]:border-royal-green">
      <div className="flex gap-1 flex-col">
        <div className="flex justify-between">
          <p className="font-medium">برای ورود به حالت دمو اینجا کلیک کنید</p>
          <span className="px-4 py-1.5 rounded-full bg-yellow-200 text-yellow-950 w-max text-sm font-normal">
            <p>حالت دمو</p>
          </span>
        </div>
        <p className=" font-normal text-sm text-royal-green/90 w-5/6">
          در صورت عدم تمایل به وارد کردن شماره موبایل خود میتوانید از حالت دمو
          استفاده کنید.
        </p>
      </div>
      <Button
        className="bg-gray-100 h-14 text-base text-gray-700 border border-gray-300 font-normal hover:bg-royal-green hover:text-soft-blue hover:border-royal-green transition-all duration-300"
        size="lg"
        type="button"
        onClick={startDemo}
      >
        فعالسازی حالت دمو
      </Button>
    </div>
  );
}
