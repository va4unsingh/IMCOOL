import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("failed to load MONGO URI");
    }
    const db = await mongoose.connect(MONGO_URI);
    console.log("MONGO DB IS RUNNING ON PORT: ", db.connection.port);
  } catch (error) {
    console.log("ERROr connecting mongo db", error);
  }
};

export default dbConnect;
