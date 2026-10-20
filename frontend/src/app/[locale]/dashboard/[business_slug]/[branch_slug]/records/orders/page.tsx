import React, { Suspense } from "react";

//components
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { RecordsView } from "../components/RecordsView";
import { DataTableSkeleton } from "@/app/components/skeletons/DataTableSkeleton";

//SVGs
import { CircleAlert } from "lucide-react";

type ParamsPromise = Promise<{ business_slug: string }>;


export default function OrdersPage(props: { params: ParamsPromise }) {
    return (
        <div className="flex flex-col gap-4 flex-1 justify-start">
            <Suspense fallback={<DataTableSkeleton />}>
                <OrdersContent paramsPromise={props.params} />
            </Suspense>
        </div>
    );
}

async function OrdersContent({ paramsPromise }: { paramsPromise: ParamsPromise }) {

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
        <RecordsView view="orders" />
    );
}