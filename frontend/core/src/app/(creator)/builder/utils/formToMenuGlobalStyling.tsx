//types
import { type MenuGlobalStylingUI, type MenuUI } from "@/app/types/ui/menu";

//schema
import { BuilderSchema } from "../components/builder/BuilderTest";

//libraries
import * as z from "zod";

export const formToMenuGlobalStyling = (
  form: z.infer<typeof BuilderSchema>
): { globalStyling: MenuGlobalStylingUI; menu: MenuUI } => {
  const [primary, secondary, tertiary, bg] = form.global_styling.color_palette;
  const globalStyling = {
    style: form.global_styling.style,
    primary_color: primary,
    secondary_color: secondary,
    tertiary_color: tertiary,
    bg_color: bg,
    border_radius: form.global_styling.border_radius,
    unit_display_type: form.global_styling.unit_display_type,
    click_animation_enabled: form.global_styling.click_animation_enabled,
    click_animation_type: form.global_styling.click_animation_type,
  };
  const menu: MenuUI = {
    show_branches: form.show_branches,
    show_phone_numbers: form.show_phone_numbers,
    show_social_links: form.show_social_links,
    items_page_layout: form.items_page_layout,
    cart_btn_display_type: form.cart_btn_display_type,
    categories_display_type: form.categories_display_type,
    call_waiter_enabled: form.call_waiter_enabled,
    home_title: form.home_title,
    home_subtitle: form.home_subtitle,
    searchbar_enabled: form.searchbar_enabled,
    primary_image: form.home_images?.[0]?.url,
    secondary_image: form.home_images?.[1]?.url,
    tertiary_image: form.home_images?.[2]?.url,
  };

  return {
    globalStyling: globalStyling,
    menu: menu,
  };
};
