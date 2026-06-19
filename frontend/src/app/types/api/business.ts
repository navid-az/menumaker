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
