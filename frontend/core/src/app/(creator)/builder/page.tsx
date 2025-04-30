//components
import MenuMaker from "./components/MenuMaker";

export default async function Page() {
  return (
    <section className="container m-auto flex h-screen w-full items-center justify-between gap-12 overflow-hidden">
      <MenuMaker></MenuMaker>
    </section>
  );
}
