import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }], // Array of strings: ['React', 'Node.js']
  imageUrl: { type: String }, // Cloudinary URL
  githubUrl: { type: String },
  liveUrl: { type: String },
  isFeatured: { type: Boolean, default: false }, // The "Senior" toggle
  isLive: { type: Boolean, default: true }, // For your "Live System" dot
  order: { type: Number, default: 0 }, // Manual sorting
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", projectSchema);
