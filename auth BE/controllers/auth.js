import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const register = asyncHandler(async (req, res) => {
  const {
    body: { email, password, role = "user" },
  } = req;

  const user = await User.findOne({ email });
  if (user) throw new ErrorResponse("User already exists", 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashedPassword, role });

  const payload = { id: newUser._id, email: newUser.email, role: newUser.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });

  res.status(201).json(token);
});

export const login = asyncHandler(async (req, res) => {
  const {
    body: { email, password },
  } = req;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ErrorResponse("Invalid credentials", 400);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new ErrorResponse("Invalid credentials", 400);

  const payload = { id: user._id, email: user.email, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });

  res.status(201).json(token);
});

export const profile = asyncHandler(async (req, res) => {
  const {
    user: { id },
  } = req;

  const user = await User.findById(id);
  res.status(200).json(user);
});
