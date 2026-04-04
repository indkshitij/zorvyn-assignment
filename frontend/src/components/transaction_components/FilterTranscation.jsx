import React, { useState, useEffect, useContext } from "react";
import { Search, X } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import categories from "@/lib/categories";

// debounce hook
const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

const FilterTransaction = () => {
  const { filters, setFilters, fetchTransactions } = useContext(AppContext);

  const [local, setLocal] = useState(filters);

  // debounce search
  const debouncedKeyword = useDebounce(local.keyword);

  const handleChange = (key, value) => {
    setLocal((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearAll = () => {
    const reset = {
      keyword: "",
      type: "all",
      category: "all",
      startDate: "",
      endDate: "",
      sortField: "date",
      sortDirection: "desc",
    };

    setLocal(reset);
    setFilters(reset);

    fetchTransactions(reset, 1, false);
  };
  const hasActive =
    local.keyword ||
    local.type !== "all" ||
    local.category !== "all" ||
    local.startDate ||
    local.endDate ||
    local.sortField !== "date" ||
    local.sortDirection !== "desc";

  // auto apply filters
  useEffect(() => {
    const finalFilters = {
      ...local,
      keyword: debouncedKeyword,
    };

    setFilters(finalFilters);
  }, [
    debouncedKeyword,
    local.type,
    local.category,
    local.startDate,
    local.endDate,
    local.sortField,
    local.sortDirection,
  ]);

  useEffect(() => {
    setLocal(filters);
  }, [filters]);

  return (
    <div className=" z-20">
      <div className="flex flex-wrap items-center gap-3">
        {/*  Search */}
        <div className="relative flex-1 min-w-[200px] cursor-pointer">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={16}
          />
          <input
            value={local.keyword}
            onChange={(e) => handleChange("keyword", e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-zinc-800 border border-zinc-700 text-white"
          />
        </div>

        {/* Type */}
        <div className="flex rounded-lg border border-zinc-800 overflow-hidden ">
          {["all", "income", "expense"].map((type) => (
            <button
              key={type}
              onClick={() => handleChange("type", type)}
              className={`px-3 py-2 text-xs capitalize transition cursor-pointer ${
                local.type === type
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:bg-white/5"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Category */}
        <select
          value={local.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="px-3 py-2 text-xs rounded-lg bg-zinc-800 border border-zinc-700 text-white cursor-pointer"
        >
          <option value="all">All Categories</option>

          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Dates */}
        <input
          type="date"
          value={local.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          className="px-2 py-2 text-xs rounded-lg bg-zinc-800 border border-zinc-700 text-white cursor-pointer"
        />
        <div className="text-zinc-400 -mx-1">-</div>
        <input
          type="date"
          value={local.endDate}
          onChange={(e) => handleChange("endDate", e.target.value)}
          className="px-2 py-2 text-xs rounded-lg bg-zinc-800 border border-zinc-700 text-white cursor-pointer"
        />

        {/* Sort */}
        <select
          value={local.sortField}
          onChange={(e) => handleChange("sortField", e.target.value)}
          className="px-3 py-2 text-xs rounded-lg bg-zinc-800 border border-zinc-700 text-white cursor-pointer"
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>

        {/* sort */}
        <button
          onClick={() =>
            handleChange(
              "sortDirection",
              local.sortDirection === "asc" ? "desc" : "asc",
            )
          }
          className="px-3 py-2 text-xs rounded-lg bg-zinc-800 border border-zinc-700 text-white cursor-pointer"
        >
          {local.sortDirection === "asc" ? "↑ Asc" : "↓ Desc"}
        </button>

        {/* Clear */}
        {hasActive && (
          <button
            onClick={clearAll}
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterTransaction;
