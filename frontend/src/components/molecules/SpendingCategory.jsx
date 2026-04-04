import React from "react";
import { Pie, PieChart, Cell, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#ec4899",
  "#6366f1",
  "#14b8a6",
  "#eab308",
  "#f43f5e",
  "#8b5cf6",
  "#0ea5e9",
  "#10b981",
  "#facc15",
  "#fb7185",
  "#9333ea",
  "#0284c7",
];

const SpendingCategory = ({ data = [] }) => {
  // filter expense
  const expenseData = data.filter(
    (item) => item.type === "expense" || item._id?.type === "expense",
  );

  if (!expenseData.length) {
    return (
      <Card className="bg-zinc-900/60 border-zinc-800">
        <CardContent className="flex items-center justify-center py-10 text-zinc-400">
          No expense data
        </CardContent>
      </Card>
    );
  }

  // normalize data
  let normalized = expenseData.map((item) => ({
    category: item.category || item._id,
    amount: item.total,
  }));

  // sort desc
  normalized.sort((a, b) => b.amount - a.amount);

  // top 15 nd others
  let finalData = [];

  if (normalized.length > 15) {
    const top15 = normalized.slice(0, 15);
    const others = normalized.slice(15);

    const othersTotal = others.reduce((sum, i) => sum + i.amount, 0);

    finalData = [...top15, { category: "Others", amount: othersTotal }];
  } else {
    finalData = normalized;
  }

  const total = finalData.reduce((sum, item) => sum + item.amount, 0);

  // attach colors
  const chartData = finalData.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  // chart config
  const chartConfig = chartData.reduce((acc, item) => {
    acc[item.category] = {
      label: item.category,
      color: item.fill,
    };
    return acc;
  }, {});

  // tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { category, amount, fill } = payload[0].payload;
      const percent = ((amount / total) * 100).toFixed(1);

      return (
        <div className="bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: fill }}
            />
            <p className="text-white text-xs font-medium ">{category}</p>
          </div>

          <p className="text-white text-sm font-medium">
            ₹{amount.toLocaleString()}
          </p>

          <p className="text-zinc-400 mt-1 text-xs">{percent}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-zinc-900/60 border border-zinc-800 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white text-sm">
          Spending by Category
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[280px] w-full"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              cornerRadius={6}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>

            {/* tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />

            {/* legend */}
            <ChartLegend
              content={
                <ChartLegendContent nameKey="category" className="text-white" />
              }
              className="flex flex-wrap gap-3 justify-center mt-4 text-xs text-white"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingCategory;
