import express from "express";
import { createUser, getUsers, updateUserRole, updateStatus,getUserById,deleteAccount } from "../controllers/user_controller.js";
import { protect } from "../middlewares/auth_middleware.js";
import { authorizeRoles } from "../middlewares/role_middleware.js";
const router = express.Router();

router.post("/create", createUser);
router.get("/all-users", protect, getUsers);
router.put("/update-role", protect, updateUserRole);
router.put("/update-status", protect, authorizeRoles("admin"), updateStatus);
router.get("/user/:id", protect, getUserById);
router.delete("/delete-my-account", protect, authorizeRoles("admin"),deleteAccount);

export default router;