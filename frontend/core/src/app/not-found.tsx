import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-64 flex h-full w-full flex-col items-center text-primary">
      <h2 className="text-9xl font-bold">۴۰۴</h2>
      <div className="flex flex-col items-center gap-4">
        <p className="text-2xl">صفحه مورد نظر پیدا نشد</p>
        <Button asChild>
          <Link href="/">بازگشت به صفحه اصلی</Link>
        </Button>
      </div>
    </div>
  );
}
