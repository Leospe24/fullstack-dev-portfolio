import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Message from "./models/Message.js"; // Import the model we just made
import { Resend } from "resend";
import Project from "./models/Project.js";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();

// Middleware
const allowedOrigins = [
  "https://fullstack-dev-portfolio.netlify.app", // No trailing slash!
  "https://fullstack-dev-portfolio-abpg.vercel.app/",
  "http://localhost:5173", // Trust your local machine
];

const corsOptions = {
  origin: (origin, callback) => {
    // !origin allows requests from tools like Postman to work
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Contact Form Submission Route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // 2. Save to MongoDB (Critical Step)
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 3. Send Email Notification
    // We use a try/catch here so if Resend fails, the user still gets a
    // success message because their data IS in the database.
    try {
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: process.env.MY_EMAIL,
        reply_to: email, // <--- This allows you to reply directly to the sender!
        subject: `New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #0891b2;">New Contact Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
              ${message}
            </div>
            <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #888;">Sent from your Portfolio Server</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email Notification Failed:", emailError);
      // We don't stop the whole process, because the DB save was successful.
    }

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Failed to process message." });
  }
});

// 1. GET all projects (For your Website)
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// 2. POST a new project (For you to use via Postman)
app.post("/api/projects", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ error: "Failed to create project" });
  }
});

app.get("/", (req, res) => {
  res.send("Portfolio API is running...");
});

// Health Check Route (The one your frontend is already pinging!)
app.get("/health", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  if (isConnected) {
    res.status(200).json({ status: "UP", database: "CONNECTED" });
  } else {
    res.status(503).json({ status: "DOWN", database: "DISCONNECTED" });
  }
});
const PORT = process.env.PORT || 5000;

// Connect to MongoDB & Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
