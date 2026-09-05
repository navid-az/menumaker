import React from "react";
import UpdateMenuBtn from "./components/UpdateMenuBtn";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function page(props: {
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const params = await props.params;
  return (
    <div className="flex -mt-4 justify-center flex-col items-center">
      <UpdateMenuBtn
        businessSlug={params.business_slug}
        branchSlug={params.branch_slug}
      ></UpdateMenuBtn>
    </div>
  );
}
