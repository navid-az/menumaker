import { OrderStatus } from "../api/menu";

export type CreateOrderItem = {
  item: number;
  quantity: number;
  notes?: string;
};

export type CreateOrder = {
  session_code: string;
  notes?: string;
  items: CreateOrderItem[];
};

export type UpdateOrder = {
  status: OrderStatus;
  accepted_at?: string;
  ready_at?: string;
  served_at?: string;
  cancelled_at?: string;
  notes?: string;
};
