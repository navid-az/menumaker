import Image from "next/image";
import GoBackBtn from "@/app/components/GoBackBtn";

export default function MenuBuilderLayout({ children }) {
  return (
    <section className="overflow-hidden bg-white">
      {/* form and prototype  */}
      {/* px-40 container mx-auto */}
      <div className=" flex h-screen justify-between ">{children}</div>
    </section>
  );
}
