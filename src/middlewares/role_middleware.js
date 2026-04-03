export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No user found",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied: insufficient permissions",
        });
      }

      next();

    } catch (error) {
      console.error("Role Middleware Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};