"use client";

//SVGs
import { BarChart, Radar, ScrollText, Settings, Users } from "./svg";

//hooks
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

//libraries
import { cn } from "@/lib/utils";

//components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function SidebarNav({
    isCollapsed,
}: {
    isCollapsed: boolean;
}) {
    const params = useParams<{ business_slug: string; branch_slug: string }>();
    const decodedBranchSlug = decodeURIComponent(params.branch_slug);

    const t = useTranslations('dashboard.sidebar.sidebarNav')

    return (
        <section className={cn("flex gap-4 flex-col w-full")}>
            <DashboardNavbarBtn
                disabled
                text={t('0')}
                isCollapsed={isCollapsed}
                basePath={`/dashboard/${params.business_slug}/${decodedBranchSlug}/insights`}
            >
                <BarChart className={`${!isCollapsed && "me-3"} h-6 w-6`} />
            </DashboardNavbarBtn>
            <DashboardNavbarBtn
                text={t('1')}
                isCollapsed={isCollapsed}
                basePath={`/dashboard/${params.business_slug}/${decodedBranchSlug}/liveManagement/all`}
            >
                <Radar className={`${!isCollapsed && "me-3"} h-6 w-6`} />
            </DashboardNavbarBtn>
            <DashboardNavbarBtn
                text={t('2')}
                isCollapsed={isCollapsed}
                basePath={`/dashboard/${params.business_slug}/${decodedBranchSlug}/data/items`}
                dynamicPaths={["items", "categories", "offers", "excessCosts"]}
            >
                <ScrollText className={`${!isCollapsed && "me-3"} h-6 w-6`} />
            </DashboardNavbarBtn>
            <DashboardNavbarBtn
                text={t('3')}
                isCollapsed={isCollapsed}
                basePath={`/dashboard/${params.business_slug}/${decodedBranchSlug}/personnel/all`}
            >
                <Users className={`${!isCollapsed && "me-3"} h-6 w-6`} />
            </DashboardNavbarBtn>
            <DashboardNavbarBtn
                text={t('4')}
                isCollapsed={isCollapsed}
                basePath={`/dashboard/${params.business_slug}/${decodedBranchSlug}/settings`}
            >
                <Settings className={`${!isCollapsed && "me-3"} h-6 w-6`} />
            </DashboardNavbarBtn>
        </section>
    );
}


type DashboardNavbarBtnType = {
    text: string;
    basePath?: string;
    dynamicPaths?: string[];
    isCollapsed: boolean;
    disabled?: boolean
    children: React.ReactNode;
};
export function DashboardNavbarBtn({
    text,
    basePath = "/",
    dynamicPaths = [],
    isCollapsed,
    disabled = false,
    children,
}: DashboardNavbarBtnType) {
    const pathName = usePathname();
    const parts = pathName.split("/");
    const lastPathNamePart = parts[parts.length - 1];
    const encodedBasePath = encodeURI(basePath);

    return (
        <Button
            asChild
            className={cn(
                "scale-pro relative h-14 bg-inherit w-full py-3 text-lg opacity-60 transition-all duration-300 after:absolute ltr:after:left-0 rtl:after:right-0 after:h-4/6 after:w-1 after:rounded-full after:bg-sky-blue/50 after:opacity-0 after:transition-all after:duration-300 hover:opacity-90 hover:after:opacity-100 md:text-sm lg:text-lg",

                (encodedBasePath == pathName ||
                    dynamicPaths.includes(lastPathNamePart)) &&
                "scale-105 text-sad-blue opacity-100! after:bg-sky-blue after:opacity-100",

                isCollapsed &&
                (encodedBasePath == pathName ||
                    dynamicPaths.includes(lastPathNamePart)) &&
                "scale-125 px-4",

                encodedBasePath == pathName && !isCollapsed && "ps-6",

                isCollapsed ? "justify-center" : "justify-start",

                disabled &&
                "opacity-30 after:hidden hover:opacity-30 select-none cursor-not-allowed"
            )}
        >
            {disabled ? (
                <span className={`flex ${isCollapsed ? "justify-center" : "justify-between"} gap-4`}>
                    <div className="flex items-center">
                        {children}
                        {!isCollapsed && <p>{text}</p>}
                    </div>
                </span>
            ) :
                <Link
                    href={encodedBasePath}
                    className={`flex ${isCollapsed ? "justify-center" : "justify-between"
                        } gap-4`}
                >
                    <div className="flex items-center">
                        {children}
                        {!isCollapsed && <p>{text}</p>}
                    </div>
                </Link>}
        </Button>
    );
}
