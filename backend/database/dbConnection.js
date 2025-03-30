import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT",
      // These options help with connection stability
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`Connected to MongoDB Database: ${conn.connection.host}`);
    
    // Handle connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.log('MongoDB connection error:', err);
    });
    
    return conn;
  } catch (err) {
    console.log("Error connecting to database:", err);
    // Don't crash the application, but log the error
    return null;
  }
};
