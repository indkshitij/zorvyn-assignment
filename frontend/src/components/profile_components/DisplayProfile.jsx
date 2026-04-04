import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import DashboardCard from "../atom/DashboardCard";
import { TrendingUp, TrendingDown, Wallet, BarChart3 } from "lucide-react";
import RecentTransaction from "../dashboard_components/RecentTransaction";
import ProfileCard from "./ProfileCard";
import DeleteAccount from "./DeleteAccount";
import { formatINR } from "@/lib/currency";

const DisplayProfile = () => {
  const { getUserById, dashboardData, fetchDashboardData } =
    useContext(AppContext);
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const userId = user?._id || user?.id;

  if (!userId) return; 

  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await getUserById(userId);
      if (data) setProfile(data);

      if (!dashboardData) {
        await fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [user]); 

  return (
    <div>
      {loading ? (
        <div className="text-zinc-400">Loading profile...</div>
      ) : profile ? (
        <div className=" space-y-6">
          {/* profile card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileCard
              name={profile?.name}
              isActive={profile?.isActive}
              email={profile?.email}
              role={profile?.role}
              createdAt={profile?.createdAt}
            />

            {/* stats  */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <DashboardCard
                title="Income"
                value={`${formatINR(dashboardData?.totalIncome) || 0}`}
                icon={TrendingUp}
                subtitle="Total earned"
              />

              <DashboardCard
                title="Expense"
                value={`${formatINR(dashboardData?.totalExpense) || 0}`}
                icon={TrendingDown}
                subtitle="Total spent"
              />

              <DashboardCard
                title="Net Balance"
                value={`${formatINR(dashboardData?.netBalance) || 0}`}
                icon={Wallet}
                subtitle={
                  dashboardData?.netBalance >= 0 ? "Saving" : "Overspending"
                }
              />

              <DashboardCard
                title="Transactions"
                value={dashboardData?.totalTransactions || 0}
                icon={BarChart3}
                subtitle="Total records"
              />
            </div>
          </div>
          {/* recent transactions */}
          <RecentTransaction
            transactions={dashboardData?.recentTransactions || []}
          />

          {/* delete acc */}
          <DeleteAccount />
        </div>
      ) : (
        <div className="text-zinc-400">No user data</div>
      )}
    </div>
  );
};

export default DisplayProfile;
