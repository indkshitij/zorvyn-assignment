import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connect_db from "./src/config/db_connection.js";
import userRoutes from "./src/routes/user_routes.js";
import authRoutes from "./src/routes/auth_routes.js";
import transactionRoutes from "./src/routes/transaction_routes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*", 
  credentials: true,
}));

app.use(express.json()); 

// trial
app.get("/trial", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

// APIs
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// global err handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

// start only after DB connects
const startServer = async () => {
  try {
    await connect_db();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();