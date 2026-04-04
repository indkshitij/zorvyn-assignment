import { lazy, Suspense } from "react";
import Sidebar from "@/components/molecules/Sidebar";
import SideComponentWrapper from "@/lib/SideComponentWrapper";
import DashboardNavbar from "@/components/molecules/DashboardNavbar";
import LoaderFallback from "@/components/atom/LoaderFallback";

const DisplayProfile = lazy(
  () => import("@/components/profile_components/DisplayProfile")
);

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 md:ml-60">
        <DashboardNavbar pageTitle="Profile" />

        <SideComponentWrapper>

          <Suspense fallback={<LoaderFallback />}>
            <DisplayProfile />
          </Suspense>
          
        </SideComponentWrapper>
      </main>
    </div>
  );
};

export default Profile;