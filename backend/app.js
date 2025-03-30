// Import statements remain the same
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import doctorRouter from "./router/doctorRouter.js";

// Load environment variables
config({ path: "./config/config.env" });

const app = express();

// Initialize database connection
dbConnection().catch(console.error);

// Define allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL,   
  process.env.DASHBOARD_URL,
  // Add Vercel deployment URLs to allowed origins
  "https://your-vercel-app.vercel.app",
  "https://*.vercel.app",
];

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., Postman) or from allowed origins
      if (!origin || allowedOrigins.some(allowed => 
        allowed.includes('*') ? origin?.includes(allowed.replace('*', '')) : origin === allowed
      )) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rest of your middleware setup remains the same
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Add a health check route for Vercel
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/doctor", doctorRouter);

// Error Middleware
app.use(errorMiddleware);

export default app;
