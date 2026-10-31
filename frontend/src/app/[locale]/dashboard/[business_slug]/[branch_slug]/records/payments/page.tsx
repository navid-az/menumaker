import React, { Suspense } from "react";

//components
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { RecordsView } from "../components/RecordsView";
import { DataTableSkeleton } from "@/app/components/skeletons/DataTableSkeleton";

//functions
import getPayments from "@/lib/business/getPayments";

//types
type ParamsPromise = Promise<{ branch_slug: string }>;

export default function PaymentsPage(props: { params: ParamsPromise }) {
    return (
        <div className="flex flex-col gap-4 flex-1 justify-start">
            <Suspense fallback={<DataTableSkeleton />}>
                <PaymentsContent paramsPromise={props.params} />
            </Suspense>
        </div>
    );
}

async function PaymentsContent({ paramsPromise }: { paramsPromise: ParamsPromise }) {

    const { branch_slug } = await paramsPromise;

    const payments = await getPayments(branch_slug)

    // return (
    //     <Empty className="w-full h-full">
    //         <EmptyHeader>
    //             <EmptyMedia variant="icon">
    //                 <CircleAlert />
    //             </EmptyMedia>
    //             <EmptyTitle>{t('categories.empty.title')}</EmptyTitle>
    //             <EmptyDescription className="min-w-2xl">
    //                 {t('categories.empty.description')}
    //             </EmptyDescription>
    //         </EmptyHeader>
    //     </Empty>
    // );

    return (
        <RecordsView data={payments} view="payments" />
    );
}