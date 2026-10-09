'use client'

//SVGs
import { Loader2 } from "lucide-react";

//libraries
import { useTranslations } from "next-intl";

export default function SocketStatus({ status }: { status: "connecting" | "connected" | "disconnected" }) {
    const t = useTranslations('dashboard.liveManagement.websocket')
    const socketStatusConfig = {
        connecting: {
            label: t("connecting"),
            className: "bg-blue-100 text-blue-800",
            showSpinner: true,
        },
        connected: {
            label: t("connected"),
            className: "bg-green-100 text-green-800",
            showSpinner: false,
        },
        disconnected: {
            label: t("disconnected"),
            className: "bg-red-100 text-red-800",
            showSpinner: false,
        },
    } as const;

    const currentSocketStatus = socketStatusConfig[status];
    return (
        <div
            className={`select-none flex h-max w-max items-center text-sm gap-1.5 rounded-full px-3 py-1.5 ${currentSocketStatus.className}`}
        >
            {currentSocketStatus.showSpinner && (
                <Loader2 className="size-4 animate-spin" />
            )}
            {currentSocketStatus.label}
        </div>
    )
}
