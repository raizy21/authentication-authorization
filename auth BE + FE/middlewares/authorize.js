import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const authorize = (role) => {
  return asyncHandler((req, res, next) => {
    if (req.user.role !== role) throw new ErrorResponse("Unauthorized", 401);
    next();
  });
};

export default authorize;
