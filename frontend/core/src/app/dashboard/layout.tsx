//components
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { DashboardHeader } from "./components/DashboardHeader";
import DashboardNavbar from "./components/DashboardNavbar";
import DashboardPanel from "./components/DashboardPanel";

//types
export type PlacesType = {
  id: number;
  menu_id: string;
  name: string;
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
  bg_color: string;
  price_unit: string;
  is_active: boolean;
  owner: number;
  personnel: [];
}[];

// get user's restaurants/cafes info
const getUserPlaces = async () => {
  const res = await fetch("http://127.0.0.1:8000/accounts/user/1/places");
  return res.json();
};

const getMenuData = async (menu_id: number) => {
  const res = await fetch(`${menu_id}/items/}/items/`);
  return res.json();
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const places: PlacesType = await getUserPlaces();
  // const data: PlacesType = await getMenuData();

  return (
    <div className="flex h-screen flex-col bg-primary">
      <DashboardHeader></DashboardHeader>
      <ResizablePanelGroup
        autoSaveId="dashboard-size"
        direction="horizontal"
        className="flex flex-1"
      >
        <DashboardNavbar places={places}></DashboardNavbar>
        <DashboardPanel>{children}</DashboardPanel>
      </ResizablePanelGroup>
    </div>
  );
}
