import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatINR, abbreviateINR } from "@/lib/currency";

const formatYAxisINR = (num) => {
  return abbreviateINR(num, { space: false });
};

const BalanceTrend = ({ monthlyBreakdown = [] }) => {
  const data = useMemo(() => {
    if (!Array.isArray(monthlyBreakdown)) return [];

    let running = 0;

    let formatted = monthlyBreakdown
      .map((item) => {
        const income = Number(item?.income || 0);
        const expense = Number(item?.expense || 0);

        // expense negative, income positive
        const net = income - expense;

        running += net;

        return {
          date: item?._id
            ? new Date(item._id).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })
            : "—",
          balance: running,
          income,
          expense,
          net,
        };
      })
      .filter((item) => !isNaN(item.balance));

    if (formatted.length === 1) {
      formatted = [{ ...formatted[0], date: "Prev", balance: 0 }, formatted[0]];
    }

    return formatted;
  }, [monthlyBreakdown]);

  if (!data.length) {
    return (
      <Card className="bg-zinc-900/60 border-zinc-800">
        <CardContent className="flex justify-center py-10 text-zinc-400">
          No trend data
        </CardContent>
      </Card>
    );
  }
  ``;

  const values = data.map((d) => d.balance);

  //  tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;

      return (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/90 backdrop-blur px-3 py-2 text-xs shadow-xl">
          <p className="text-zinc-400">{d.date}</p>

          <p className="text-green-400">Income +{formatINR(d.income)}</p>

          <p className="text-red-400">Expense -{formatINR(d.expense)}</p>

          <p className="text-white font-semibold mt-1">
            Balance {formatINR(d.balance)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-zinc-900/60 border border-zinc-800 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white text-sm">Balance Trend</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0 }}>
              {/* gradient */}
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />

              <XAxis
                dataKey="date"
                tick={{ fill: "#71717a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tickFormatter={formatYAxisINR}
                // tickFormatter={abbreviateINR}
                tick={{ fill: "#71717a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={60}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#6366f1", strokeOpacity: 0.3 }}
              />

              {/* area */}
              <Area
                type="monotone"
                dataKey="balance"
                stroke="none"
                fill="url(#trendGradient)"
              />

              {/* line */}
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceTrend;
