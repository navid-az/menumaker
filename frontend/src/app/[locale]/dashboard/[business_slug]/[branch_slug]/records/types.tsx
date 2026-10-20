import { Order } from "@/app/types/api/menu";
import { Table } from "@/app/types/api/business";
import { Payment } from "@/app/types/api/business";

export type TableSessionRecord = {
    id: number;
    code: string;
    table: Pick<Table, "id" | "code" | "name">;
    started_at: string;
    ended_at: string | null;
    expires_at: string;
    status: "active" | "closed";
    payment_status: "paid" | "unpaid" | "partial";
    total_amount: number;
};

export type ServiceRequestRecord = {
    id: number;
    table: Pick<Table, "id" | "code" | "name">;
    session_code: string;
    request_type:
    | "call_waiter"
    | "request_bill"
    | "request_water"
    | "request_cutlery"
    | "other";
    status: "pending" | "resolved" | "expired";
    created_at: string;
    resolved_at: string | null;
    resolved_by: number | null;
};

export type RecordsData = {
    orders: Order[];
    tableSessions: TableSessionRecord[];
    payments: Payment[];
    serviceRequests: ServiceRequestRecord[];
};