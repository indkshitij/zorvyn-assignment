import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatINR } from "@/lib/currency";
import { abbreviateINR } from "@/lib/currency";

const getLast12MonthsData = (data = []) => {
  const result = [];

  const now = new Date();

  const dataMap = {};
  data.forEach((item) => {
    dataMap[item.month] = item;
  });

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const monthLabel = d.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (dataMap[monthLabel]) {
      result.push(dataMap[monthLabel]);
    } else {
      result.push({
        month: monthLabel,
        income: 0,
        expense: 0,
      });
    }
  }

  return result;
};

const formatYAxisINR = (num) => {
  return abbreviateINR(num, { space: false });
};


const IncomeExpenseBarGraph = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/60 text-center text-zinc-400">
        No data available
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur">
      {/* title */}
      <h3 className="text-sm font-semibold text-white mb-4">
        Income vs Expense Over Time
      </h3>

      {/* chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getLast12MonthsData(data)}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickFormatter={formatYAxisINR}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              width={60}
            />

            <Tooltip
              formatter={(value, name) => [
                formatINR(value),
                name === "income" ? "Income" : "Expenses",
              ]}
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "10px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#fff" }}
            />

            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              formatter={(value) =>
                value === "income" ? "Income" : "Expenses"
              }
            />

            {/* income */}
            <Bar
              dataKey="income"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              barSize={28}
            />

            {/* expense */}
            <Bar
              dataKey="expense"
              fill="#f43f5e"
              radius={[6, 6, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseBarGraph;
