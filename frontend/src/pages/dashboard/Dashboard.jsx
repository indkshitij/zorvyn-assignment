import { lazy, Suspense, useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";

import Sidebar from "@/components/molecules/Sidebar";
import DashboardNavbar from "@/components/molecules/DashboardNavbar";
import SideComponentWrapper from "@/lib/SideComponentWrapper";
import LoaderFallback from "@/components/atom/LoaderFallback";
const DashboardStats = lazy(
  () => import("@/components/dashboard_components/DashboardStats"),
);

export default function Dashboard() {
  const { fetchDashboardData } = useContext(AppContext);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 md:ml-60">
        <DashboardNavbar pageTitle="Dashboard" />

        <SideComponentWrapper>
          <Suspense fallback={<LoaderFallback />}>
            <DashboardStats />
          </Suspense>
        </SideComponentWrapper>
      </main>
    </div>
  );
}
