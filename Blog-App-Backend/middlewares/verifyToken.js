import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { UserTypeModel } from "../models/UserTypeModel.js";

config();

export const verifyToken = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      console.log("entered verify token")
      //read token from req
      let token = req.cookies.token;
      // console.log("token : ", token);
      if (token === undefined) {
        return res.status(401).json({ message: "Unauthorized Req. Please Login" });
      }

      //verify the validity of the token(decoding the token)
      let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      // console.log("decoded token",decodedToken);
      //check if role is allowed
      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({ message: "Forbidden. You don't have Permission" });
      }

      // console.log(decodedToken);

      //check if user still active(not blocked by the admin)
      const user = await UserTypeModel.findById(decodedToken.userId);
      console.log(user);
      if (!user || !user.isActive) {
        return res.status(403).json({ message: "User account is blocked" });
      }

      //Attach user info to req for use in routes
      req.user = decodedToken;
      // console.log(`req.user : ${req.user}`);

      //forward request to next middleware/route
      next();
    } catch (error) {
      //jwt.verify throws error if token is invalid/expired
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Session expired. please login" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token. please login" });
      }
      //next(err);
    }
  };
};
