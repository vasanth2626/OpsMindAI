// server/seedAdmin.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI missing in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected for seeding");

    const existingAdmin = await User.findOne({
      email: "superadmin@opsmind.com",
    });

    if (existingAdmin) {
      console.log("⚠️ Super Admin already exists:");
      console.log(`📧 ${existingAdmin.email} | role: ${existingAdmin.role}`);
      process.exit(0);
    }

    // ❗ Password plain, hashing will happen in User model pre-save
    const admin = await User.create({
      name: "Super Admin",
      email: "superadmin@opsmind.com",
      password: "123456",
      role: "superadmin",
    });

    console.log("✅ Super Admin user created successfully");
    console.log("📧 Email: superadmin@opsmind.com");
    console.log("🔑 Password: 123456");
    console.log(`🆔 User ID: ${admin._id}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding super admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();