import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="container mx-auto flex w-full items-center justify-between space-x-4 px-20 pt-7 text-xl text-royal-green">
      <Link
        className="rounded-md bg-royal-green px-8 py-2 text-sky-blue"
        href="/register"
      >
        ثبت نام
      </Link>
      <Link href="/">درباره ما</Link>
      <Link href="/pricing">تعرفه ها</Link>
      <Link href="/builder">مشاهده دمو</Link>
      <Link href="/1/menu">صفحه منو</Link>
      <Link href="/">
        <Image
          src="/images/menumaker-logo.svg"
          width={166}
          height={50}
          alt="menumaker logo"
        />
      </Link>
    </nav>
  );
}

export default function LandingPageLayout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
}
