import Image from "next/image";
import GoBackBtn from "@/app/components/goBackBtn";
import IconSelectorList from "@/app/components/iconSelectorLIst";

export default function MenuBuilderLayout({ children }) {
  return (
    <section className="overflow-hidden bg-white">
      {/* form and prototype  */}
      <div className="container mx-auto flex h-screen justify-between px-40 ">
        <GoBackBtn></GoBackBtn>
        <Image
          src="/images/iphone-14-prototype.svg"
          width={260}
          height={450}
          alt="menu prototype"
        ></Image>
        {/* <section className="flex w-96 flex-col gap-4 bg-green-600 p-2">
          <div className="col-span-1 row-span-1 flex w-full flex-col gap-2 bg-red-900 p-4 text-green-200">
            <div className="bg-yellow-500">salam</div>
            <div className="bg-yellow-500">salam</div>
            <div className="bg-yellow-500">salam</div>
          </div>
          <div className="col-span-1 row-span-1 flex w-full flex-col gap-2 bg-red-900 p-4 text-green-200">
            <div className="bg-yellow-500">salam</div>
            <div className="bg-yellow-500">salam</div>
            <div className="bg-yellow-500">salam</div>
          </div>
        </section> */}
        {children}
      </div>
    </section>
  );
}
