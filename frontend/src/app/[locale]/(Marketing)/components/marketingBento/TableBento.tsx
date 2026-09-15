'use client'

import React, { useState, useEffect } from "react";

//components
import { Bento, BentoBody, BentoHeader, BentoTitle, BentoDescription } from "../BentoBox";
import LiveCard from "@/app/[locale]/dashboard/components/LiveCard";

function getIdleTableData() {
    // Static – no running timers
    return {
        id: 1,
        code: "A1B2C3",
        name: "میز ۱",
        seats: 4,
        location_description: "Near window",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: false,
    };
}

function getActiveTableData() {
    const now = Date.now();
    return {
        id: 1,
        code: "A1B2C3",
        active_session: {
            code: "S1X2Y3",
            started_at: new Date(now).toISOString(),
            expires_at: new Date(now + 25_000).toISOString(),
            is_active: true,
        },

        name: "میز ۱",
        seats: 4,
        location_description: "Near window",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: true,
    };
}
export default function TableBento() {
    const [isHovered, setIsHovered] = useState(false);
    const [table, setTable] = useState(getIdleTableData);

    useEffect(() => {
        if (isHovered) {
            // Start the clocks from the moment of hover
            setTable(getActiveTableData());
        } else {
            // End Hover: reset progress
            setTable(getIdleTableData());
        }
    }, [isHovered]);

    return <Bento
        colSpan={2}
        mobileRowSpan={2}
        rowSpan={4}
        className="group relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <BentoHeader>
            <BentoTitle>مدیریت میز و سفارشات</BentoTitle>
            <BentoDescription>
                نمایش وضعیت میز ها و سفارشات به صورت لحظه ای
            </BentoDescription>
        </BentoHeader>

        <BentoBody className="">
            <div className="h-full w-max absolute flex gap-0 md:gap-4 left-1/2 right-1/2 translate-x-1/2 translate-y-2/12 scale-90">
                <LiveCard
                    className="border transition-all duration-300 scale-90 md:scale-100 group-hover:scale-85 md:group-hover:scale-95"
                    table={{ ...getIdleTableData(), name: 'میز VIP' }}
                    businessSlug="mockup-business-2"
                    branchSlug="mockup-branch-2"
                />
                <LiveCard
                    className="border group-hover:border-2 transition-all group-hover:-translate-y-2/12 duration-300 scale-90 md:scale-100 group-hover:scale-95 md:group-hover:scale-105"
                    table={table}
                    businessSlug="mockup-business-2"
                    branchSlug="mockup-branch-2"
                />
                <LiveCard
                    className="border transition-all duration-300 scale-90 md:scale-100 group-hover:scale-85 md:group-hover:scale-95"
                    table={{ ...getIdleTableData(), name: 'میز ۲' }}
                    businessSlug="mockup-business-2"
                    branchSlug="mockup-branch-2"
                />
            </div>
        </BentoBody>
    </Bento>
}