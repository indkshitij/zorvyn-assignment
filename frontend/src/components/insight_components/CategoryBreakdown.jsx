import React from "react";
import { formatINR } from "@/lib/currency";
import categories from "@/lib/categories";

const CategoryBreakdown = ({ insight }) => {
  const data = insight?.breakdown || [];

  const categoryMap = categories.reduce((acc, item) => {
    acc[item.name.toLowerCase()] = item.bgColor;
    return acc;
  }, {});

  if (!data.length) {
    return (
      <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/60 text-center text-zinc-400">
        No expense data to display
      </div>
    );
  }

  return (
    <div className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/60 backdrop-blur">
      {/* title */}
      <h3 className="text-sm font-semibold text-white mb-4">
        Category Breakdown
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* header */}
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase">
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-right">Amount Spent</th>
              <th className="py-3 px-4 text-right">Percentage</th>
              <th className="py-3 px-4 text-right">Transactions</th>
              <th className="py-3 px-4 text-left min-w-[120px]">
                Distribution
              </th>
            </tr>
          </thead>

          {/* body */}
          <tbody className="divide-y divide-zinc-800">
            {data.map((item) => {
              const pct = item.percentage || 0;

              return (
                <tr key={item.category} className="hover:bg-white/5 transition">
                  {/* category */}
                  <td className="py-3 px-4 text-white font-medium capitalize">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            categoryMap[item.category.toLowerCase()] ||
                            "#6b7280",
                        }}
                      />
                      {item.category}
                    </div>
                  </td>

                  {/* amount */}
                  <td className="py-3 px-4 text-right text-zinc-300 font-medium">
                    {formatINR(item.amount)}
                  </td>

                  {/* percentage */}
                  <td className="py-3 px-4 text-right text-zinc-400">
                    {pct.toFixed(1)}%
                  </td>

                  {/* count */}
                  <td className="py-3 px-4 text-right text-zinc-400">
                    {item.count}
                  </td>

                  {/* progress bar */}
                  <td className="py-3 px-4">
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 bg-white"
                        style={{
                          width: `${Math.min(pct, 100)}%`,
                          backgroundColor:
                            categoryMap[item.category.toLowerCase()] ||
                            "#6b7280",
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryBreakdown;
