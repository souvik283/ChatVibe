import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: [true, "Email already exsits"],
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password should contain more then 6 charecter"],
      select: false,
    },
    profileImg: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
