import express from "express";
import { config } from "dotenv";
import userRouter from "./router/user.router.js";
import dbConnection from "./config/dbConfig.js";
import isLoggedIn from "./middlewares/userMiddleware.js";
import cookieParser from "cookie-parser";

config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/event", isLoggedIn, eventRouter);

app.listen(process.env.PORT, () => {
  try {
    dbConnection();
    console.log("listening on http://localhost:" + process.env.PORT);
  } catch (error) {
    console.log("Error while DB connection: " + error);
  }
});
