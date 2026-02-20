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
