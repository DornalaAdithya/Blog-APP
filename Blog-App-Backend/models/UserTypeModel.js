import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "User with the Email already exists"],
    },
    password: {
      type: String,
      minlength: [6, "password should be minimun of length 6"],
      required: [true, "password is required"],
    },
    profileImageUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ["AUTHOR", "USER", "ADMIN"], //any of these can be used
      // enum: {
      //   values: ["AUTHOR", "USER", "ADMIN"],
      //   message: "{VALUE} is an invalid role",
      // },
      required: [true, "Role is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
    versionKey: false,
  },
);

//create model
export const UserTypeModel = model("user", userSchema);
