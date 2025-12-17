import React from "react";

//components
import { cookies } from "next/headers";
import PersonnelClientWrapper from "./components/PersonnelClientWrapper";

//types
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

// Fetch personnel data of the business/branch
// If branch_slug is provided, fetch personnel for that branch
async function getPersonnel(
  business_slug: string,
  branch_slug: string,
  cookieStore: ReadonlyRequestCookies
) {
  try {
    const data = await fetch(
      `http://127.0.0.1:8000/businesses/${business_slug}/personnel/?branch_slug=${branch_slug}`,

      {
        headers: {
          authorization: `Bearer ${cookieStore.get("access")?.value}`,
        },
        next: { tags: ["personnel"] },
      }
    );
    if (!data.ok) {
      // const errorData = await data.json();
      throw new Error("Failed to fetch personnel data");
    }
    return await data.json();
  } catch (error) {
    console.log("Error fetching personnel data:", error);
    throw error;
  }
}

export default async function Page(props: {
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const cookieStore = await cookies();
  const params = await props.params;

  const personnelData = await getPersonnel(
    params.business_slug,
    params.branch_slug,
    cookieStore
  );

  return (
    <PersonnelClientWrapper
      businessSlug={params.business_slug}
      personnel={personnelData}
    ></PersonnelClientWrapper>
  );
}
