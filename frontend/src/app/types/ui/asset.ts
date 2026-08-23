import { MediaAsset } from "../api/asset";

export type MediaAssetUI = Omit<MediaAsset, "id" | "created" | "temp_id">;
