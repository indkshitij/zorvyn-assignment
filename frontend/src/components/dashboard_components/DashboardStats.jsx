import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import DashboardCard from "@/components/atom/DashboardCard";
import { Wallet, TrendingUp, TrendingDown, ReceiptText } from "lucide-react";
import RecentTransaction from "@/components/dashboard_components/RecentTransaction";
import SpendingCategory from "@/components/molecules/SpendingCategory";
import BalanceTrend from "@/components/molecules/BalanceTrend";
import { formatINR} from "@/lib/currency";

const DashboardStats = () => {
  const { dashboardData: data, loading } = useContext(AppContext);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-20 text-zinc-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Income"
            value={`${formatINR(data.totalIncome)}`}
            icon={TrendingUp}
            subtitle="Money received"
          />

          <DashboardCard
            title="Expense"
            value={`${formatINR(data.totalExpense)}`}
            icon={TrendingDown}
            subtitle="Money spent"
          />

          <DashboardCard
            title="Balance"
            value={`${formatINR(data.netBalance)}`}
            icon={Wallet}
            subtitle="Available balance"
          />

          <DashboardCard
            title="Transactions"
            value={data.totalTransactions || 0}
            icon={ReceiptText}
            subtitle="Total entries"
          />
        </div>

        {/* graphs */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
          <SpendingCategory
            className="mx-auto aspect-square max-h-[260px]"
            data={data.categoryBreakdown}
          />
          <BalanceTrend monthlyBreakdown={data.dailyBreakdown} />
        </div>

        {/* recent transactions */}
        <div className="">
          <RecentTransaction transactions={data.recentTransactions || []} />
        </div>
      </div>
    </>
  );
};

export default DashboardStats;
