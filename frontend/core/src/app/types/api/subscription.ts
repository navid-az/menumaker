type SubscriptionFeature = {
  code: string;
  limit_value: number | null;
  is_enabled: boolean;
};

type SubscriptionPlan = {
  name: string;
  features: SubscriptionFeature[];
};

export type Subscription = {
  id: number;
  start_date: string; // ISO 8601 format
  end_date: string; // ISO 8601 format
  status: "active" | "pending" | "expired" | "paused" | "canceled";
  business: number; // business ID
  plan: SubscriptionPlan;
  pricing: number; // pricing field is currently just an ID
};
