import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  try {
    const connection = await mongoose.connect(uri, { dbName: "graphqlTest" });
    console.log(`✅ Connected to MongoDB: ${connection.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
