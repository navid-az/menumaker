import React from "react";

//functions
import { cookies } from "next/headers";
import { checkFeatureAccess } from "@/lib/guards/checkFeatureAccess";

//components
import UpgradePlanAlertDialog from "@/app/dashboard/components/UpgradePlanAlertDialog";
import PersonnelClientWrapper from "./components/PersonnelClientWrapper";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { CreateUpdatePersonnelForm } from "@/app/dashboard/components/CreateUpdatePersonnelForm";

//SVGs
import { CircleAlert } from "lucide-react";

//types
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// Fetch personnel data of the business/branch
// If branch_slug is provided, fetch personnel for that branch
async function getPersonnel(
  business_slug: string,
  branch_slug: string,
  cookieStore: ReadonlyRequestCookies
) {
  try {
    const data = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${business_slug}/personnel/?branch_slug=${branch_slug}`,

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

async function getBranches(business_slug: string) {
  const data = await fetch(
    `${SERVER_API_BASE_URL}/businesses/${business_slug}/branches/`,
    {
      next: { tags: ["branches"] },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  return data.json();
}

export default async function Page(props: {
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const cookieStore = await cookies();
  const params = await props.params;

  const { hasFeature } = await checkFeatureAccess(
    params.business_slug,
    "personnel_access"
  );
  const personnelData = await getPersonnel(
    params.business_slug,
    params.branch_slug,
    cookieStore
  );
  const branches = await getBranches(params.business_slug)

  return (
    <div className="flex-1 justify-start flex">
      {personnelData.length > 0 ?
        <PersonnelClientWrapper
          businessSlug={params.business_slug}
          branchSlug={params.branch_slug}
          personnel={personnelData}
          branches={branches}
        ></PersonnelClientWrapper> : <Empty className="w-full h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleAlert></CircleAlert>
            </EmptyMedia>
            <EmptyTitle>هیچ پرسنلی برای نمایش وجود ندارد</EmptyTitle>
            <EmptyDescription className="min-w-2xl">
              شما هیچ پرسنلی دعوت نکرده اید. با دعوت یک پرسنل جدید شروع کنید
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <CreateUpdatePersonnelForm
              businessSlug={params.business_slug}
              branches={branches}
              title="دعوت پرسنل"
              description="با انتخاب گزینه های مورد نظر دسته بندی جدید به منو اضافه کنید"
            >
            </CreateUpdatePersonnelForm>
          </EmptyContent>
        </Empty>
      }

      <UpgradePlanAlertDialog
        hasFeature={hasFeature}
        businessSlug={params.business_slug}
      ></UpgradePlanAlertDialog>
    </div>
  );
}
