import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const PORT = 5000;
 
const app = express();
app.use(express.json());

mongoose.connect(process.env.DB!).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
})

import UserRoute from "./routes";
app.use("/api", UserRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
