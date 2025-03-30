// middlewares/auth.js
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

// Middleware to authenticate patients
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { patientToken } = req.cookies;
  console.log("Patient Token in Middleware:", patientToken);
  console.log("All Cookies in Middleware:", req.cookies);
  if (!patientToken) {
    return next(new ErrorHandler("Please Login First", 401));
  }
  const decoded = jwt.verify(patientToken, process.env.JWT_SECRET_KEY);
  console.log("Decoded Patient Token:", decoded);
  req.user = await User.findOne({ _id: decoded.id, role: "Patient" });
  console.log("Fetched Patient (req.user):", req.user);
  if (!req.user) {
    return next(new ErrorHandler("Patient not found", 404));
  }
  next();
});

// Middleware to authenticate admins
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { adminToken } = req.cookies;
  console.log("Admin Token in Middleware:", adminToken);
  console.log("All Cookies in Middleware:", req.cookies);
  if (!adminToken) {
    return next(new ErrorHandler("Please Login First", 401));
  }
  const decoded = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);
  console.log("Decoded Admin Token:", decoded);
  req.user = await User.findOne({ _id: decoded.id, role: "Admin" });
  console.log("Fetched Admin (req.user):", req.user);
  if (!req.user) {
    return next(new ErrorHandler("Admin not found", 404));
  }
  next();
});

// Middleware to authenticate doctors
export const isDoctorAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { doctorToken } = req.cookies;
  console.log("Doctor Token in Middleware:", doctorToken);
  console.log("All Cookies in Middleware:", req.cookies);
  if (!doctorToken) {
    return next(new ErrorHandler("Please Login First", 401));
  }
  const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET_KEY);
  console.log("Decoded Doctor Token:", decoded);
  req.user = await User.findOne({ _id: decoded.id, role: "Doctor" });
  console.log("Fetched Doctor (req.user):", req.user);
  if (!req.user) {
    return next(new ErrorHandler("Doctor not found", 404));
  }
  next();
});

// New middleware to authenticate both admins and doctors
export const isAdminOrDoctorAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { adminToken, doctorToken } = req.cookies;

  if (!adminToken && !doctorToken) {
    return next(new ErrorHandler("Please Login First", 401));
  }

  let decoded;
  if (adminToken) {
    decoded = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);
    req.user = await User.findOne({ _id: decoded.id, role: "Admin" });
    if (!req.user) {
      return next(new ErrorHandler("Admin not found", 404));
    }
    req.role = "Admin";
  } else if (doctorToken) {
    decoded = jwt.verify(doctorToken, process.env.JWT_SECRET_KEY);
    req.user = await User.findOne({ _id: decoded.id, role: "Doctor" });
    if (!req.user) {
      return next(new ErrorHandler("Doctor not found", 404));
    }
    req.role = "Doctor";
  }

  next();
});