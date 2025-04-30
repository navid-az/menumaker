//components
import MenuMaker from "./components/MenuMaker";

const getAssetGroups = async () => {
  const res = await fetch("http://127.0.0.1:8000/pickers/icon-pickers");
  if (!res.ok) {
    throw new Error(
      `Failed to fetch asset groups: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
};

export default async function Page() {
  const assetGroups = await getAssetGroups();

  return (
    <section className="container m-auto flex h-screen w-full items-center justify-between gap-12 overflow-hidden">
      <MenuMaker assetGroups={assetGroups}></MenuMaker>
    </section>
  );
}
