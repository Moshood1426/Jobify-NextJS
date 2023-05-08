//setting up express
import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

//setting up middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//setting up routes
import authRouter from "./routes/authRoute.js";
import jobRouter from "./routes/jobRoute.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

const __dirname = dirname(fileURLToPath(import.meta.url));

//app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/api/v1", (req, res) => {
  res.json({ msg: "Server ti set" });
});

//invoking routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

//invoking error middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//connecting to DB and spinning up the server
import connectDB from "./db/connectDB.js";
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server is running on port:" + port + "...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
