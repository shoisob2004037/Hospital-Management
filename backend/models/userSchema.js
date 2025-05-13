import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is Required"],
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is Required"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    validate: [validator.isEmail, "Please Provide a Valid Email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Number is Required"],
    minLength: [11, "Phone Number Must Contain Exactly 11 Digits!"],
    maxLength: [11, "Phone Number Must Contain Exactly 11 Digits!"],
  },
  nic: {
    type: String,
    required: [true, "National ID Card is Required"],
    minLength: [10, "NIC Must Contain Exactly 10 Digits!"],
    maxLength: [10, "NIC Must Contain Exactly 10 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is Required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is Required"],
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false, // Prevents password from being returned in queries by default
  },
  role: {
    type: String,
    required: [true, "Role is Required"],
    enum: ["Admin", "Patient", "Doctor"],
    default: "Patient",
  },
  doctorDepartment: {
    type: String,
    required: [
      function () {
        return this.role === "Doctor" && this.requestStatus === "pending";
      },
      "Doctor Department is Required for Request Submission",
    ],
  },
  doctorEducation: {
    type: String,
    required: [
      function () {
        return this.role === "Doctor" && this.requestStatus === "pending";
      },
      "Doctor Education is Required for Request Submission",
    ],
  },
  doctorDegrees: {
    type: [String], // Array of strings
    required: [
      function () {
        return this.role === "Doctor" && this.requestStatus === "pending";
      },
      "Doctor Degrees are Required for Request Submission",
    ],
  },
  docAvatar: {
    public_id: {
      type: String,
      required: [
        function () {
          return this.role === "Doctor" && this.requestStatus === "pending";
        },
        "Doctor Avatar Public ID is Required",
      ],
    },
    url: {
      type: String,
      required: [
        function () {
          return this.role === "Doctor" && this.requestStatus === "pending";
        },
        "Doctor Avatar URL is Required",
      ],
    },
  },
  doctorDocuments: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  isApproved: {
    type: Boolean,
    default: function () {
      return this.role === "Doctor" ? false : true; // Doctors start unapproved, others approved by default
    },
  },
  requestStatus: {
    type: String,
    enum: ["pending", "approved", "rejected", null],
    default: null, // No request status until a doctor submits a request
  },
});

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);