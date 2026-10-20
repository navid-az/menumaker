//functions
import { cn } from "@/lib/utils";

export const statusStyles: Record<string, string> = {
    // Orders
    pending: "border-amber-500/30 bg-amber-500/15 text-amber-600",
    accepted: "border-blue-500/30 bg-blue-500/15 text-blue-600",
    preparing: "border-violet-500/30 bg-violet-500/15 text-violet-600",
    ready: "border-cyan-500/30 bg-cyan-500/15 text-cyan-600",
    served: "border-emerald-500/30 bg-emerald-500/15 text-emerald-600",
    cancelled: "border-red-500/30 bg-red-500/15 text-red-600",

    // Sessions
    active: "border-emerald-500/30 bg-emerald-500/15 text-emerald-600",
    closed: "border-muted-foreground/25 bg-muted text-muted-foreground",

    // Payments
    successful: "border-emerald-500/30 bg-emerald-500/15 text-emerald-600",
    failed: "border-red-500/30 bg-red-500/15 text-red-600",
    canceled: "border-red-500/30 bg-red-500/15 text-red-600",
    refunded: "border-violet-500/30 bg-violet-500/15 text-violet-600",

    // Payment status and service requests
    paid: "border-emerald-500/30 bg-emerald-500/15 text-emerald-600",
    unpaid: "border-red-500/30 bg-red-500/15 text-red-600",
    partial: "border-amber-500/30 bg-amber-500/15 text-amber-600",
    resolved: "border-emerald-500/30 bg-emerald-500/15 text-emerald-600",
    expired: "border-muted-foreground/25 bg-muted text-muted-foreground",
};

type Props = {
    status: string;
    label: string;
};

export function RecordsStatusBadge({ status, label }: Props) {
    return (
        <div
            className={cn(
                "whitespace-nowrap w-max rounded-full px-3 py-1.5 font-medium",
                statusStyles[status] ??
                "border-muted-foreground/25 bg-muted text-muted-foreground",
            )}
        >
            {label}
        </div>
    );
}