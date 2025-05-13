// routes/appointmentRouter.js
import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
  getPatientAppointments,
  getDoctorAppointments, // New import
} from "../controller/appointmentController.js";
import { isPatientAuthenticated, isAdminAuthenticated, isAdminOrDoctorAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminOrDoctorAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminOrDoctorAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminOrDoctorAuthenticated, deleteAppointment);
router.get("/patient", isPatientAuthenticated, getPatientAppointments);
router.get("/doctor", isAdminOrDoctorAuthenticated, getDoctorAppointments);

export default router;