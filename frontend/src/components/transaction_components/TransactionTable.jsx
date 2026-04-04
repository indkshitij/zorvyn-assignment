import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import { Pencil, Trash2, SearchX, BarChart3 } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { categoryMap } from "@/lib/categories";
import { formatINR } from "@/lib/currency";

const TransactionTable = ({ transactions = [], onEdit, onDelete }) => {
  const { fetchTransactions, filters, setFilters, page, hasMore, loading } =
    useContext(AppContext);

  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  const observerRef = useRef(null);

  const [loadingMore, setLoadingMore] = useState(false);

  // empty state
  const isEmpty = useMemo(
    () => !transactions.length && !loading,
    [transactions, loading],
  );

  // clear filters
  const clearFilters = () => {
    const reset = {
      keyword: "",
      type: "all",
      category: "all",
      startDate: "",
      endDate: "",
      sortField: "date",
      sortDirection: "desc",
    };

    setFilters(reset);
    fetchTransactions(reset, 1, false);
  };
  // fetch on filter change
  useEffect(() => {
    if (!filters) return;
    fetchTransactions(filters, 1, false);
  }, [filters]);

  // infinite scroll
  useEffect(() => {
    if (!hasMore || loadingMore || loading) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          setLoadingMore(true);
          await fetchTransactions(filters, page + 1, true);
          setLoadingMore(false);
        }
      },
      { threshold: 1 },
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) {
        observer.unobserve(el);
        observer.disconnect();
      }
    };
  }, [page, hasMore, filters, loadingMore, loading]);

  const isFiltered =
    filters.keyword ||
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.startDate ||
    filters.endDate;

  // when transaction not found
  if (isEmpty) {
    return isFiltered ? (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
        <SearchX size={28} className="mb-3 opacity-60" />
        <p className="text-sm">No transactions found</p>

        <button
          onClick={clearFilters}
          className="mt-3 text-xs px-3 py-2 rounded-lg border border-zinc-700 hover:bg-white/5 transition cursor-pointer"
        >
          Clear Filters
        </button>
      </div>
    ) : (
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
    <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/60 backdrop-blur">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase">
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Note</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-right">Amount</th>
            {isAdmin && <th className="px-4 py-3 text-right">Actions</th>}
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-800">
          {transactions.map((tx) => {
            const color = categoryMap[tx.category?.toLowerCase()] || "#6b7280";

            return (
              <tr
                key={tx?._id || tx?.id}
                className="group hover:bg-white/5 transition"
              >
                <td className="px-4 py-3 text-zinc-400">
                  {tx.date
                    ? new Date(tx.date).toLocaleDateString("en-GB")
                    : "-"}
                </td>

                <td className="px-4 py-3 text-white font-medium">
                  {tx.note || "—"}
                </td>

                {/* category badge */}
                <td className="px-4 py-3">
                  <span
                    className="px-2.5 py-1 text-xs rounded-md font-medium inline-flex items-center gap-1"
                    style={{
                      backgroundColor: color + "20",
                      color: color,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {tx.category}
                  </span>
                </td>

                {/* type badge */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2.5 py-1 text-xs rounded-md font-medium capitalize inline-flex items-center gap-1
                    ${
                      tx.type === "income"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        tx.type === "income" ? "bg-green-400" : "bg-red-400"
                      }`}
                    />
                    {tx.type}
                  </span>
                </td>

                {/* amount */}
                <td
                  className={`px-4 py-3 text-right font-semibold ${
                    tx.type === "income" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"} {" "}{formatINR(tx.amount)}
                </td>

                {/* actions */}
                {isAdmin && (
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="flex justify-end gap-2 opacity-25 group-hover:opacity-100 transition ">
                      <Button
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={() => onEdit?.(tx)}
                      >
                        <Pencil size={14} />
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => onDelete?.(tx)}
                        className="hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* infinite scroll footer */}
      <div ref={observerRef} className="py-4 text-center text-zinc-500 text-xs">
        {loadingMore
          ? "Loading more..."
          : hasMore
            ? "Scroll to load more"
            : "No more transactions"}
      </div>
    </div>
  );
};

export default TransactionTable;
