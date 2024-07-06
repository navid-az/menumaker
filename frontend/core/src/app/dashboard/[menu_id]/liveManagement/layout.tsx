//components
import ToolBar from "../../components/ToolBar";

export default function LiveManagementLayout({
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
