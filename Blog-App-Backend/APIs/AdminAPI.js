import exp from "express";
import { UserTypeModel } from "../models/UserTypeModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const adminRoute = exp.Router();

//Read All Articles (optional)

//Block User
adminRoute.put("/users/block", verifyToken, async (req, res) => {
  //get the user id from body
  let userId = req.body.user;
  let adminId = req.body.admin;
  //   console.log(uId);
  let admin = await UserTypeModel.findById(adminId);
  if (!admin) {
    return res.status(401).json({ message: "admin not found with the ID" });
  }
  if (admin.role !== "ADMIN") {
    return res.status(401).json({ message: "Restricted" });
  }
  let user = await UserTypeModel.findById(userId);
  if (!user) {
    return res.status(401).json({ message: "user not found with the ID" });
  }
  let modifiedUser = await UserTypeModel.findByIdAndUpdate(userId, {
    isActive: false,
  });
  res.status(200).json({ message: "user blocked" });
});

//Unblock User
adminRoute.put("/users/unblock", verifyToken, async (req, res) => {
  //get the user id from body
  let userId = req.body.user;
  let adminId = req.body.admin;
  //   console.log(uId);
  let admin = await UserTypeModel.findById(adminId);
  if (!admin) {
    return res.status(401).json({ message: "admin not found with the ID" });
  }
  if (admin.role !== "ADMIN") {
    return res.status(401).json({ message: "Restricted" });
  }
  let user = await UserTypeModel.findById(userId);
  if (!user) {
    return res.status(401).json({ message: "user not found with the ID" });
  }
  let modifiedUser = await UserTypeModel.findByIdAndUpdate(userId, {
    isActive: true,
  });
  res.status(200).json({ message: "user un-blocked" });
});
