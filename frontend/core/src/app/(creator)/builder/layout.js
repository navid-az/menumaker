import Image from "next/image";
import GoBackBtn from "@/app/components/goBackBtn";

export default function MenuBuilderLayout({ children }) {
  return (
    <section className="h-screen bg-white">
      <GoBackBtn></GoBackBtn>

      {/* form and prototype  */}
      <div className="container mx-auto flex h-screen w-full items-center justify-between overflow-hidden px-40">
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
