import DashboardCard from "@/components/atom/DashboardCard";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  BarChart3,
  Repeat,
  Calendar,
} from "lucide-react";
import SpendingCategory from "@/components/molecules/SpendingCategory";
import BalanceTrend from "@/components/molecules/BalanceTrend";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import IncomeExpenseBarGraph from "./IncomeExpenseBarGraph";
import CategoryBreakdown from "./CategoryBreakdown";
import { formatINR } from "@/lib/currency";

const InsightStats = ({ insight }) => {
  const { dashboardData: data } = useContext(AppContext);

  if (!insight) {
    return (
      <div className="text-center py-10 text-zinc-400">Loading insights...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Income"
          value={`${formatINR(insight.summary.totalIncome) || 0}`}
          subtitle="all earnings"
          icon={TrendingUp}
        />

        <DashboardCard
          title="Total Expense"
          value={`${formatINR(insight.summary.totalExpense) || 0}`}
          subtitle="total spent"
          icon={TrendingDown}
        />

        <DashboardCard
          title="Net Savings"
          value={`${formatINR(insight.summary.netSavings) || 0}`}
          subtitle="income - expenses"
          icon={Wallet}
        />

        <DashboardCard
          title="Savings Rate"
          value={`${insight.summary.savingsRate?.toFixed(1) || 0}%`}
          subtitle="of total income"
          icon={PiggyBank}
        />

        {/* <DashboardCard
          title="Financial Health"
          value={insight.summary.financialStatus || "-"}
          subtitle={
            insight.summary.financialStatus === "saving"
              ? "you are saving money"
              : "spending exceeds income"
          }
          icon={
            insight.summary.financialStatus === "saving"
              ? CheckCircle
              : AlertTriangle
          }
        /> */}

        <DashboardCard
          title="Top Spending"
          value={insight.summary.topCategory?.name || "-"}
          subtitle={`${formatINR(insight.summary.topCategory?.total) || 0} spent`}
          icon={BarChart3}
        />

        <DashboardCard
          title="Most Transactions"
          value={insight.summary.mostTransactions?.name || "-"}
          subtitle={`${insight.summary.mostTransactions?.count || 0} transactions`}
          icon={Repeat}
        />

        <DashboardCard
          title="Avg Monthly Spend"
          value={`${formatINR(insight.summary.avgMonthlySpend) || 0}`}
          subtitle="average per month"
          icon={Calendar}
        />

        <DashboardCard
          title="Highest Month"
          value={insight.summary.highestSpendingMonth?.month || "-"}
          subtitle={`${formatINR(insight.summary.highestSpendingMonth?.expense) || 0} spent`}
          icon={TrendingUp}
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

      <IncomeExpenseBarGraph data={insight.chart} />

      <CategoryBreakdown insight={insight} />
    </div>
  );
};

export default InsightStats;
