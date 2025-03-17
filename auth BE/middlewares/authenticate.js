import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const authenticate = asyncHandler((req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  req.user = payload;

  next();
});

export default authenticate;
