import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logout,
  patientRegister,
  updatePatientProfile,
  getAllAdmins,
  getAllPatients,
  deleteDoctor, 
  getDoctorById,
} from "../controller/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addNew", isAdminAuthenticated, addNewAdmin);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.patch("/patient/update", isPatientAuthenticated, updatePatientProfile);
router.get("/admin/logout", isAdminAuthenticated, logout);
router.get("/patient/logout", isPatientAuthenticated, logout);
router.post("/doctor/addNew", isAdminAuthenticated, addNewDoctor);
router.get("/admins", isAdminAuthenticated, getAllAdmins);
router.get("/patients", isAdminAuthenticated, getAllPatients);
router.get("/doctors", getAllDoctors);
router.delete("/doctor/:id", isAdminAuthenticated, deleteDoctor); 
router.get("/doctor/:id", getDoctorById);

export default router;