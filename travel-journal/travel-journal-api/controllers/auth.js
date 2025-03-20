import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation
import User from "../models/User.js"; // Import User model to interact with the 'users' collection in the MongoDB database
import { signInSchema } from "../joi/schemas.js"; // Import Joi schema for validating sign-in data

// Check if the environment is production or development
// This is used to set cookie options for secure cookies in production
// and to allow cookies in development mode
const isProduction = process.env.NODE_ENV === "production";

// Define cookie options for the JWT token
const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "None" : "Lax",
  secure: isProduction,
};

// Function to handle user sign-up
export const signUp = async (req, res) => {
  try {
    console.log("received signup request:", req.body);
    //  validate the request body using Joi schema
    const { firstName, lastName, email, password } = req.body;

    // empty check for required fields
    if (!firstName || !lastName || !email || !password) {
      console.error("missing required fields:", req.body);
      // return a 400 status code with an error message
      return res.status(400).json({
        error: "Firstname, lastname, email, and password are required",
      });
    }

    // findOne method to check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    // If the email already exists, return a 400 status code with an error message
    if (existingUser) {
      // Log the error message to the console
      console.error(" Email already exists:", email);
      // return a 400 status code with an error message
      return res.status(400).json({ error: "Email already exists" });
    }

    // console log the hashing password message
    console.log("hashing password...");
    // Hash the password using bcrypt with a salt rounds of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // console log the saving new user message
    console.log("saving new user to database...");
    // Create a new user object using the User model and the request body data
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    // Save the new user object to the database using the save method
    await newUser.save();

    // Log the success message to the console
    console.log("user created successfully:", newUser);

    // Generate a JWT token using the user ID and the secret key from the environment variables
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set the token in a cookie with the defined options
    res.cookie("token", token, { httpOnly: true });
    // Return a 201 status code with a success message
    res.status(201).json({ success: "User created" });
  } catch (error) {
    // Log the error message to the console
    console.error(" Signup error:", error);
    // return a 500 status code with an error message
    res.status(500).json({ error: "Server error" });
  }
};

// Function to handle user sign-in
export const signIn = async (req, res) => {
  try {
    // signIn function to handle user sign-in requests
    console.log("Received sign-in request:", req.body);

    // validate request body using Joi schema
    const { error } = signInSchema.validate(req.body);
    if (error) {
      // valdation error handling
      console.error("Validation Error:", error.details[0].message);
      // return a 400 status code with an error message
      return res.status(400).json({ error: error.details[0].message });
    }

    // destructure email and password from the request body
    const { email, password } = req.body;

    // check if email and password are provided
    console.log("Checking if user exists...");
    // findOne method to check if the email exists in the database
    const user = await User.findOne({ email }).select("+password");
    // If the email does not exist, return a 401 status code with an error message
    if (!user) {
      // Log the error message to the console
      console.error(" User not found:", email);
      // return a 401 status code with an error message
      return res.status(404).json({ error: "User not found" });
    }

    // log the comparing password message
    console.log("comparing passwords...");
    // compare the provided password with the hashed password in the database using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // log the error message to the console
      console.error(" Invalid password for:", email);
      // return a 401 status code with an error message
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // log the password matched message
    console.log("password matched! Signing in user...");

    // Generate a JWT token using the user ID and the secret key from the environment variables
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set the token in a cookie with the defined options
    res.cookie("token", token, { httpOnly: true });
    // Log the success message to the console
    res.status(200).json({ success: "signed in successfully" });
  } catch (error) {
    // handle any errors that occur during the sign-in process
    console.error("sign-in error:", error); // Log full error in the console
    // return a 500 status code with an error message
    res.status(500).json({ error: "Server error" });
  }
};

// Function to get the current user's data
export const getUserData = async (req, res) => {
  try {
    // Check if the user ID is present in the request object
    const user = await User.findById(req.userId).select("-password");
    // If the user ID is not present, return a 404 status code with an error message
    if (!user) return res.status(404).json({ error: "User not found" });

    // Return a 200 status code with the user data, excluding the password field
    res.status(200).json(user);
  } catch (error) {
    // Handle any errors that occur while fetching the user data
    res.status(500).json({ error: "Server error" });
  }
};
