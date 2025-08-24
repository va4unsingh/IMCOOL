import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) {
  console.log("MONGO URI ISN'T LOADED");
}

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log(`mongo db connected running on port ${db.connection.port}`);
  } catch (error) {
    console.log("Failed to connect to mongo db");
  }
};

export default dbConnect;
