import Image from "next/image";
import Link from "next/link";

export default function MenuBuilderLayout({ children }) {
  return (
    <section className="bg-white">
      {/* go back home btn  */}
      <Link
        className="absolute left-4 top-4 flex items-center justify-between gap-1 rounded-full bg-royale-green px-3 py-2 text-sm font-normal text-sky-blue transition-all duration-200 ease-in-out hover:gap-4"
        href="/"
      >
        <Image
          src="/images/arrow-left.svg"
          width={20}
          height={20}
          alt="go back"
        ></Image>
        <p>بازگشت</p>
      </Link>

      {/* form and prototype  */}
      <div className="container mx-auto flex h-screen w-full items-center justify-between px-40">
        <Image
          src="/images/iphone-14-prototype.svg"
          width={260}
          height={450}
          alt="menu prototype"
        ></Image>
        {children}
      </div>
    </section>
  );
}
