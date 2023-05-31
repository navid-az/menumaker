import GoBackBtn from "@/app/components/goBackBtn";

export default function RegisterLayout({ children }) {
  return (
    <section className="h-screen overflow-hidden bg-white">
      <GoBackBtn></GoBackBtn>

      {/* form and prototype  */}
      <div className="container mx-auto flex h-screen w-full items-center justify-between px-40">
        {children}
      </div>
    </section>
  );
}
