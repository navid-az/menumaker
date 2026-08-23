export type MediaAssetCollection =
  | "item_gallery"
  | "menu_welcome"
  | "menu_banner";

export type MediaAssetType = "image" | "video";

export type MediaAsset = {
  id: number;
  url: string;
  media_type: MediaAssetType;
  collection: MediaAssetCollection;
  temp_id?: string;
  order?: number;
  created?: string;
};
