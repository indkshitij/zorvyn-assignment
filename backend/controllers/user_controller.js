import User from "../models/user_model.js";
import bcrypt from "bcryptjs";

// Create User
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // pswd check
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // exist ?
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // hashing pswd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isActive: true
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userObj,
    });
  } catch (error) {
    console.error("Create User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Users 
export const getUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      role,
      isActive,
      search,
    } = req.query;

    const query = {};

    // filter role
    if (role) {
      query.role = role;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    const skip = (Number(page) - 1) * Number(limit);

    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
      data: users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// switch role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.user;
    const { role } = req.body;

    const allowedRoles = ["admin", "analyst", "viewer"];

    if (!role || !allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role provided",
      });
    }

    // update own role
    if (req.user._id.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: "You can only change your own role",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: userObj,
    });
  } catch (error) {
    console.error("Update Role Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.user;
    const { isActive } = req.body;

    // Validate input
    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActive = isActive;
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: `Your account has been ${isActive ? "activated" : "deactivated"
        }`,
      data: userObj,
    });
  } catch (error) {
    console.error("Update Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get User By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// delete Account
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Your account has been deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};