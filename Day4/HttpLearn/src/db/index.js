import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.log("MONGO URI is not defined");
}

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log(db.connection.port);
  } catch (error) {
    console.log("Error error mongo db");
  }
};

export default dbConnect;
