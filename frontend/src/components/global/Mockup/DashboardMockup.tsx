'use client'

import React from "react";

//components
import { Button } from "@/components/ui/button";
import LiveCard from "@/app/[locale]/dashboard/components/LiveCard";
import Logo from "../Logo";

//functions
import { cn } from "@/lib/utils";

//SVGs
import { Building2, ChevronLeft, MapPin, Star, User2 } from "lucide-react";
import { BarChart, Radar, ScrollText, Users, Settings } from "@/app/[locale]/dashboard/components/svg";

//libraries
import { useTranslations } from "next-intl";

//types
import { type Table } from "@/app/types/api/business";
import { type TableUI } from "@/app/types/ui/business";

export function DashboardMockup({ isCompact = false, children }: { isCompact?: boolean, className?: string, children: React.ReactNode }) {
    const t = useTranslations("dashboardMockup");

    const dashboardData = {
        branch: t("header.branch"),
        businessName: t("business.name"),
        roleLabel: t("business.roleLabel"),
        role: t("business.role")
    };

    return (
        <div className={cn("flex h-max w-max flex-col items-center select-none justify-center gap-4 rounded-[40px] border-4  border-[#c5e5e929] bg-[#243B3E] p-4", isCompact && 'border-2 border-[#C5E5E9]/20 bg-[#243B3E] p-0')}>
            {!isCompact && <DashboardHeaderMockup branch={dashboardData.branch}></DashboardHeaderMockup>}
            {children}
        </div>
    );
};

function DashboardHeaderMockup({ branch }: { branch: string }) {
    return <div className="flex items-center w-full gap-4">
        <div className="w-65 flex justify-start px-4">
            <Logo primary="white"></Logo>
        </div>
        <div className="flex justify-between items-center flex-1">
            <div className="border transition-all duration-300 border-[#ffffff1d] hover:border-[#C5E5E9]/40 bg-[#ffffff1d] text-white p-2 rounded-full flex justify-between items-center min-w-3/12">
                <div className="flex gap-2 items-center">
                    <MapPin className="size-5"></MapPin>
                    <p className="text-sm font-normal">{branch}</p>
                </div>
                <ChevronLeft className="rotate-180 rtl:rotate-0"></ChevronLeft>
            </div>
            <div className="flex gap-2">
                <Button className="rounded-full border transition-all duration-300 border-[#ffffff1d] hover:border-[#C5E5E9]/40  bg-[#ffffff1d]" size='icon'><Star className="size-5"></Star></Button>
                <Button className="rounded-full border transition-all duration-300 border-[#ffffff1d] hover:border-[#C5E5E9]/40  bg-[#ffffff1d]" size='icon'><User2 className="size-5"></User2></Button>
            </div>
        </div>
    </div>
}

function DashboardSidebarMockup({ businessTab, navigation }: { businessTab: BusinessTab, navigation: NavItem[] }) {
    return <div className="flex flex-col gap-4 w-max">
        <BusinessSelectorMockup businessTab={businessTab}></BusinessSelectorMockup>
        <SidebarNavigationMockup itemClassName="bg-[#243B3E] opacity-40" titleClassName="text-lg text-white font-medium"
            activeClassName="opacity-100 after:w-1.5 after:absolute ltr:after:left-1 rtl:after:right-1 after:h-10 rtl:after:rounded-l-lg ltr:after:rounded-r-lg after:bg-sky-blue"
            items={navigation}></SidebarNavigationMockup>
    </div>
}

function BusinessSelectorMockup({ businessTab }: { businessTab: BusinessTab }) {
    return <div className="bg-soft-blue flex flex-col border-4 border-sad-blue rounded-xl rtl:rounded-tl-[34px] ltr:rounded-tr-[34px] p-2 w-65 gap-2">
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center justify-between">
                <Building2></Building2>
                <p className="text-xl font-semibold">{businessTab.name}</p>
            </div>
            <ChevronLeft className="rotate-180 rtl:rotate-0"></ChevronLeft>
        </div>
        <div className="flex gap-2 items-center text-royal-green">
            <p className="text-sm text-royal-green/80">{businessTab.roleLabel}</p>
            <div className="border-orange-900 bg-orange-200 text-orange-900 text-xs font-normal rounded-full border px-2 py-1 w-max">{businessTab.role}</div>
        </div>
    </div>
}

