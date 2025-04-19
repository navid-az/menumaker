import { AssetPickerPopOver } from "@/components/global/itemAdderButtons/AssetPickerPopOver";

const getAssetGroups = async () => {
  const res = await fetch("http://127.0.0.1:8000/pickers/icon-pickers");
  if (!res.ok) {
    throw new Error(
      `Failed to fetch asset groups: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
};

export default async function page() {
  const assetGroups = await getAssetGroups();

  return (
    <div>
      <AssetPickerPopOver assetGroups={assetGroups}></AssetPickerPopOver>
    </div>
  );
}
