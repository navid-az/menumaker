import { Order } from "@/app/types/api/menu";
import { Table } from "@/app/types/api/business";
import { Payment } from "@/app/types/api/business";

import type {
    ServiceRequestRecord,
    TableSessionRecord,
} from "./types";

const now = Date.now();

const date = (minutesAgo: number) =>
    new Date(now - minutesAgo * 60_000).toISOString();

export const mockTables: Table[] = [
    {
        id: 1,
        code: "TBL00001",
        name: "T1",
        seats: 4,
        is_associated: true,
        is_active: true,
        is_occupied: true,
    },
    {
        id: 2,
        code: "TBL00002",
        name: "T2",
        seats: 2,
        is_associated: true,
        is_active: true,
        is_occupied: false,
    },
];

export const mockOrders: Order[] = [
    {
        id: 1042,
        status: "pending",
        session_code: "SES00001",
        items: [
            {
                id: 1,
                item: 12,
                name_snapshot: "Classic Burger",
                price_snapshot: "450000",
                quantity: 2,
            },
            {
                id: 2,
                item: 14,
                name_snapshot: "French Fries",
                price_snapshot: "120000",
                quantity: 1,
            },
        ],
        total_price: 1_020_000,
        created_at: date(5),
    },
    {
        id: 1041,
        status: "preparing",
        session_code: "SES00002",
        items: [
            {
                id: 3,
                item: 18,
                name_snapshot: "Margherita Pizza",
                price_snapshot: "680000",
                quantity: 1,
            },
        ],
        total_price: 680_000,
        created_at: date(22),
        accepted_at: date(20),
    },
    {
        id: 1040,
        status: "served",
        session_code: "SES00001",
        items: [
            {
                id: 4,
                item: 22,
                name_snapshot: "Cappuccino",
                price_snapshot: "160000",
                quantity: 2,
            },
        ],
        total_price: 320_000,
        created_at: date(75),
        accepted_at: date(73),
        ready_at: date(65),
        served_at: date(60),
    },
    {
        id: 1039,
        status: "cancelled",
        session_code: "SES00003",
        items: [],
        total_price: 250_000,
        created_at: date(150),
        cancelled_at: date(145),
    },
];

export const mockTableSessions: TableSessionRecord[] = [
    {
        id: 1,
        code: "SES00001",
        table: { id: 1, code: "TBL00001", name: "T1" },
        started_at: date(90),
        ended_at: null,
        expires_at: date(-30),
        status: "active",
        payment_status: "partial",
        total_amount: 1_340_000,
    },
    {
        id: 2,
        code: "SES00002",
        table: { id: 2, code: "TBL00002", name: "T2" },
        started_at: date(180),
        ended_at: date(30),
        expires_at: date(60),
        status: "closed",
        payment_status: "paid",
        total_amount: 680_000,
    },
    {
        id: 3,
        code: "SES00003",
        table: { id: 1, code: "TBL00001", name: "T1" },
        started_at: date(240),
        ended_at: date(150),
        expires_at: date(120),
        status: "closed",
        payment_status: "unpaid",
        total_amount: 250_000,
    },
];

export const mockPayments: Payment[] = [
    {
        id: 501,
        table_session: 1,
        amount: "500000",
        method: "cash",
        provider: "manual",
        status: "successful",
        created_at: date(15),
        paid_at: date(15),
    },
    {
        id: 500,
        table_session: 2,
        amount: "680000",
        method: "online",
        provider: "zarinpal",
        status: "successful",
        created_at: date(35),
        paid_at: date(35),
        reference_id: "REF123456",
    },
    {
        id: 499,
        table_session: 3,
        amount: "250000",
        method: "cash",
        provider: "manual",
        status: "pending",
        created_at: date(155),
    },
];

export const mockServiceRequests: ServiceRequestRecord[] = [
    {
        id: 801,
        table: { id: 1, code: "TBL00001", name: "T1" },
        session_code: "SES00001",
        request_type: "call_waiter",
        status: "pending",
        created_at: date(4),
        resolved_at: null,
        resolved_by: null,
    },
    {
        id: 800,
        table: { id: 2, code: "TBL00002", name: "T2" },
        session_code: "SES00002",
        request_type: "request_bill",
        status: "resolved",
        created_at: date(40),
        resolved_at: date(35),
        resolved_by: 3,
    },
    {
        id: 799,
        table: { id: 1, code: "TBL00001", name: "T1" },
        session_code: "SES00003",
        request_type: "request_water",
        status: "expired",
        created_at: date(160),
        resolved_at: null,
        resolved_by: null,
    },
];