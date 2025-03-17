import express from "express";
import "./db/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.js";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