interface NavItem {
    title: string;
    icon: React.ReactNode;
    onClick?: () => void;
    isActive?: boolean;
}

interface BusinessTab {
    name: string,
    roleLabel: string,
    role: string,
}

interface SidebarNavigationMockupProps {
    items: NavItem[];
    className?: string;
    itemClassName?: string;
    titleClassName?: string;
    iconClassName?: string;
    activeClassName?: string;
}

function SidebarNavigationMockup({
    items,
    className,
    itemClassName,
    titleClassName,
    iconClassName,
    activeClassName,
}: SidebarNavigationMockupProps) {
    return (
        <div className={cn("flex gap-3 flex-col items-center justify-between w-full bg-[#243B3E]", className)}>
            {items.map((item, i) => (
                <NavigationBtnMockup
                    key={i}
                    title={item.title}
                    icon={item.icon}
                    onClick={item.onClick}
                    className={cn(itemClassName, item.isActive && activeClassName)}
                    titleClassName={titleClassName}
                    iconClassName={iconClassName}
                />
            ))}
        </div>
    );
}

interface NavigationBtnMockupProps {
    title: string;
    icon: React.ReactNode;
    className?: string;
    titleClassName?: string;
    iconClassName?: string;
    onClick?: () => void;
}

function NavigationBtnMockup({
    title,
    icon,
    className,
    titleClassName,
    iconClassName,
    onClick,
}: NavigationBtnMockupProps) {
    return (
        <div
            className={cn(
                "flex gap-3 justify-start items-center bg-royal-green w-full py-4 px-2",
                onClick && "cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            <span className={cn("h-6 w-6 flex items-center justify-center", iconClassName)}>
                {icon}
            </span>
            <span className={titleClassName}>{title}</span>
        </div>
    );
}

const defaultTableDummyData: TableUI[] = [
    // Batch 1
    {
        code: "A1B2C3",
        active_session: {
            code: "S1X2Y3",
            started_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 60_000).toISOString(),
            payment_status: 'unpaid',
            status: 'active'
        },
        active_call: {
            status: 'pending',
            created_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 30_000).toISOString(),
        },
        name: "میز ۱",
        seats: 4,
        location_description: "Near window",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: true,
    },
    {
        code: "D4E5F6",
        active_session: {
            code: "T7U8V9",
            started_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 60_000).toISOString(),
            payment_status: 'unpaid',
            status: 'active'
        },
        name: "میز ۲",
        seats: 2,
        is_active: true,
        is_occupied: true,
        is_reserved: false,
    },
    {
        code: "G7H8I9",
        active_session: {
            code: "X1Y2Z3",
            started_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 120_000).toISOString(),
            payment_status: 'unpaid',
            status: 'active'
        },
        active_call: {
            status: 'pending',
            created_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 90_000).toISOString(),
        },
        name: "میز ۳",
        seats: 6,
        location_description: "Center hall",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: true,
    },
    {
        code: "J1K2L3",
        active_session: {
            code: "X1Y2Z3",
            started_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 120_000).toISOString(),
            payment_status: 'unpaid',
            status: 'active'
        },
        name: "میز ۴",
        seats: 4,
        location_description: "Patio",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: false,
    },

    // Batch 2
    {
        code: "P7Q8R9",
        active_session: {
            code: "L1M2N3",
            started_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 90_000).toISOString(),
            payment_status: 'unpaid',
            status: 'active'
        },
        active_call: {
            status: 'pending',
            created_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 45_000).toISOString(),
        },
        name: "میز ۶",
        seats: 4,
        location_description: "Balcony",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: true,
    },
    {
        code: "S1T2U3",
        active_session: {
            code: "O4P5Q6",
            started_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 90_000).toISOString(),
            payment_status: 'unpaid',
            status: 'active'
        },
        name: "میز ۷",
        seats: 2,
        is_active: true,
        is_occupied: true,
        is_reserved: false,
    },
    {
        code: "V4W5X6",
        active_session: {
            code: "R7S8T9",
            started_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 180_000).toISOString(),
            payment_status: 'unpaid',
            status: 'active'
        },
        active_call: {
            status: 'pending',
            created_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 120_000).toISOString(),
        },
        name: "میز ۸",
        seats: 6,
        location_description: "Main hall",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: true,
    },
];

