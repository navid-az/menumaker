import React from "react";

type MyVenuesTabType = {
  name: string;
  position: string;
  //   venueType: "restaurant" | "cafe" | "buffet" | "food truck";
};

function MyVenuesTab({ name, position }: MyVenuesTabType) {
  return (
    <div className="flex h-auto w-full flex-col gap-2 rounded-xl rounded-tl-3xl border-4 border-sad-blue bg-soft-blue p-2 text-primary">
      <p className=" text-xl">مجموعه {name}</p>
      <div className="flex items-center gap-2">
        <p>سمت شما</p>
        <p className=" w-max rounded-full bg-sad-blue px-3 py-1 text-xs">
          {position}
        </p>
      </div>
    </div>
  );
}

export default MyVenuesTab;
