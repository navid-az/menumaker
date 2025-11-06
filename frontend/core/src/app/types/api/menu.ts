export type Menu = {
  id: number;
  business: number;
  show_social_links: boolean;
  show_phone_numbers: boolean;
  show_branches: boolean;
  items_page_layout: "horizontal" | "vertical";
  cart_btn_display_type: "default" | "compact";
  categories_display_type: string;
  call_waiter_enabled: boolean;
  searchbar_enabled: boolean;
  home_title?: string;
  home_subtitle?: string;
  primary_image?: string;
  secondary_image?: string;
  tertiary_image?: string;
};

export type AnimationVariant = "ripple" | "tactile";

export type MenuGlobalStyling = {
  id: number;
  business: number;
  style: "default" | "retro";
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
  bg_color: string;
  unit_display_type: "default" | "compact" | "persian_abbr" | "english_abbr";
  border_radius: "sm" | "md" | "lg" | "full";
  click_animation_enabled?: boolean;
  click_animation_type?: AnimationVariant[];
  updated: string;
  created: string;
};

export type MenuItem = {
  id: number;
  image: string;
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
};

export type MenuCategory = {
  id: number;
  business: string;
  items: MenuItem[];
  name?: string;
  icon?: { id: number; name: string; image: string };
  is_active: boolean;
};
