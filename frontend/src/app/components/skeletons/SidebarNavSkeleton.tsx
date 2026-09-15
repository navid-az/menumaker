import React from 'react'

//components
import { Button } from '@/components/ui/button';
import { DashboardNavbarBtn } from '@/app/[locale]/dashboard/components/SidebarNav'

//SVGs
import { BarChart, Radar, ScrollText, Settings, Users } from '@/app/[locale]/dashboard/components/svg';

//functions
import { cn } from '@/lib/utils'

export default function SidebarNavSkeleton({
    isLoading,
    isCollapsed,
}: {
    isLoading: boolean;
    isCollapsed: boolean;
}) {
    return (
        <section className={cn("flex gap-4 flex-col w-full")}>
            <SidebarNavBtnSkeleton
                text="وضعیت مجموعه"
                isCollapsed={isCollapsed}
                disabled
            >
                <BarChart className={`${!isCollapsed && "ml-3"} h-6 w-6`} />
            </SidebarNavBtnSkeleton>
            <SidebarNavBtnSkeleton
                text="مدیریت زنده"
                isCollapsed={isCollapsed}
                disabled
            >
                <Radar className={`${!isCollapsed && "ml-3"} h-6 w-6`} />
            </SidebarNavBtnSkeleton>
            <SidebarNavBtnSkeleton
                text="آیتم و دسته بندی"
                isCollapsed={isCollapsed}
                disabled
            >
                <ScrollText className={`${!isCollapsed && "ml-3"} h-6 w-6`} />
            </SidebarNavBtnSkeleton>
            <SidebarNavBtnSkeleton
                text="پرسنل"
                isCollapsed={isCollapsed}
                disabled
            >
                <Users className={`${!isCollapsed && "ml-3"} h-6 w-6`} />
            </SidebarNavBtnSkeleton>
            <SidebarNavBtnSkeleton
                text="تنظیمات"
                isCollapsed={isCollapsed}
                disabled
            >
                <Settings className={`${!isCollapsed && "ml-3"} h-6 w-6`} />
            </SidebarNavBtnSkeleton>
        </section>
    )
}

type SideBarNavBtnSkeletonProps = {
    text: string;
    isCollapsed: boolean;
    disabled?: boolean
    children: React.ReactNode;
};

function SidebarNavBtnSkeleton({
    text,
    isCollapsed,
    disabled = false,
    children,
}: SideBarNavBtnSkeletonProps) {
    return (
        <Button
            disabled={disabled}
            className={cn(
                "scale-pro relative h-14 w-full py-3 text-lg opacity-60 transition-all duration-300 after:absolute after:right-0 after:h-4/6 after:w-1 after:rounded-full after:bg-sky-blue/50 after:opacity-0 after:transition-all after:duration-300 hover:opacity-90 hover:after:opacity-100 md:text-sm lg:text-lg",
                isCollapsed
                    ? "justify-center"
                    : "justify-start",
                disabled &&
                "cursor-not-allowed select-none opacity-30 after:hidden hover:opacity-30"
            )}
        >
            <div
                className={`flex ${isCollapsed ? "justify-center" : "justify-between"
                    } gap-4`}
            >
                <div className="flex items-center">
                    {children}
                    {!isCollapsed && <p>{text}</p>}
                </div>
            </div>
        </Button>
    );
}