"use client";

import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Props<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchFields: string[];
    dateField: string;
};

function getNestedValue(value: unknown, path: string): unknown {
    return path.split(".").reduce<unknown>((current, key) => {
        if (current && typeof current === "object") {
            return (current as Record<string, unknown>)[key];
        }
        return undefined;
    }, value);
}

export function RecordsDataTable<TData, TValue>({
    columns,
    data,
    searchFields,
    dateField,
}: Props<TData, TValue>) {
    const t = useTranslations("dashboard.records");
    const searchParams = useSearchParams();

    const search = searchParams.get("search") ?? "";
    const status = searchParams.get("status") ?? "all";
    const from = searchParams.get("from") ?? "";
    const to = searchParams.get("to") ?? "";

    const [sorting, setSorting] = React.useState<SortingState>([
        { id: dateField, desc: true },
    ]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});

    const filteredData = React.useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return data.filter((row) => {
            const record = row as Record<string, unknown>;

            const matchesSearch =
                !normalizedSearch ||
                searchFields.some((field) =>
                    String(getNestedValue(record, field) ?? "")
                        .toLowerCase()
                        .includes(normalizedSearch),
                );

            const recordStatus = String(
                record.status ?? record.payment_status ?? "",
            );

            const matchesStatus = status === "all" || recordStatus === status;

            const dateValue = getNestedValue(record, dateField);
            const timestamp = dateValue ? new Date(String(dateValue)).getTime() : NaN;

            const fromTimestamp = from
                ? new Date(`${from}T00:00:00`).getTime()
                : -Infinity;

            const toTimestamp = to
                ? new Date(`${to}T23:59:59.999`).getTime()
                : Infinity;

            const matchesDate =
                !Number.isNaN(timestamp) &&
                timestamp >= fromTimestamp &&
                timestamp <= toTimestamp;

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [data, search, status, from, to, searchFields, dateField]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting, columnVisibility },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize: 10 },
        },
    });

    React.useEffect(() => {
        table.setPageIndex(0);
    }, [search, status, from, to, table]);

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead className="text-start" key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-32 text-center"
                                >
                                    {t("empty")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground text-sm">
                    {t("page", {
                        current: table.getState().pagination.pageIndex + 1,
                        total: Math.max(table.getPageCount(), 1),
                    })}
                </span>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.previousPage()}
                    >
                        {t("previous")}
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}
                    >
                        {t("next")}
                    </Button>
                </div>
            </div>
        </div>
    );
}