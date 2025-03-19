import express from "express"; // import express for creating the server
import { verifyToken } from "../middleware/auth.js"; // import verifyToken middleware for token verification

const router = express.Router(); // create a new router instance

// protected route - User must be authenticated to access
router.get("/me", verifyToken, (req, res) => {
  // this route is protected and requires a valid token
  res.json({ message: "Protected route accessed!", userId: req.user.userId });
});

//export the router
export default router;
