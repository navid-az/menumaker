//components
import {
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import { DashboardHeader } from "./components/DashboardHeader";
import DashboardNavbar from "./components/DashboardSidebar";
import DashboardPanel from "./components/DashboardPanel";
import { getUserData } from "@/lib/getUserData";
import { getUserPlaces } from "@/lib/getUserPlaces";

//types
export type PlacesType = {
  id: number;
  menu_id: string;
  slug: string;
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
// const getUserPlaces = async (userId: number) => {
//   const res = await fetch(
//     `http://127.0.0.1:8000/accounts/user/${userId}/places`
//   );
//   return res.json();
// };

// const getMenuData = async (menu_id: string) => {
//   const res = await fetch(`${menu_id}/items/`);
//   return res.json();
// };

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { menu_id: string };
}) {
  const user = await getUserData();
  const places: PlacesType = await getUserPlaces(user.pk);
  return (
    <div className="flex h-screen flex-col bg-primary">
      <DashboardHeader menu_id={params.menu_id}></DashboardHeader>
      <ResizablePanelGroup
        autoSaveId="dashboard-size"
        direction="horizontal"
        className="flex flex-1"
      >
        <DashboardNavbar places={places}></DashboardNavbar>
        <ResizableHandle withHandle></ResizableHandle>
        <DashboardPanel>{children}</DashboardPanel>
      </ResizablePanelGroup>
    </div>
  );
}
