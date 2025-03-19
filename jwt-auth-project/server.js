import express from "express"; // import express for creating the server
import mongoose from "mongoose"; // import mongoose for MongoDB connection
import dotenv from "dotenv"; // import dotenv for environment variables
import cors from "cors"; // import cors for handling CORS issues
import authRoutes from "./routes/auth.js"; // import authentication routes
import protectedRoutes from "./routes/protected.js"; // import protected routes

dotenv.config(); // load environment variables

const app = express(); // create an instance of express

// middleware for CORS (to allow frontend requests)
app.use(cors());

// middleware to parse JSON request body
app.use(express.json());

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" mongoDB Connected"))
  .catch((err) => console.log("mongoDB Connection Error:", err));

// debug log to check the MongoDB connection string
console.log("JWT Secret Key:", process.env.JWT_SECRET);

// routes
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` server running on port ${PORT}`));
