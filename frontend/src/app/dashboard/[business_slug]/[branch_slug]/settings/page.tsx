import React from "react";
import UpdateMenuBtn from "./components/UpdateMenuBtn";

export default async function page(props: {
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const params = await props.params;
  return (
    <div className="flex justify-center flex-col items-center">
      <UpdateMenuBtn
        businessSlug={params.business_slug}
        branchSlug={params.branch_slug}
      ></UpdateMenuBtn>
    </div>
  );
}
