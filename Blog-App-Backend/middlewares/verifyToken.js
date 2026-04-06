import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { UserTypeModel } from "../models/UserTypeModel.js";

config();

export const verifyToken = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // 1. Get token from cookies
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({
          message: "Unauthorized. Please login",
        });
      }

      // 2. Verify token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      // 3. Role check (ONLY if roles are provided)
      if (allowedRoles.length > 0 && !allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({
          message: "Forbidden. You don't have permission",
        });
      }

      // 4. Check if user still exists & active
      const user = await UserTypeModel.findById(decodedToken.userId);

      if (!user || !user.isActive) {
        return res.status(403).json({
          message: "User account is blocked or not found",
        });
      }

      // 5. Attach user to request
      req.user = decodedToken;

      // 6. Continue
      next();
    } catch (error) {
      // Token expired
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Session expired. Please login again",
        });
      }

      // Invalid token
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Invalid token. Please login",
        });
      }

      // Any other error
      console.error("verifyToken error:", error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  };
};
