import Image from "next/image";

export default function LoginBanner() {
  return (
    <div className="hidden relative h-screen items-center justify-center bg-royal-green lg:flex flex-6/12 xl:flex-9/12 2xl:10/12 overflow-hidden">
      <Image
        src="/svgs/key.svg"
        width={100}
        height={100}
        alt="key image"
        className="md:h-[350px] md:w-[350px] lg:h-[450px] lg:w-[450px] xl:h-[550px] xl:w-[550px]"
      ></Image>
      <Image
        src="/images/two-square.svg"
        width={600}
        height={600}
        alt="two squares"
        className="absolute -left-52 -rotate-12 md:-bottom-32 md:h-[350px] md:w-[350px] lg:-bottom-52 lg:-left-52 lg:h-[450px] lg:w-[450px] xl:-bottom-72 xl:-left-80 xl:h-[600px] xl:w-[600px]"
      ></Image>
      <Image
        src="/images/two-square.svg"
        width={600}
        height={600}
        alt="two squares"
        className="absolute -right-72 z-40 rotate-[160deg] md:-top-32 md:h-[350px] md:w-[350px] lg:-top-52 xl:-right-80 lg:h-[450px] lg:w-[450px] xl:-top-72 xl:-left-80 xl:h-[600px] xl:w-[600px]"
      ></Image>
    </div>
  );
}
