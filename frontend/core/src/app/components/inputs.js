import Image from "next/image";

export function TextInput({
  type = "text",
  name,
  id,
  value,
  setValue,
  placeholder = "",
}) {
  return (
    <div className="flex w-full rounded-lg border-2 border-sad-blue bg-white p-[12px] transition-colors duration-300 ease-in-out">
      {/* <Image src="/images/envelope.svg" width={20} height={20}></Image> */}
      <input
        className=" h-full w-full rounded-lg text-sm font-normal text-royale-green outline-none autofill:bg-inherit"
        type={type}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
      />
    </div>
  );
}
