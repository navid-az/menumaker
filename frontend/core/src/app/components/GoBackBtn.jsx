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
      } flex w-max select-none items-center justify-between gap-1 rounded-full active:scale-90  bg-${primary_color} text-${secondary_color} ${
        text ? "h-8 px-3 py-1" : "aspect-square p-3"
      } text-sm font-normal transition-all duration-200 ease-in-out hover:gap-4`}
      href={link}
    >
      <ArrowLeft className={`stroke-[${secondary_color}] text-xl`} />
      {text && <p className=" font-semibold">{text}</p>}
    </Link>
  );
}
