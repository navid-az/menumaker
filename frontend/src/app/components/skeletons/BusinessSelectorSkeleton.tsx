import React from 'react'

//components
import { Skeleton } from '@/components/ui/skeleton'
import { Building } from '@/app/dashboard/components/svg'
import { ArrowLeft } from 'lucide-react'

export default function BusinessSelectorSkeleton({ isCollapsed }: { isCollapsed: boolean }) {
    return (
        <div
            className={`transition-height flex ${isCollapsed
                ? "h-auto rounded-xl"
                : "min-h-[84px] rounded-xl rounded-tl-[36px]"
                } w-full select-none flex-col overflow-hidden border-4 border-sad-blue bg-soft-blue text-primary duration-300 ease-in-out`}
        >
            <div
                className="flex h-full flex-col justify-between gap-2 bg-inherit p-2 text-primary"
            >
                <section
                    className={`flex w-full items-center gap-2 ${isCollapsed ? "justify-center py-2" : "justify-between"
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Building className="h-6 w-6"></Building>
                        <div className={`flex gap-2 ${isCollapsed ? "hidden" : "flex"}`}>
                            <Skeleton className='w-12 h-4 bg-sad-blue'></Skeleton>
                            <Skeleton className='w-32 h-4 bg-sad-blue'></Skeleton>
                        </div>
                    </div>
                    <ArrowLeft
                        className={` transition-all ${isCollapsed ? "hidden" : "flex"} `}
                    ></ArrowLeft>
                </section>
                <span
                    className={`${isCollapsed ? "hidden" : "flex"
                        } flex w-full items-center gap-2 text-sm font-medium`}
                >
                    <p>سمت شما</p>
                    <Skeleton className="w-max rounded-full bg-sad-blue h-6 w-24 text-xs" />
                </span>

            </div>
        </div>
    )
}
