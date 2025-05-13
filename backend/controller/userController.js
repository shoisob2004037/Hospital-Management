// controller/userController.js
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utilis/jwtToken.js";
import cloudinary from "cloudinary";

// Patient Registration
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const patient = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Patient",
  });
  generateToken(patient, "Patient Registered Successfully!", 200, res);
});

// Doctor Registration (No approval needed initially)
export const doctorRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    isApproved: false,
    requestStatus: null,
  });
  generateToken(doctor, "Doctor Registered Successfully!", 200, res);
});

// Unified Login (Patient, Doctor, Admin)
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  console.log("Login Request Body:", req.body);
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Provide Full Form!", 400));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password & Confirm Password Do Not Match!", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler(`User Not Found With This Role!`, 400));
  }

  generateToken(user, `${user.role} Logged In Successfully!`, 200, res);
});

// Doctor Request to Join (Only for authenticated doctors)
export const requestToJoin = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    doctorDepartment,
    doctorEducation,
    doctorDegrees,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !doctorDepartment ||
    !doctorEducation ||
    !doctorDegrees
  ) {
    return next(new ErrorHandler("Please Provide Full Doctor Details!", 400));
  }

  if (!req.files || !req.files.docAvatar || !req.files.doctorDocuments) {
    return next(new ErrorHandler("Doctor Avatar and Documents Required!", 400));
  }

  const { docAvatar, doctorDocuments } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg", "application/pdf"];

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("Avatar File Format Not Supported!", 400));
  }

  const documentUploads = Array.isArray(doctorDocuments)
    ? doctorDocuments
    : doctorDocuments
    ? [doctorDocuments]
    : [];

  if (documentUploads.length === 0) {
    return next(new ErrorHandler("At least one Doctor Document is Required!", 400));
  }

  for (const doc of documentUploads) {
    if (!allowedFormats.includes(doc.mimetype)) {
      return next(new ErrorHandler(`Invalid format for document: ${doc.name}`, 400));
    }
  }

  const doctor = await User.findById(req.user._id);
  if (!doctor || doctor.role !== "Doctor") {
    return next(new ErrorHandler("Doctor not found!", 404));
  }

  const avatarResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath, {
    folder: "doctor_avatars",
    resource_type: "auto",
  });
  if (!avatarResponse || avatarResponse.error) {
    console.error("Avatar upload error:", avatarResponse?.error || "Unknown error");
    return next(new ErrorHandler("Failed To Upload Avatar To Cloudinary", 500));
  }

  const documentResponses = [];
  for (const doc of documentUploads) {
    const docResponse = await cloudinary.uploader.upload(doc.tempFilePath, {
      folder: "doctor_documents",
      resource_type: "auto",
    });
    if (!docResponse || docResponse.error) {
      console.error(`Upload error for ${doc.name}:`, docResponse?.error || "Unknown error");
      return next(new ErrorHandler(`Failed To Upload Document: ${doc.name}`, 500));
    }
    documentResponses.push({
      public_id: docResponse.public_id,
      url: docResponse.secure_url,
    });
  }

  doctor.firstName = firstName;
  doctor.lastName = lastName;
  doctor.email = email;
  doctor.phone = phone;
  doctor.nic = nic;
  doctor.dob = new Date(dob);
  doctor.gender = gender;
  doctor.doctorDepartment = doctorDepartment;
  doctor.doctorEducation = doctorEducation;
  doctor.doctorDegrees = Array.isArray(doctorDegrees)
    ? doctorDegrees
    : doctorDegrees.split(",").map((d) => d.trim());
  doctor.docAvatar = {
    public_id: avatarResponse.public_id,
    url: avatarResponse.secure_url,
  };
  doctor.doctorDocuments = documentResponses;
  doctor.requestStatus = "pending";

  await doctor.save();

  res.status(200).json({
    success: true,
    message: "Request to join submitted successfully!",
    doctor,
  });
});

// Get User Details (Profile for any role)
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout (Unified for all roles)
export const logout = catchAsyncErrors(async (req, res, next) => {
  const cookieName = req.user.role === "Admin" ? "adminToken" : req.user.role === "Patient" ? "patientToken" : "doctorToken";
  res
    .status(201)
    .cookie(cookieName, "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: `${req.user.role} Logged Out Successfully.`,
    });
});

