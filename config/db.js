import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const testSchema = new mongoose.Schema({ name: String });
const TestModel = mongoose.model("Test", testSchema);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Securely");

    
  } catch (error) {
    console.log("Error Connecting", error);
    process.exit(1);
  }
};
