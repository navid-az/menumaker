//components
import {
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import { DashboardHeader } from "./components/DashboardHeader";
import DashboardNavbar from "./components/DashboardSidebar";
import DashboardPanel from "./components/DashboardPanel";

//functions
import { getUserData } from "@/lib/getUserData";
import { getUserBusinesses } from "@/lib/getUserBusinesses";

//types
export type BusinessType = {
  id: number;
  owner: number;
  slug: string;
  name: string;
  name_en: string;
  service_type: "online" | "in_person" | "both";
  primary_service_type: "online" | "in_person";
  branch_count: number;
  social_links: {};
  phone_numbers: {};
  locations: {};
}[];

// get user's restaurants/cafes info
// const getUserBusinesses = async (userId: number) => {
//   const res = await fetch(
//     `http://127.0.0.1:8000/accounts/user/${userId}/businesses`
//   );
//   return res.json();
// };

// const getMenuData = async (menu_id: string) => {
//   const res = await fetch(`${menu_id}/items/`);
//   return res.json();
// };

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { children } = props;

  const user = await getUserData();
  const businesses: BusinessType = await getUserBusinesses(user.pk);
  return (
    <div className="flex h-screen flex-col bg-primary">
      <DashboardHeader menu_id={params.slug}></DashboardHeader>
      <ResizablePanelGroup
        autoSaveId="dashboard-size"
        direction="horizontal"
        className="flex flex-1"
      >
        <DashboardNavbar businesses={businesses}></DashboardNavbar>
        <ResizableHandle withHandle></ResizableHandle>
        <DashboardPanel>{children}</DashboardPanel>
      </ResizablePanelGroup>
    </div>
  );
}
