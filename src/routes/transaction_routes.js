import express from "express";
import { createTransaction, getTransactions, getDashboard, updateTransaction, deleteTransaction,getInsights } from "../controllers/transaction_controller.js";
import { protect } from "../middlewares/auth_middleware.js";
import { authorizeRoles } from "../middlewares/role_middleware.js";

const router = express.Router();

router.post("/create", protect, authorizeRoles("admin"), createTransaction);
router.get("/all-transactions", protect, authorizeRoles("viewer", "admin", "analyst"), getTransactions);
router.get("/dashboard", protect, authorizeRoles("viewer","admin", "analyst"), getDashboard);
router.put("/update/:id", protect, authorizeRoles("admin"), updateTransaction);
router.delete("/delete/:id", protect, authorizeRoles("admin"), deleteTransaction);
router.get("/insights", protect, authorizeRoles("admin", "analyst"), getInsights);
export default router;