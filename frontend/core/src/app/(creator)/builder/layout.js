import Image from "next/image";

export default function MenuBuilderLayout({ children }) {
  return (
    <div className="container mx-auto flex h-screen w-full items-center bg-white px-20">
      <Image
        src="/images/iphone-14-prototype.svg"
        width={277}
        height={570}
        alt="menu prototype"
      ></Image>
      {children}
    </div>
  );
}
