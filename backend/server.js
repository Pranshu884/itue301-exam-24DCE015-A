require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");

const app = express();

// --------------------
// Basic Middleware
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// Request Logger
// --------------------
const requestLogger = (req, res, next) => {
  console.log(
    `[${req.method}] ${req.path} [${new Date().toISOString()}]`
  );

  next();
};

app.use(requestLogger);

// ==================================================
// TASK 3 - IN-MEMORY DATA
// ==================================================

const doctors = [
  {
    id: 1,
    name: "Dr. Hiren Shah",
    email: "hirenshah@medcare.com",
    specialisation: "Physician",
    available: true
  },
  {
    id: 2,
    name: "Dr. Kajal Shah",
    email: "kajalshah@medcare.com",
    specialisation: "Radiologist",
    available: false
  },
  {
    id: 3,
    name: "Dr. Devanshu Shah",
    email: "devanshushah@medcare.com",
    specialisation: "Neurologist",
    available: true
  }
];

let appointments = [
  {
    id: 1,
    patientId: 101,
    doctorId: 1,
    date: "2026-08-25",
    timeSlot: "10:00 AM",
    status: "confirmed",
    reason: "Regular checkup"
  }
];

// ==================================================
// TASK 3 - REST APIs
// ==================================================

// GET all appointments
app.get("/api/v1/appointments", (req, res) => {
  res.status(200).json(appointments);
});

// POST new appointment
app.post("/api/v1/appointments", (req, res) => {
  const newAppointment = {
    id: appointments.length + 1,
    ...req.body
  };

  appointments.push(newAppointment);

  res.status(201).json(newAppointment);
});

// GET all doctors
app.get("/api/v1/doctors", (req, res) => {
  res.status(200).json(doctors);
});

// ==================================================
// TASK 5 - MONGODB + MONGOOSE
// ==================================================

// Create Patient
app.post("/api/v1/mongo/patients", async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(201).json({
      message: "Patient created successfully",
      patient
    });
  } catch (error) {
    next(error);
  }
});

// Create Doctor
app.post("/api/v1/mongo/doctors", async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json({
      message: "Doctor created successfully",
      doctor
    });
  } catch (error) {
    next(error);
  }
});

// Create Appointment
app.post("/api/v1/mongo/appointments", async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json({
      message: "Appointment created successfully",
      appointment
    });
  } catch (error) {
    next(error);
  }
});

// ==================================================
// GLOBAL ERROR-HANDLING MIDDLEWARE
// MUST BE LAST
// ==================================================

app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation failed",
      message: err.message
    });
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID",
      message: "Invalid MongoDB ID provided"
    });
  }

  // Duplicate unique field
  if (err.code === 11000) {
    return res.status(400).json({
      error: "Duplicate value",
      message: "Email already exists"
    });
  }

  // Other unexpected errors
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong"
  });
});

// ==================================================
// MONGODB CONNECTION + SERVER START
// ==================================================

const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  });
  app.post("/api/v1/mongo/doctors", async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json({
      message: "Doctor created successfully",
      doctor
    });
  } catch (error) {
    next(error);
  }
});