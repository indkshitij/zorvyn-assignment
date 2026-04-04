import React from "react";
import { ArrowRight, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/currency";

const RecentTransaction = ({ transactions = [] }) => {
  const navigate = useNavigate();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-4 rounded-lg bg-zinc-800 border border-zinc-700 mb-4">
          <BarChart3 className="w-8 h-8 text-zinc-400" />
        </div>

        <h2 className="text-lg font-semibold text-white">
          No transactions yet
        </h2>

        <p className="text-sm text-zinc-500 mt-2 max-w-sm">
          Start adding transactions to track your finances and generate
          insights.
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/60 backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Recent Activity</h3>

        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/transactions")}
          className="text-xs text-zinc-400 hover:text-white hover:bg-transparent transition cursor-pointer flex items-center gap-1"
        >
          See all
          <ArrowRight size={14} />
        </Button>
      </div>

      {/* table header */}
      <div className="flex items-center justify-between px-3 pb-2 text-xs text-zinc-500 border-b border-zinc-800">
        <span className="w-[28%]">Note</span>
        <span className="hidden sm:block w-[18%] text-center">Category</span>
        <span className="hidden md:block w-[18%] text-center">Type</span>
        <span className="hidden md:block w-[18%] text-center">Date</span>
        <span className="w-[18%] text-right">Amount</span>
      </div>

      {/* rows */}
      <div className="space-y-3 mt-2">
        {recent.map((tx) => (
          <div
            key={tx._id}
            className="group flex items-center justify-between px-3 py-3 rounded-lg border border-zinc-800 bg-white/5 text-sm transition-all duration-200 hover:bg-white/10 hover:border-zinc-700"
          >
            {/* note */}
            <span className="w-[28%] text-white truncate">
              {tx.note || "No note"}
            </span>

            {/* category */}
            <span className="hidden sm:block w-[18%] text-center text-zinc-400">
              {tx.category}
            </span>

            {/* type */}
            <div className="hidden md:flex w-[18%] justify-center">
              <span
                className={`px-2 py-1 text-xs rounded-md capitalize ${
                  tx.type === "income"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {tx.type}
              </span>
            </div>

            {/* date */}
            <span className="hidden md:block w-[18%] text-center text-zinc-500">
              {new Date(tx.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })}
            </span>

            {/* amount */}
            <span
              className={`w-[18%] text-right font-medium ${
                tx.type === "income" ? "text-green-400" : "text-red-400"
              }`}
            >
              {tx.type === "income" ? "+" : "-"} {" "}{formatINR(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;
