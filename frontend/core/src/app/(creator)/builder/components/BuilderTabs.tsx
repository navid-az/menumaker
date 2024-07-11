//components
import { BuilderTabsNavigator } from "./BuilderTabsNavigator";

export function BuilderTabs({ children }: { children: React.ReactNode }) {
  return (
    <section className="container flex w-screen flex-col justify-center gap-4 bg-white p-2 transition-all duration-300 ease-in-out xs:px-4 x:px-12 sm:gap-7">
      <header className="w-full">
        <h1
          id="section-title"
          className=" text-xl font-black text-royal-green sm:text-3xl"
        >
          title
        </h1>
      </header>
      <div className="relative h-max">{children}</div>
      <footer className="flex items-center justify-between">
        <BuilderTabsNavigator></BuilderTabsNavigator>
      </footer>
    </section>
  );
}

export function BuilderTabsSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      //   id={`form-section-${id}`}
      // relative
      className={"h-20 w-full bg-red-300 transition duration-200 ease-in-out"}
    >
      {children}
    </section>
  );
}
