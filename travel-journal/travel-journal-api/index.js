import "./db/index.js"; // import the database connection
import express from "express"; // import express framework
import cors from "cors"; // import cors for cross-origin resource sharing
import postsRouter from "./routes/postsRouter.js"; // import posts router
import authRouter from "./routes/authRouter.js"; // import auth router
import errorHandler from "./middlewares/errorHandler.js"; // import error handler middleware
import cookieParser from "cookie-parser"; // import cookie parser middleware


// initialize the express application
const app = express();
const port = process.env.PORT || 8000; // set the port to 8000 or the port from environment variables



app.use(cors({ origin: "*" })); // enable CORS for all origins
app.use(express.json()); // parse JSON request body
app.use(cookieParser());// parse cookies from request headers
app.use("/auth", authRouter); // use auth router for /auth endpoint
app.use("/posts", postsRouter); // use posts router for /posts endpoint
app.use("*", (req, res) => res.status(404).json({ error: "Not found" })); // handle 404 errors;
app.use(errorHandler); // use error handler middleware

// start the server and listen on the specified port
app.listen(port, () =>
  console.log(`Server listening on port : ${port} -> http://localhost:${port}`)
); // log the server start message with the port number
