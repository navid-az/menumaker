import { type Menu } from "../api/menu";
import { type MenuGlobalStyling } from "../api/menu";


export type MenuUI = Omit<
  Menu,
  "id" | "business" 
>;

export type MenuGlobalStylingUI = Omit<
  MenuGlobalStyling,
  "id" | "business" | "created" | "updated"
>;
