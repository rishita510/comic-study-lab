import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/uploads.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "";
const JWT_SECRET = process.env.JWT_SECRET || "";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/uploads", uploadRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Comics Studies Lab backend is running" });
});

async function startServer() {
  if (!MONGODB_URI) {
    console.error("Please set MONGODB_URI in your .env file before starting the server.");
    process.exit(1);
  }

  if (!JWT_SECRET) {
    console.error("Please set JWT_SECRET in your .env file before starting the server.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
    process.exit(1);
  }
}

startServer();
