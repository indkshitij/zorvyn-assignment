import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getAuthHeader } from "@/lib/GetHeader";
import { showToast } from "@/lib/toast";
import { AppContext } from "@/context/AppContext";
import { PencilLine, PlusCircle } from "lucide-react";

import categories from "@/lib/categories";
import { Button } from "@/components/ui/button";

const EditAndCreateTransactionDialog = ({
  open,
  onClose,
  editingTransaction,
  onSuccess,
}) => {
  const { baseUrl, fetchTransactions, fetchInsights, fetchDashboardData } =
    useContext(AppContext);

  const isEditMode = !!editingTransaction;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    note: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().slice(0, 10),
  });

  const [errors, setErrors] = useState({});

  // populate form
  useEffect(() => {
    if (!open) return;

    if (editingTransaction) {
      setForm({
        note: editingTransaction.note || "",
        amount: editingTransaction.amount || "",
        type: editingTransaction.type || "expense",
        category: editingTransaction.category || "Food",
        date: editingTransaction.date?.slice(0, 10),
      });
    } else {
      resetForm();
    }
  }, [editingTransaction, open]);

  const resetForm = () => {
    setForm({
      note: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: new Date().toISOString().slice(0, 10),
    });
    setErrors({});
  };

  const validate = () => {
    const err = {};

    if (!form.note.trim()) err.note = "Note is required";
    if (!form.amount || Number(form.amount) <= 0)
      err.amount = "Amount must be greater than 0";
    if (!form.date) err.date = "Date is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || loading) return;

    try {
      setLoading(true);

      const payload = {
        note: form.note.trim(),
        amount: Number(form.amount),
        type: form.type,
        category: form.category,
        date: form.date,
      };

      if (isEditMode) {
        await axios.put(
          `${baseUrl}/transactions/update/${editingTransaction._id}`,
          payload,
          getAuthHeader(),
        );
        showToast("Transaction updated", "success");
      } else {
        await axios.post(
          `${baseUrl}/transactions/create`,
          payload,
          getAuthHeader(),
        );
        showToast("Transaction created", "success");
      }

      if (location.pathname === "/dashboard") {
        fetchDashboardData();
      } else if (location.pathname === "/dashboard/transactions") {
        fetchTransactions();
      } else if (location.pathname === "/dashboard/insights") {
        fetchInsights();
        fetchDashboardData();
      }

      onSuccess?.();
      onClose?.();
      resetForm();
    } catch (error) {
      showToast(error.response?.data || error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose?.();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[92%] max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in-95"
      >
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-lg border backdrop-blur transition-all duration-300
    ${
      isEditMode
        ? "bg-amber-500/10 border-amber-500/20"
        : "bg-emerald-500/10 border-emerald-500/20"
    }
  `}
          >
            {isEditMode ? (
              <PencilLine className="text-amber-400" size={18} />
            ) : (
              <PlusCircle className="text-emerald-400" size={18} />
            )}
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              {isEditMode ? "Edit Transaction" : "Add Transaction"}
            </h3>
            <p className="text-xs text-zinc-500">
              {isEditMode
                ? "Update your transaction details"
                : "Add a new transaction to your records"}
            </p>
          </div>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* note */}
          <div>
            <label className="text-xs text-zinc-400">Note</label>
            <input
              type="text"
              value={form.note}
              disabled={loading}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:ring-1 focus:ring-white/20"
              placeholder="Enter note"
            />
            {errors.note && (
              <p className="text-xs text-red-400 mt-1">{errors.note}</p>
            )}
          </div>

          {/* amount */}
          <div>
            <label className="text-xs text-zinc-400">Amount (₹)</label>
            <input
              type="number"
              value={form.amount}
              disabled={loading}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm"
            />
            {errors.amount && (
              <p className="text-xs text-red-400 mt-1">{errors.amount}</p>
            )}
          </div>

          {/* type */}
          <div>
            <label className="text-xs text-zinc-400">Type</label>
            <div className="flex gap-2 mt-1">
              {["income", "expense"].map((t) => (
                <button
                  key={t}
                  type="button"
                  disabled={loading}
                  onClick={() => setForm({ ...form, type: t })}
                  className={`flex-1 py-2 rounded-lg text-sm capitalize transition cursor-pointer ${
                    form.type === t
                      ? t === "income"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* category */}
          <div>
            <label className="text-xs text-zinc-400">Category</label>
            <select
              value={form.category}
              disabled={loading}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* date */}
          <div>
            <label className="text-xs text-zinc-400">Date</label>
            <input
              type="date"
              value={form.date}
              max={new Date().toISOString().split("T")[0]}
              disabled={loading}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="mt-1 w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm"
            />
            {errors.date && (
              <p className="text-xs text-red-400 mt-1">{errors.date}</p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="mt-5 flex justify-end gap-3">
            <Button
              type="button"
              disabled={loading}
              onClick={onClose}
              variant="outline"
              className={
                "cursor-pointer px-10 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition disabled:opacity-50 cursor-pointer border-none"
              }
              // size="lg"
            >
              {" "}
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              variant="secondary"
              className={"cursor-pointer px-10"}
              // size="lg"
            >
              {" "}
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isEditMode ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAndCreateTransactionDialog;