// Admin: Add New Admin
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`, 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});

// Admin: Get All Doctors (Approved only)
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor", isApproved: true });
  res.status(200).json({
    success: true,
    doctors,
  });
});

// Admin: Get All Doctor Requests
export const getAllDoctorRequests = catchAsyncErrors(async (req, res, next) => {
  const doctorRequests = await User.find({ role: "Doctor", requestStatus: "pending" });
  res.status(200).json({
    success: true,
    doctorRequests,
  });
});

// Admin: Approve Doctor Request
export const approveDoctorRequest = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const doctor = await User.findOne({ _id: id, role: "Doctor" });
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found!", 404));
  }

  doctor.isApproved = true;
  doctor.requestStatus = "approved";
  await doctor.save();

  res.status(200).json({
    success: true,
    message: "Doctor request approved successfully!",
    doctor,
  });
});

// Admin: Reject Doctor Request
export const rejectDoctorRequest = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const doctor = await User.findOne({ _id: id, role: "Doctor" });
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found!", 404));
  }

  doctor.requestStatus = "rejected";
  await doctor.save();

  res.status(200).json({
    success: true,
    message: "Doctor request rejected successfully!",
    doctor,
  });
});

// Admin: Add New Doctor (Approved immediately)
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("Avatar File Format Not Supported!", 400));
  }

  const doctorDocuments = req.files.doctorDocuments || [];
  const documentUploads = Array.isArray(doctorDocuments) ? doctorDocuments : [doctorDocuments];

  for (const doc of documentUploads) {
    if (doc && !allowedFormats.includes(doc.mimetype)) {
      return next(new ErrorHandler("Document File Format Not Supported!", 400));
    }
  }

  const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment, doctorEducation, doctorDegrees } = req.body;

  if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment || !doctorEducation || !doctorDegrees) {
    return next(new ErrorHandler("Please Provide Full Forms!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`, 400));
  }

  const avatarResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
  if (!avatarResponse || avatarResponse.error) {
    return next(new ErrorHandler("Failed To Upload Avatar To Cloudinary", 500));
  }

  const documentResponses = [];
  for (const doc of documentUploads) {
    if (doc) {
      const docResponse = await cloudinary.uploader.upload(doc.tempFilePath);
      if (!docResponse || docResponse.error) {
        return next(new ErrorHandler("Failed To Upload Document To Cloudinary", 500));
      }
      documentResponses.push({
        public_id: docResponse.public_id,
        url: docResponse.secure_url,
      });
    }
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    doctorEducation,
    doctorDegrees: Array.isArray(doctorDegrees) ? doctorDegrees : doctorDegrees.split(",").map((d) => d.trim()),
    docAvatar: {
      public_id: avatarResponse.public_id,
      url: avatarResponse.secure_url,
    },
    doctorDocuments: documentResponses,
    isApproved: true,
    requestStatus: "approved",
  });

  res.status(200).json({
    success: true,
    message: "New Doctor Registered Successfully",
    doctor,
  });
});

// Patient: Update Profile
export const updatePatientProfile = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, phone, nic, dob, gender } = req.body;

  if (!firstName || !lastName || !phone || !nic || !dob || !gender) {
    return next(new ErrorHandler("Please provide all required fields!", 400));
  }

  if (firstName.length < 3 || lastName.length < 3) {
    return next(new ErrorHandler("First Name and Last Name must contain at least 3 characters!", 400));
  }
  if (phone.length !== 11) {
    return next(new ErrorHandler("Phone Number must contain exactly 11 digits!", 400));
  }
  if (nic.length !== 10) {
    return next(new ErrorHandler("NIC must contain exactly 10 digits!", 400));
  }
  if (!["Male", "Female"].includes(gender)) {
    return next(new ErrorHandler("Gender must be Male or Female!", 400));
  }

  const user = await User.findById(req.user._id);
  if (!user || user.role !== "Patient") {
    return next(new ErrorHandler("Patient not found!", 404));
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.phone = phone;
  user.nic = nic;
  user.dob = new Date(dob);
  user.gender = gender;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully!",
    user,
  });
});

// Admin: Get All Admins
export const getAllAdmins = catchAsyncErrors(async (req, res, next) => {
  const admins = await User.find({ role: "Admin" });
  res.status(200).json({
    success: true,
    admins,
  });
});

// Admin: Get All Patients
export const getAllPatients = catchAsyncErrors(async (req, res, next) => {
  const patients = await User.find({ role: "Patient" });
  res.status(200).json({
    success: true,
    patients,
  });
});

// Admin: Delete Doctor
export const deleteDoctor = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const doctor = await User.findOne({ _id: id, role: "Doctor" });
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found!", 404));
  }

  if (doctor.docAvatar && doctor.docAvatar.public_id) {
    await cloudinary.uploader.destroy(doctor.docAvatar.public_id);
  }

  await User.deleteOne({ _id: id });

  res.status(200).json({
    success: true,
    message: "Doctor deleted successfully!",
  });
});

// Get Doctor by ID
export const getDoctorById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const doctor = await User.findOne({ _id: id, role: "Doctor" });
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found!", 404));
  }
  res.status(200).json({
    success: true,
    doctor,
  });
});