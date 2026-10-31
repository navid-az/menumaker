import { Order } from "@/app/types/api/menu";
import { Table } from "@/app/types/api/business";
import { Payment } from "@/app/types/api/business";

export type TableSessionRecord = {
    code: string;
    status: "active" | "closed";
    started_at: string;
    expires_at: string;
    ended_at: string | null;
    paid_at: string | null;
    payment_status: "paid" | "unpaid" | "partial";
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