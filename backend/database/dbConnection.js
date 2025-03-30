import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT",
    })
    .then(() => {
      console.log("Connected to MongoDB Database!");
    })
    .catch((err) => {
      console.log("Some error Occured while connecting to database:", err);
    });
};
