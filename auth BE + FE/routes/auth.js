import express from "express";
import { register, login, profile } from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", authenticate, profile);

authRouter.get(
  "/adminProtectedRoute",
  authenticate,
  authorize("admin"),
  (req, res) => {
    res.status(200).json("Admin Protected Route");
  }
);

export default authRouter;