// Panel Mockups
export function LiveManagementPanelMockup({ dummyData = defaultTableDummyData, isCompact = false, isInView, activeCall = false, className }: { dummyData?: TableUI[], isCompact?: boolean, isInView?: boolean, activeCall?: boolean, className?: string }) {
    const t = useTranslations("dashboardMockup");

    const navigation = [
        {
            title: t("navigation.0"),
            icon: <BarChart className="h-6 w-6" />,
        },
        {
            title: t("navigation.1"),
            icon: <Radar className="h-6 w-6" />,
            isActive: true,
        },
        {
            title: t("navigation.2"),
            icon: <ScrollText className="h-6 w-6" />,
        },
        {
            title: t("navigation.3"),
            icon: <Users className="h-6 w-6" />,
        },
        {
            title: t("navigation.4"),
            icon: <Settings className="h-6 w-6" />,
        },
    ];
    const businessTab = {
        name: t("business.name"),
        roleLabel: t("business.roleLabel"),
        role: t("business.role"),
    }

    return <div className="flex gap-4 w-max">
        {!isCompact && <DashboardSidebarMockup businessTab={businessTab} navigation={navigation}></DashboardSidebarMockup>}
        <div className={cn("flex flex-col gap-4 rounded-[34px] bg-[#ffffff1d] p-4", isCompact && 'bg-transparent', className)}>
            <div className="w-full rounded-full border border-[#C5E5E9]/40 bg-[#C5E5E9]/20 p-2">
                <div className="border-royal-green flex w-max gap-2 rounded-full border bg-[#F8FEFF] p-1">
                    <Button className="bg-royal-green rounded-full px-6 text-sm text-white">
                        {t("liveManagement.filters.0")}
                    </Button>
                    <Button className="text-royal-green hover:bg-royal-green/10 rounded-full bg-inherit px-6 text-sm">
                        {t("liveManagement.filters.1")}
                    </Button>
                    <Button className="text-royal-green hover:bg-royal-green/10 rounded-full bg-inherit text-sm">
                        {t("liveManagement.filters.2")}
                    </Button>
                </div>
            </div>
            <section className="flex w-full flex-col gap-4">
                <div className="flex w-full gap-4">
                    {dummyData.slice(0, 4).map((table, index, array) => (
                        <LiveCard
                            isInView={isInView}
                            isMockup
                            key={index}
                            table={{
                                ...table,
                                // activate waiter call of table with id=2
                                ...(index === 1 && activeCall
                                    ? {
                                        active_call: {
                                            status: 'pending',
                                            created_at: new Date().toISOString(),
                                            expires_at: new Date(Date.now() + 120_000).toISOString(),
                                        },
                                    }
                                    : {}),
                            } as Table}
                            businessSlug="business-1"
                            branchSlug="branch-1-1"
                        ></LiveCard>
                    ))}
                </div>
                <div className="flex w-full gap-4">
                    {dummyData.slice(4).map((table, index) => (
                        <LiveCard
                            isInView={isInView}
                            isMockup
                            key={index}
                            table={table as Table}
                            businessSlug="business-1"
                            branchSlug="branch-1-1"
                        ></LiveCard>
                    ))}
                </div>
            </section>
        </div >
    </div >
}

// add other panel mockups here