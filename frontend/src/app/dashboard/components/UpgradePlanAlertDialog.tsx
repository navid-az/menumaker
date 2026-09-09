//components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

//functions
import { checkFeatureAccess } from "@/lib/guards/checkFeatureAccess";

export default async function UpgradePlanAlertDialog({
  businessSlug,
  featureCode
}: {
  businessSlug: string;
  featureCode: string;
}) {
  const { hasFeature } = await checkFeatureAccess(
    businessSlug,
    featureCode
  );

  return (
    <AlertDialog defaultOpen={!hasFeature}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>مدیریت زنده ویژگی پلن پرو</AlertDialogTitle>
          <AlertDialogDescription>
            برای دسترسی به این ویژگی، لطفاً پلن اشتراک خود را ارتقا دهید.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <Button asChild>
          <Link href={`/dashboard/${branch_slug}/`}>بازگشت</Link>
        </Button> */}
          <Button asChild>
            <Link href="/pricing">ارتقا پلن</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
