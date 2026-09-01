import { MediaAsset } from "./asset";

export type ItemsDisplayType = "full-bleed-overlay" | "half-image-stacked";

export type Menu = {
  id: number;
  business: number;
  show_social_links: boolean;
  show_phone_numbers: boolean;
  show_branches: boolean;
  items_page_layout: "horizontal" | "vertical";
  cart_btn_display_type: "default" | "compact";
  // categories_display_type: "slider" | "circular";
  items_display_type: ItemsDisplayType;
  call_waiter_enabled: boolean;
  searchbar_enabled: boolean;
  // welcome_page_layout?: "single" | "couple" | "none";
  home_images?: MediaAsset[];
  home_title?: string;
  home_subtitle?: string;
};

export type AnimationVariant = "ripple" | "tactile";

export type MenuGlobalStyling = {
  id: number;
  menu: number;
  style: "default" | "retro";
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
  bg_color: string;
  unit_display_type: "default" | "compact" | "persian_abbr" | "english_abbr";
  border_radius: "sm" | "md" | "lg" | "full";
  click_animation_enabled: boolean;
  click_animation_type?: AnimationVariant[];
  updated: string;
  created: string;
};

export type OptionChoice = {
  id: number;
  name: string;
  price_modifier: number;
  is_default?: boolean;
};
export type ItemOption = {
  id: number;
  type: "radio" | "multi_select" | "counter";
  name: string;
  required: boolean;
  choices: OptionChoice[];
};
export type MenuItem = {
  id: number;
  item_images?: MediaAsset[];
  name: string;
  description: string;
  category: number;
  business: string; //slug
  price: number;
  is_featured?: boolean;
  is_available: boolean;
  is_active: boolean;
  branch_exceptions?: {
    branch: string;
    is_available: boolean;
    is_active: boolean;
  } | null;
  options?: ItemOption[];
};

export type CategoryIcon = { id: number; name?: string; url: string };
export type MenuCategory = {
  id: number;
  business: string;
  items: MenuItem[];
  name?: string;
  icon?: CategoryIcon;
  is_active: boolean;
};

export type OrderItem = {
  id: number;
  price_snapshot: string;
  name_snapshot: string;
  quantity: number;
  notes?: string;
  item: number;
};

export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready"
  | "served"
  | "cancelled";

export type Order = {
  id: number;
  status:
    | "pending"
    | "accepted"
    | "preparing"
    | "ready"
    | "served"
    | "cancelled";
  session_code: string;
  notes?: string;
  items: OrderItem[];
  total_price: number;
  created_at: string;
  accepted_at?: string;
  ready_at?: string;
  served_at?: string;
  cancelled_at?: string;
};
