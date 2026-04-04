import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeader } from "@/lib/GetHeader";
import { showToast } from "@/lib/toast";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [dashboardData, setDashboardData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [insightData, setInsightData] = useState(null);
  
  // filters
  const [filters, setFilters] = useState({
    keyword: "",
    type: "all",
    category: "all",
    startDate: "",
    endDate: "",
    sortField: "date",
    sortDirection: "desc",
  });

  // dashboard
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${baseUrl}/transactions/dashboard`,
        getAuthHeader(),
      );

      setDashboardData(res.data.data);
    } catch (error) {
      showToast(error.response?.data || error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // transactions
  const fetchTransactions = async (
    customFilters = filters,
    pageNumber = 1,
    append = false,
  ) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      // pagination
      params.append("page", pageNumber);
      params.append("limit", 10);

      if (customFilters.type && customFilters.type !== "all") {
        params.append("type", customFilters.type.toLowerCase());
      }

      if (customFilters.category && customFilters.category !== "all") {
        params.append("category", customFilters.category);
      }

      if (customFilters.startDate) {
        params.append("startDate", customFilters.startDate);
      }

      if (customFilters.endDate) {
        params.append("endDate", customFilters.endDate);
      }

      if (customFilters.keyword) {
        params.append("keyword", customFilters.keyword);
      }

      params.append("sortField", customFilters.sortField || "date");

      params.append("sortDirection", customFilters.sortDirection || "desc");

      const res = await axios.get(
        `${baseUrl}/transactions/all-transactions?${params.toString()}`,
        getAuthHeader(),
      );

      const newData = res.data.data;

      if (append) {
        setTransactions((prev) => [...prev, ...newData]);
      } else {
        setTransactions((prev) => (pageNumber === 1 ? newData : prev));
      }

      setHasMore(res.data.meta.hasMore);

      setPage(pageNumber);
    } catch (error) {
      console.error(error.response?.data || error.message);
      showToast("Failed to fetch transactions", "error");
    } finally {
      setLoading(false);
    }
  };

  // insights
  const fetchInsights = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${baseUrl}/transactions/insights`,
        getAuthHeader(),
      );

      setInsightData(res.data.data);
    } catch (error) {
      showToast(error.response?.data || error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // delete
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(
        `${baseUrl}/transactions/delete/${id}`,
        getAuthHeader(),
      );

      // reload from page 1
      fetchTransactions(filters, 1, false);

      showToast("Transaction deleted", "success");
    } catch (error) {
      showToast(error.response?.data || error.message, "error");
    }
  };

  // get user by id
  const getUserById = async (id) => {
    try {
      const res = await axios.get(
        `${baseUrl}/users/user/${id}`,
        getAuthHeader(),
      );

      return res.data.data;
    } catch (error) {
      showToast("Failed to fetch user", "error");
      return null;
    }
  };

  return (
    <AppContext.Provider
      value={{
        baseUrl,
        dashboardData,
        transactions,
        loading,
        fetchDashboardData,
        fetchTransactions,
        deleteTransaction,
        filters,
        setFilters,
        page,
        setPage,
        hasMore,
        getUserById,
        insightData,
        setInsightData,
        fetchInsights,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
