import { UserTypeModel } from "../models/UserTypeModel.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

//register function
export const register = async (userObj) => {
  if (!userObj.password) {
    const err = new Error("Password required");
    err.status = 400;
    throw err;
  }
  //create document
  const userDocument = new UserTypeModel(userObj);
  //validate for empty password
  await userDocument.validate(); //validate the password
  //hash and replace the plain password
  const hashedPassword = await hash(userObj.password, 10);
  //save
  userDocument.password = hashedPassword;
  const created = await userDocument.save();
  //convert document to object to remove password (using .toObject)
  const newUserObj = created.toObject();
  //remove password
  delete newUserObj.password;
  //return user obj without password
  return newUserObj;
};

//authenticate function -- Login
export const authenticate = async ({ email, password }) => {
  //check user with email & role
  const user = await UserTypeModel.findOne({ email });
  if (!user) {
    const err = new Error("Invalid email");
    err.status = 401;
    throw err;
  }
  if (!password) {
    const err = new Error("Password required");
    err.status = 400;
    throw err;
  }
  //compare passwords
  const isMatch = await compare(password, user?.password);
  if (!isMatch) {
    const err = new Error("Invalid password");
    err.status = 401;
    throw err;
  }

  //if user valid ,but blocked by admin
  if (!user?.isActive) {
    const err = new Error("User Is Blocked By Admin");
    err.status = 403;
    throw err;
  }

  //generate token
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
  );
  console.log("token created : ", token);
  const userObj = user.toObject();
  delete userObj.password;
  return { token, user: userObj };
};
