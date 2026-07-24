//components
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Benefits from "../../components/global/benefits";
import FeatureNameList from "./components/FeatureNameList";
import LiveManagementSection from "./components/sections/LiveManagementSection";
import { GradientSpan } from "./components/GradientSpan";
import StepsSection from "./components/sections/StepsSection";

export default function Home() {
  return (
    <main className="items-center flex-1">
      <Image
        src="/images/two-square.svg"
        width={465}
        height={390}
        alt="two square"
        className="absolute -right-72 top-32 rotate-170"
      ></Image>
      <Image
        src="/images/two-square.svg"
        width={726}
        height={630}
        alt="two square"
        className=" absolute -left-28 top-48 -z-10 -rotate-[11.92deg]"
      ></Image>
      <div className="container px-16 mx-auto">
        <div className=" mt-60 flex flex-col gap-2 py-20">
          <h1 className="h-auto text-right text-5xl font-bold leading-normal text-royal-green">
            منو کسب و کار خود را تنها با <br /> چند کلیک ایجاد کنید
          </h1>
          <span className="h-2 w-48 rounded-md bg-sky-blue"></span>
        </div>
      </div>
      {/* green section */}
      <section className="flex px-16 w-full flex-col items-center justify-center bg-royal-green">
        <div className="container -mt-80 flex items-end justify-between">
          <div className="flex flex-col gap-7">
            <h2 className="text-right text-3xl font-medium leading-normal text-soft-blue">
              بزرگ ترین سامانه ساخت منو هوشمند برای
              <br />
              رستوران و کافی شاپ ها
            </h2>
            <Button
              className=" scale-pro w-max bg-primary-foreground text-primary transition duration-500 hover:scale-105"
              asChild
            >
              <Link href="/builder">
                تست منو میکر
                <Image
                  src="/svgs/arrow-left.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                  className="mr-2"
                ></Image>
              </Link>
            </Button>
          </div>
          <Image
            src="/svgs/iphone.svg"
            width={277}
            height={570}
            alt="menu prototype"
          ></Image>
        </div>
        {/* benefits description */}
        <section className="container grid gap-7 py-24 lg:grid-cols-2">
          <Benefits
            iconSrc="/svgs/click.svg"
            title="دسترسی آسان"
            body="منو شما از هر کجا و در هر زمان فقط با اسکن QR کد ایجاد شده قابل مشاهده و دسترسی میباشد"
          />
          <Benefits
            iconSrc="/svgs/lightening.svg"
            title="سرعت بالا"
            body="منو میکر مجهز به بروزترین تکنولوژی ها بوده و این موجب سرعت فوق العاده منو شما میگردد.
به طوری که مشتری متواند بدون لحظه ای تاخیر بین صفحات جابجا شود"
          />
          <Benefits
            iconSrc="/svgs/edit.svg"
            title="ویرایش در هر لحظه"
            body="اعمال تغییرات همچون قیمت ها، موجودی محصولات و شکل ظاهری منو به سادگی و تنها با چند کلیک قابل انجام میباشد"
          />
          <Benefits
            iconSrc="/svgs/color-ajust.svg"
            title="تنوع باورنکردنی"
            body="منو میکر طوری طراحی شده که شما میتوانید تمامی بخش های منو از نوع آن تا شکل و طرح و رنگ منو رو بسته به نیاز
 و سلیقه خود تغییر دهید"
          />
        </section>
      </section>
      <div className="my-20 flex w-full flex-col items-center gap-8 text-center text-royal-green">
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-12 md:leading-19 color-royal-green">
            فراتر از یک
            <br className="hidden lg:block" />
            <GradientSpan variant="dark"> منوی دیجیتال</GradientSpan>
          </h2>
          <h3 className="text-teal-950/60 font-normal max-w-5/6 md:max-w-xl text-sm md:text-xl ">
            منومیکر یک سیستم عملیاتی کامل برای رستوران‌های مدرن است — از منوی زیبا
            تا مدیریت سفارش، رزرو، و آنالیتیکس لحظه‌ای.
          </h3>
        </div>
        <FeatureNameList></FeatureNameList>
      </div>
      <LiveManagementSection></LiveManagementSection>
      <StepsSection></StepsSection>
    </main>
  );
}
