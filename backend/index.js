import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect_db from "./config/db_connection.js";
import userRoutes from "./routes/user_routes.js";
import authRoutes from "./routes/auth_routes.js";
import transactionRoutes from "./routes/transaction_routes.js";
import path from "path";
const __dirname = path.resolve();

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

app.get("/trial", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

// apis
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// global err handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

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