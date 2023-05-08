import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import Job from "./models/Job.js";
import { readFile } from 'fs/promises'
dotenv.config()

console.log("here");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.deleteMany();

    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock-dats.json", import.meta.url))
    );

    await Job.create(jsonProducts);
    console.log("succes..");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
