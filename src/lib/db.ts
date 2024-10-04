import mongoose from "mongoose";

let cachedConnection: mongoose.Connection | null = null;

export async function connectToMongoDB() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }

  try {
    const mongooseInstance = await mongoose.connect(mongoUri);
    cachedConnection = mongooseInstance.connection;
    console.log("New mongodb connection established");
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
