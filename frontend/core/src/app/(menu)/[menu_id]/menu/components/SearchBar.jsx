//components
import { Button } from "@/components/ui/button";

//SVGs
import { Search, Cross } from "@/app/components/svgs";

export default function SearchBar({ value, setValue }) {
  return (
    <div className="flex flex-1 items-center justify-between rounded-full bg-red-300 p-1">
      <Button
        size="icon"
        className="h-7 w-7 rounded-full bg-red-950 text-red-300"
      >
        <Search className="mb-[1px] mr-[1px] h-4 w-4" />
      </Button>
      <section className="flex h-full flex-1 items-center justify-between px-2 text-red-800">
        <input
          className="h-full flex-1 rounded-full bg-inherit text-right text-sm font-normal outline-none placeholder:text-red-800/80 "
          placeholder="جستجو"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={(e) => e.target.select()}
        />
        {value && (
          <Button
            onClick={() => {
              setValue("");
            }}
            size="icon"
            className="-mr-2 h-full w-7 bg-inherit text-inherit"
          >
            <Cross />
          </Button>
        )}
      </section>
    </div>
  );
}
