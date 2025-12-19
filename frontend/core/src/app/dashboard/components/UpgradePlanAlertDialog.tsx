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
import React from "react";

export default function UpgradePlanAlertDialog({
  businessSlug,
  hasFeature = false,
}: {
  businessSlug: string;
  hasFeature?: boolean;
}) {
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
