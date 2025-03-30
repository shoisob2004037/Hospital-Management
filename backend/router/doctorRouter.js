// router/doctorRouter.js
import express from "express";
import {
  doctorRegister,
  login, // Use unified login
  requestToJoin,
  getUserDetails, // Renamed from getDoctorDetails
  logout, // Use unified logout
  getAllDoctorRequests,
  approveDoctorRequest,
  rejectDoctorRequest,
} from "../controller/userController.js"; // Changed import source
import { isDoctorAuthenticated, isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Doctor signup and login (no admin approval needed initially)
router.post("/register", doctorRegister);
router.post("/login", login); // Unified login

// Doctor request to join (after login)
router.post("/request-to-join", isDoctorAuthenticated, requestToJoin);

// Doctor profile and request status
router.get("/me", isDoctorAuthenticated, getUserDetails);

// Doctor logout
router.get("/logout", isDoctorAuthenticated, logout);

// Admin routes to manage doctor requests
router.get("/requests", isAdminAuthenticated, getAllDoctorRequests);
router.put("/request/approve/:id", isAdminAuthenticated, approveDoctorRequest);
router.put("/request/reject/:id", isAdminAuthenticated, rejectDoctorRequest);

export default router;