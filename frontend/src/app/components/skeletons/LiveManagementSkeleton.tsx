import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function LiveCardSkeleton() {
    return (
        <div className="relative justify-end h-max w-60 p-2 rounded-4xl flex flex-col gap-2 border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>

            {/* Ring Container */}
            <div className="relative mx-auto flex flex-col h-full gap-6 mb-10 w-[178px] items-center justify-center">
                <Skeleton className="h-[178px] w-[178px] rounded-full" />
                <div className="flex items-center gap-2 w-full">
                    <Skeleton className="h-2 w-8/12" />
                    <Skeleton className="h-2 w-4/12" />
                </div>
            </div>


            {/* Bottom Content */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-7 w-20 rounded-full" />
            </div>
        </div>
    );
}

export function LiveManagementSkeleton() {
    return (
        <div className="flex-1 rtl:justify-end flex gap-4 flex-wrap">
            <LiveCardSkeleton />
            <LiveCardSkeleton />
            <LiveCardSkeleton />
            <LiveCardSkeleton />
            <LiveCardSkeleton />
            <LiveCardSkeleton />
            <LiveCardSkeleton />
            <LiveCardSkeleton />
            <LiveCardSkeleton />
            <LiveCardSkeleton />
        </div>
    );
}