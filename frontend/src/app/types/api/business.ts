import { type Order } from "./menu";

export type Branch = {
  id: number;
  slug: string;
  name: string;
  address?: string;
  phone_number?: string;
};

export type Business = {
  id: number;
  owner: number;
  slug: string;
  name: string;
  name_en: string;
  service_type: "online" | "in_person" | "both";
  primary_service_type?: "online" | "in_person";
  branch_count: number;
  social_links?: [];
  phone_numbers?: [];
  locations?: [];
  branches: Branch[];
  has_menu: boolean;
  subscription_status?: "active" | "pending" | "paused" | "canceled";
};

export type Table = {
  id: number;
  code: string;
  active_session?: {
    code: string;
    started_at: string;
    expires_at: string;
    paid_at?: string;
    payment_status: "paid" | "unpaid" | "partial";
    status: "active" | "closed";
  };
  active_call?: {
    resolved: boolean;
    created_at: string;
    expires_at: string;
  };
  order?: Order;
  name: string;
  seats: number;
  location_description?: string;
  is_active?: boolean;
  is_occupied?: boolean;
  is_reserved?: boolean;
  is_requesting_assistance?: boolean;
  is_associated: boolean;
};

export type Payment = {
  id: number;
  table_session: number;
  amount: string;
  method: "cash" | "external_pos" | "online";
  provider: "manual" | "zarinpal";
  status: "pending" | "successful" | "failed" | "canceled" | "refunded";
  authority?: string;
  reference_id?: string;
  metadata?: {};
  created_at?: "2026-10-05T12:13:09.739549Z";
  updated_at?: "2026-10-05T12:13:09.739705Z";
  paid_at?: "2026-10-05T12:13:09.736956Z";
};
