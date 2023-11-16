import Link from "next/link";
import { ArrowLeft } from "./svgs";

export default function GoBackBtn({
  primary_color = "royal-green",
  secondary_color = "sky-blue",
  link = "/",
  absolute = true,
  text = "",
}) {
  return (
    <Link
      className={`${
        absolute ? "absolute" : ""
      } m-2 flex h-8 w-max select-none items-center justify-between gap-1 rounded-full active:scale-90 sm:left-4 sm:top-4 sm:m-4 bg-${primary_color} text-${secondary_color} ${
        text ? "px-3 py-1" : "p-3"
      } text-sm font-normal transition-all duration-200 ease-in-out hover:gap-4`}
      href={link}
    >
      <ArrowLeft className={`stroke-[${secondary_color}] text-xl`} />
      {text && <p className=" font-semibold">{text}</p>}
    </Link>
  );
}
