import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
    /** Number of regular (non-selection, non-action) columns to render. */
    columnCount?: number;
    /** Number of skeleton rows to render. */
    rowCount?: number;
    /** Show the search input + "view options" row above the table. */
    showToolbar?: boolean;
    /** Show the "rows selected" + pagination row below the table. */
    showPagination?: boolean;
    /** Render a narrow checkbox-style column as the first column. */
    withSelectionColumn?: boolean;
    /** Render a narrow action ("...") column as the last column. */
    withActionColumn?: boolean;
    className?: string;
}

// Cycled so adjacent cells/columns don't render as identical-width bars.
const CELL_WIDTHS = ["w-[85%]", "w-[60%]", "w-[75%]", "w-[45%]", "w-[65%]"];

export function DataTableSkeleton({
    columnCount = 5,
    rowCount = 10,
    showToolbar = true,
    showPagination = true,
    withSelectionColumn = true,
    withActionColumn = true,
    className,
}: DataTableSkeletonProps) {
    const columns = Array.from({ length: columnCount });
    const rows = Array.from({ length: rowCount });

    return (
        <div className={cn("w-full space-y-4", className)}>
            {showToolbar && (
                <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-[250px] rounded-md" />
                    <Skeleton className="h-8 w-[70px] rounded-md" />
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {withSelectionColumn && (
                                <TableHead className="w-10">
                                    <Skeleton className="h-4 w-4 rounded-sm" />
                                </TableHead>
                            )}
                            {columns.map((_, colIndex) => (
                                <TableHead key={colIndex}>
                                    <Skeleton
                                        className={cn("h-4", CELL_WIDTHS[colIndex % CELL_WIDTHS.length])}
                                    />
                                </TableHead>
                            ))}
                            {withActionColumn && (
                                <TableHead className="w-10">
                                    <Skeleton className="h-4 w-4 rounded-sm" />
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {rows.map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {withSelectionColumn && (
                                    <TableCell>
                                        <Skeleton className="size-10 rounded-sm" />
                                    </TableCell>
                                )}
                                {columns.map((_, colIndex) => (
                                    <TableCell key={colIndex}>
                                        <Skeleton
                                            className={cn(
                                                "h-4",
                                                CELL_WIDTHS[(colIndex + rowIndex) % CELL_WIDTHS.length]
                                            )}
                                        />
                                    </TableCell>
                                ))}
                                {withActionColumn && (
                                    <TableCell className="flex gap-2">
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {showPagination && (
                <div className="flex items-center justify-between px-2">
                    <Skeleton className="h-4 w-40" />
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-8 w-16 rounded-md" />
                        </div>
                        <Skeleton className="h-4 w-20" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}