import express from "express"; // importing express
import { signUp, signIn, getUserData } from "../controllers/auth.js"; // importing the auth controller functions
import validateJOI from "../middlewares/validateJOI.js"; // importing the JOI validation middleware
import { verifyToken } from "../middlewares/verifyToken.js"; // importing the token verification middleware
import { userSchema, signInSchema } from "../joi/schemas.js"; // importing the JOI schemas for validation

// creating an instance of express router
const router = express.Router();

// defining the routes for user authentication

// POST request to sign up a new user
// The validateJOI middleware validates the request body against the userSchema
// If the validation fails, it will return a 400 status code with the error message
router.post("/signup", validateJOI(userSchema), signUp);

// POST request to sign in an existing user
// The validateJOI middleware validates the request body against the signInSchema
// If the validation fails, it will return a 400 status code with the error message
router.post("/signin", validateJOI(signInSchema), signIn);

// GET request to get the current user's data
// The verifyToken middleware checks if the user is authenticated by verifying the JWT token
// If the token is valid, it will allow the request to proceed to the getUserData controller function
router.get("/me", verifyToken, getUserData);

// exporting the router to be used in other parts of the application
export default router;
