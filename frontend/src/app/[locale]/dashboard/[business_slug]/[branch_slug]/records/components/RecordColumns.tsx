"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Order } from "@/app/types/api/menu";
import { Payment } from "@/app/types/api/business";
import { RecordsStatusBadge } from "./RecordsStatusBadge";

import { TableSessionRecord, ServiceRequestRecord } from "../types";
import { toPersianDigits } from "@/app/[locale]/(menu)/[business_slug]/utilities/formatCurrency";

function SortableHeader({
    label,
    column,
}: {
    label: string;
    column: Parameters<
        NonNullable<ColumnDef<Order>["header"]>
    >[0]["column"];
}) {
    return (
        <Button
            variant="ghost"
            className="-ms-3"
            onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
            }
        >
            {label}
            <ArrowUpDown className="ms-2 size-4" />
        </Button>
    );
}

export function useOrderColumns(): ColumnDef<Order>[] {
    const t = useTranslations("dashboard.records");
    const ts = useTranslations("dashboard.records.statuses");

    return [
        {
            accessorKey: "id",
            header: ({ column }) => (
                <SortableHeader label={t("columns.order")} column={column} />
            ),
            cell: ({ row }) => `#${row.original.id}`,
        },
        // {
        //     id: "session",
        //     accessorKey: "session_code",
        //     header: t("columns.session"),
        // },
        {
            id: "items",
            header: t("columns.items"),
            cell: ({ row }) => {
                const items = row.original.items;
                const count = items.reduce(
                    (sum, item) => sum + item.quantity,
                    0,
                );

                return (
                    <span className="max-w-48 truncate">
                        {items.map((item) => item.name_snapshot).join(", ") ||
                            t("noItems")}{" "}
                        {count > 0 && `(${count})`}
                    </span>
                );
            },
        },
        {
            accessorKey: "total_price",
            header: t("columns.total"),
            cell: ({ row }) =>
                t("currencyAmount", {
                    amount: toPersianDigits(row.original.total_price.toLocaleString()),
                }) + " تومان",
        },
        {
            accessorKey: "status",
            header: t("columns.status"),
            cell: ({ row }) => (
                <RecordsStatusBadge
                    status={row.original.status}
                    label={ts(row.original.status)}
                />
            ),
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <SortableHeader label={t("columns.createdAt")} column={column} />
            ),
            cell: ({ row }) =>
                new Date(row.original.created_at).toLocaleString(),
        },
    ];
}

export function useTableSessionColumns(): ColumnDef<TableSessionRecord>[] {
    const t = useTranslations("dashboard.records");
    const ts = useTranslations("dashboard.records.statuses");

    return [
        {
            accessorKey: "code",
            header: t("columns.session"),
            cell: ({ row }) => `#${row.original.code}`,
        },
        {
            accessorKey: "started_at",
            header: ({ column }) => (
                <SortableHeader
                    label={t("columns.startedAt")}
                    column={column as never}
                />
            ),
            cell: ({ row }) =>
                new Date(row.original.started_at).toLocaleString(),
        },
        {
            accessorKey: "expires_at",
            header: ({ column }) => (
                <SortableHeader
                    label={t("columns.expiresAt")}
                    column={column as never}
                />
            ),
            cell: ({ row }) =>
                new Date(row.original.expires_at).toLocaleString(),
        },
        {
            accessorKey: "paid_at",
            header: t("columns.paidAt"),
            cell: ({ row }) =>
                row.original.paid_at
                    ? new Date(row.original.paid_at).toLocaleString()
                    : t("notPaid"),
        },
        {
            accessorKey: "payment_status",
            header: t("columns.paymentStatus"),
            cell: ({ row }) => (
                <RecordsStatusBadge
                    status={row.original.payment_status}
                    label={ts(row.original.payment_status)}
                />
            ),
        },
        {
            accessorKey: "status",
            header: t("columns.status"),
            cell: ({ row }) => (
                <RecordsStatusBadge
                    status={row.original.status}
                    label={ts(row.original.status)}
                />
            ),
        },
        {
            id: "closedBy",
            header: t("columns.closedBy"),
            cell: ({ row }) => {
                const session = row.original;

                if (session.status === "active") {
                    return "-";
                }

                return session.ended_at
                    ? t("closureTypes.manual")
                    : t("closureTypes.automatic");
            },
        },
    ];
}

export function usePaymentColumns(): ColumnDef<Payment>[] {
    const t = useTranslations("dashboard.records");
    const ts = useTranslations("dashboard.records.statuses");

    return [
        {
            accessorKey: "id",
            header: t("columns.payment"),
            cell: ({ row }) => `#${row.original.id}`,
        },
        {
            accessorKey: "table_session",
            header: t("columns.sessionId"),
            cell: ({ row }) => `#${row.original.table_session}`,
        },
        {
            accessorKey: "amount",
            header: t("columns.amount"),
            cell: ({ row }) =>
                t("currencyAmount", {
                    amount: Number(row.original.amount).toLocaleString(),
                }),
        },
        {
            accessorKey: "method",
            header: t("columns.method"),
            cell: ({ row }) => t(`methods.${row.original.method}`),
        },
        {
            accessorKey: "provider",
            header: t("columns.provider"),
            cell: ({ row }) => t(`providers.${row.original.provider}`),
        },
        {
            accessorKey: "status",
            header: t("columns.status"),
            cell: ({ row }) => (
                <RecordsStatusBadge
                    status={row.original.status}
                    label={ts(row.original.status)}
                />
            ),
        },
        {
            accessorKey: "paid_at",
            header: t("columns.paidAt"),
            cell: ({ row }) =>
                row.original.paid_at
                    ? new Date(row.original.paid_at).toLocaleString()
                    : t("notPaid"),
        },
    ];
}

export function useServiceRequestColumns(): ColumnDef<ServiceRequestRecord>[] {
    const t = useTranslations("dashboard.records");
    const ts = useTranslations("dashboard.records.statuses");

    return [
        {
            accessorKey: "id",
            header: t("columns.request"),
            cell: ({ row }) => `#${row.original.id}`,
        },
        {
            accessorKey: "table",
            header: t("columns.table"),
        },
        {
            accessorKey: "request_type",
            header: t("columns.requestType"),
            cell: ({ row }) => t(`requestTypes.${row.original.request_type}`),
        },
        {
            accessorKey: "session_code",
            header: t("columns.session"),
            cell: ({ row }) => `#${row.original.session_code}`,
        },
        {
            accessorKey: "created_at",
            header: t("columns.createdAt"),
            cell: ({ row }) =>
                new Date(row.original.created_at).toLocaleString(),
        },
        {
            accessorKey: "status",
            header: t("columns.status"),
            cell: ({ row }) => (
                <RecordsStatusBadge
                    status={row.original.status}
                    label={ts(row.original.status)}
                />
            ),
        },
        {
            accessorKey: "resolved_at",
            header: t("columns.resolvedAt"),
            cell: ({ row }) =>
                row.original.resolved_at
                    ? new Date(row.original.resolved_at).toLocaleString()
                    : t("notResolved"),
        },
    ];
}