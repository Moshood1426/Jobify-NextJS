import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    minlength: [3, "Name cannot be less than 3 characters"],
    maxlength: [20, "Name cannot be more than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password cannot be less than 6 characters"],
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [20, "Last name cannot be more than 20 characters"],
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxlength: [20, "Last name cannot be more than 20 characters"],
    default: "my city",
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (currentPassword) {
  const isPassword = await bcrypt.compare(currentPassword, this.password);
  return isPassword;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

export default mongoose.model("User", UserSchema);
