import Image from "next/image";

export default function LoginBanner() {
  return (
    <div className="hidden h-screen items-center justify-center bg-royal-green lg:flex lg:w-6/12 xl:w-7/12">
      <Image
        src="/images/key.svg"
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
        className="fixed -left-52 -rotate-12 md:-bottom-32 md:h-[350px] md:w-[350px] lg:-bottom-52 lg:-left-52 lg:h-[450px] lg:w-[450px] xl:-bottom-72 xl:-left-80 xl:h-[600px] xl:w-[600px]"
      ></Image>
    </div>
  );
}
