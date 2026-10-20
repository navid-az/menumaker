"use client";

import { useTranslations } from "next-intl";

import { RecordsDataTable } from "./RecordsDataTable";
import { useOrderColumns, useTableSessionColumns, usePaymentColumns, useServiceRequestColumns } from "./RecordColumns";
import { mockOrders, mockPayments, mockServiceRequests, mockTableSessions, mockTables } from "../mock-data";

type RecordsViewType =
    | "orders"
    | "table-sessions"
    | "payments"
    | "service-requests";

export function RecordsView({ view }: { view: RecordsViewType }) {
    const t = useTranslations("dashboard.records");

    const orderColumns = useOrderColumns();
    const sessionColumns = useTableSessionColumns();
    const paymentColumns = usePaymentColumns();
    const requestColumns = useServiceRequestColumns();

    const views = {
        orders: {
            title: t("views.orders"),
            data: mockOrders,
            columns: orderColumns,
            searchFields: [
                "id",
                "session_code",
                "status",
                "items.name_snapshot",
            ],
            dateField: "created_at",
        },
        "table-sessions": {
            title: t("views.tableSessions"),
            data: mockTableSessions,
            columns: sessionColumns,
            searchFields: ["code", "table.name", "table.code", "status"],
            dateField: "started_at",
        },
        payments: {
            title: t("views.payments"),
            data: mockPayments,
            columns: paymentColumns,
            searchFields: ["id", "table_session", "method", "provider", "status"],
            dateField: "created_at",
        },
        "service-requests": {
            title: t("views.serviceRequests"),
            data: mockServiceRequests,
            columns: requestColumns,
            searchFields: [
                "id",
                "table.name",
                "session_code",
                "request_type",
                "status",
            ],
            dateField: "created_at",
        },
    } as const;

    const selected = views[view];

    return (
        <section className="space-y-5">
            <div>
                <h1 className="text-2xl font-semibold">{selected.title}</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    {t("description")}
                </p>
            </div>

            <RecordsDataTable
                data={selected.data}
                columns={selected.columns}
                searchFields={[...selected.searchFields]}
                dateField={selected.dateField}
            />
        </section>
    );
}