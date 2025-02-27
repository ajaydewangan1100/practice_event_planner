import express from "express";
import { config } from "dotenv";
import dbConnection from "./config/dbConfig.js";
import cookieParser from "cookie-parser";

config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Router imports here
import userRouter from "./router/user.router.js";
import eventRouter from "./router/event.router.js";
// Middleware imports here
import isLoggedIn from "./middlewares/userMiddleware.js";
import upload from "./config/multerConfig.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/event", isLoggedIn, upload.single("image"), eventRouter);

app.listen(process.env.PORT, () => {
  try {
    dbConnection();
    console.log("listening on http://localhost:" + process.env.PORT);
  } catch (error) {
    console.log("Error while DB connection: " + error);
  }
});
