// server/utils/createAdminUser.js
const mongoose = require("mongoose");
const User = require("../models/User");
const dotenv = require("dotenv");

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "info@veloria.in" });

    if (adminExists) {
      console.log("Admin user already exists");
      process.exit();
    }

    const admin = await User.create({
      name: "Veloria Admin",
      email: "info@veloria.in",
      password: process.env.EMAIL_PASS, // Change this!
      role: "admin",
    });

    console.log("Admin user created successfully");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    process.exit();
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser();
