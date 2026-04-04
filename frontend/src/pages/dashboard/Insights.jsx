import { useEffect, useContext, lazy, Suspense } from "react";
import { AppContext } from "@/context/AppContext";
import Sidebar from "@/components/molecules/Sidebar";
import SideComponentWrapper from "@/lib/SideComponentWrapper";
import DashboardNavbar from "@/components/molecules/DashboardNavbar";
import LoaderFallback from "@/components/atom/LoaderFallback";
import { BarChart3 } from "lucide-react";

const InsightStats = lazy(
  () => import("@/components/insight_components/InsightStats"),
);

const Insights = () => {
  const { fetchDashboardData, fetchInsights, insightData, loading } =
    useContext(AppContext);

  useEffect(() => {
    fetchInsights();
    fetchDashboardData();
  }, []);

  const isEmpty =
    !insightData ||
    (!insightData.chart?.length && !insightData.breakdown?.length);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 md:ml-60">
        <DashboardNavbar pageTitle="Insights" />

        <SideComponentWrapper>
          {loading && <LoaderFallback />}

          {/*  No Data */}
          {!loading && isEmpty && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 rounded-lg bg-zinc-800 border border-zinc-700 mb-4">
                <BarChart3 className="w-8 h-8 text-zinc-400" />
              </div>

              <h2 className="text-lg font-semibold text-white">
                No insights available
              </h2>

              <p className="text-sm text-zinc-500 mt-2 max-w-sm">
                Start adding transactions to generate insights and track your
                financial trends.
              </p>
            </div>
          )}

          {!loading && !isEmpty && (
            <Suspense fallback={<LoaderFallback />}>
              <InsightStats insight={insightData} />
            </Suspense>
          )}
        </SideComponentWrapper>
      </main>
    </div>
  );
};

export default Insights;
