import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected successfully`);
  } catch (err) {
    console.log(`Error Message : ${err.message}`);
    process.exit(1);
  }
};
export default connectDB;
