//components
import { Suspense } from "react";
import UpdateMenuBtn from "./components/UpdateMenuBtn";

export default async function page(props: {
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  return (
    <div className="flex -mt-4 justify-center flex-col items-center">
      <Suspense>
        <UpdateMenuSection paramsPromise={props.params}></UpdateMenuSection>
      </Suspense>
    </div>
  );
}

async function UpdateMenuSection({ paramsPromise }: { paramsPromise: Promise<{ business_slug: string; branch_slug: string }>; }) {
  const { business_slug, branch_slug } = await paramsPromise;

  return (
    <UpdateMenuBtn
      businessSlug={business_slug}
      branchSlug={branch_slug}
    ></UpdateMenuBtn>
  )
}