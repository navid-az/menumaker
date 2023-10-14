import Link from "next/link";
import Image from "next/image";

export default function GoBackBtn({
  color = "text-sky-blue",
  bgc = "bg-royale-green",
  link = "/",
  absolute = true,
}) {
  return (
    <Link
      className={`${
        absolute ? "absolute" : ""
      } left-4 top-4 flex w-max select-none items-center justify-between gap-1 rounded-full active:scale-90 ${bgc} ${color} px-3 py-2 text-sm font-normal transition-all duration-200 ease-in-out hover:gap-4`}
      href={link}
    >
      <Image
        src="/images/arrow-left.svg"
        width={20}
        height={20}
        alt="go back"
      ></Image>
      <p>بازگشت</p>
    </Link>
  );
}
