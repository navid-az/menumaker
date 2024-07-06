//components
import ToolBar from "../../components/ToolBar";

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolBar></ToolBar>
      <div className="mt-4">{children}</div>
    </>
  );
}
