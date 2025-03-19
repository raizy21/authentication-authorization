import express from "express"; // import express for creating the server
import jwt from "jsonwebtoken"; // import jsonwebtoken for creating JWT tokens
import bcrypt from "bcryptjs"; // import bcryptjs for hashing passwords
import User from "../models/User.js"; // import User model for MongoDB operations

const router = express.Router(); // create a new router instance
const secret = process.env.JWT_SECRET; // secret key for JWT, should be stored in .env file

// SIGNUP route
router.post("/signup", async (req, res) => {
  try {
    // body should contain username, email, and password
    const { username, email, password } = req.body;

    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    // save the user to the database
    await newUser.save();

    // generate JWT token

    const token = jwt.sign({ userId: newUser._id }, secret, {
      expiresIn: "6d",
    });

    // send the token and user info in the response
    res.json({ token, user: { id: newUser._id, username, email } });
  } catch (err) {
    // handle errors, e.g., duplicate email or username
    res.status(500).json({ error: err.message });
  }
});

// SIGNIN route
router.post("/signin", async (req, res) => {
  try {
    // body should contain email and password
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    // check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // if user not found or password doesn't match
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // generate JWT token
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "6d" });

    // send the token and user info in the response
    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (err) {
    // handle errors, e.g., user not found or password mismatch
    res.status(500).json({ error: err.message });
  }
});

//export the router
export default router;
