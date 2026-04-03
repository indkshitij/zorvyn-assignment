import Transaction from "../models/transaction_model.js";

// create
export const createTransaction = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;

    if (!amount || !type || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction type",
      });
    }


    const transaction = await Transaction.create({
      user: req.user.id,
      amount,
      type,
      category,
      date,
      note,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created",
      data: transaction,
    });
  } catch (error) {
    console.error("Create Transaction Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get transcation
export const getTransactions = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      type,
      category,
      startDate,
      endDate,
      keyword,
      sortField = "date",
      sortDirection = "desc",
    } = req.query;

    // convert to numbers (IMPORTANT)
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const query = {
      user: req.user._id,
    };

    // type filter
    if (type && type !== "all") {
      query.type = type.toLowerCase();
    }

    // category filter
    if (category && category !== "all") {
      query.category = category;
    }

    // date filter 
    if (startDate || endDate) {
      query.date = {};

      if (startDate) {
        query.date.$gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // include full day
        query.date.$lte = end;
      }
    }

    // keyword search
    if (keyword) {
      query.$or = [
        { note: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ];
    }

    // sorting
    const allowedSortFields = ["date", "amount", "category", "type"];

    const safeSortField = allowedSortFields.includes(sortField)
      ? sortField
      : "date";

    const sort = {
      [safeSortField]: sortDirection === "asc" ? 1 : -1,
    };

    // pagination logic
    const skip = (pageNum - 1) * limitNum;

    // fetch data (OPTIMIZED)
    const transactions = await Transaction.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // total count
    const total = await Transaction.countDocuments(query);

    // infinite scroll helper
    const hasMore = pageNum * limitNum < total;

    // response
    res.status(200).json({
      success: true,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasMore,
      },
      data: transactions,
    });
  } catch (error) {
    console.error("Get Transactions Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const { amount, type, category, date, note } = req.body;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own transactions",
      });
    }

    if (amount !== undefined && amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    if (type && !["income", "expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type",
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        amount,
        type,
        category,
        date,
        note,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });

  } catch (error) {
    console.error("Update Transaction Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own transactions",
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });

  } catch (error) {
    console.error("Delete Transaction Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// dashboard summary
export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // stats
    const stats = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;
    let totalTransactions = 0;

    stats.forEach((item) => {
      totalTransactions += item.count;
      if (item._id === "income") totalIncome = item.total;
      if (item._id === "expense") totalExpense = item.total;
    });

    const netBalance = totalIncome - totalExpense;

    // category breakdown
    const categoryStats = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: {
            category: "$category",
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id.category",
          type: "$_id.type",
          total: 1,
        },
      },
    ]);

    // last 31 days trend
    const today = new Date();
    const last31Days = new Date();
    last31Days.setDate(today.getDate() - 30);

    const rawDailyStats = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: last31Days },
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$date" },
            },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          income: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "income"] }, "$total", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "expense"] }, "$total", 0],
            },
          },
        },
      },
    ]);

    // fill missing data
    const map = new Map();

    rawDailyStats.forEach((item) => {
      map.set(item._id, item);
    });

    const dailyBreakdown = [];

    for (let i = 0; i < 31; i++) {
      const d = new Date();
      d.setDate(today.getDate() - (30 - i));

      const key = d.toISOString().slice(0, 10);

      if (map.has(key)) {
        dailyBreakdown.push({
          _id: key,
          income: map.get(key).income,
          expense: map.get(key).expense,
        });
      } else {

        dailyBreakdown.push({
          _id: key,
          income: 0,
          expense: 0,
        });
      }
    }

    // RECENT TRANSACTIONS
    const recentTransactions = await Transaction.find({ user: userId })
      .select("-__v")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        netBalance,
        totalTransactions,
        categoryBreakdown: categoryStats,
        recentTransactions,
        dailyBreakdown,
      },
    });

  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get insights
export const getInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ user: userId }).lean();

    if (!transactions.length) {
      return res.status(200).json({
        success: true,
        data: null,
      });
    }

    let totalIncome = 0;
    let totalExpense = 0;

    const categoryMap = {};
    const monthlyMap = {};

    transactions.forEach((tx) => {
      const { amount, type, category, date } = tx;

      // income / expense totals
      if (type === "income") totalIncome += amount;
      else totalExpense += amount;

      // category aggregation
      if (!categoryMap[category]) {
        categoryMap[category] = {
          total: 0,
          count: 0,
        };
      }

      if (type === "expense") {
        categoryMap[category].total += amount;
      }

      categoryMap[category].count += 1;

      // monthly grouping
      const month = new Date(date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!monthlyMap[month]) {
        monthlyMap[month] = { income: 0, expense: 0 };
      }

      monthlyMap[month][type] += amount;
    });

    // top spending category
    const topCategory = Object.entries(categoryMap).reduce(
      (max, [cat, val]) =>
        val.total > max.total ? { name: cat, ...val } : max,
      { total: 0 }
    );

    // most transactions category
    const mostTransactions = Object.entries(categoryMap).reduce(
      (max, [cat, val]) =>
        val.count > max.count ? { name: cat, ...val } : max,
      { count: 0 }
    );

    // avg monthly spend
    const months = Object.keys(monthlyMap).length || 1;
    const avgMonthlySpend = totalExpense / months;

    // savings rate
    const savingsRate =
      totalIncome > 0
        ? ((totalIncome - totalExpense) / totalIncome) * 100
        : 0;

    // category breakdown
    const totalExpenseOnly = totalExpense;

    const categoryBreakdown = Object.entries(categoryMap).map(
      ([cat, val]) => ({
        category: cat,
        amount: val.total,
        count: val.count,
        percentage:
          totalExpenseOnly > 0
            ? (val.total / totalExpenseOnly) * 100
            : 0,
      })
    );

    // sort breakdown
    categoryBreakdown.sort((a, b) => b.amount - a.amount);

    // monthly chart data
    const chartData = Object.entries(monthlyMap).map(
      ([month, val]) => ({
        month,
        income: val.income,
        expense: val.expense,
      })
    );

    res.status(200).json({
      success: true,
      data: {
        summary: {
          topCategory,
          mostTransactions,
          avgMonthlySpend,
          savingsRate,
        },
        chart: chartData,
        breakdown: categoryBreakdown,
      },
    });
  } catch (error) {
    console.error("Insights Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};