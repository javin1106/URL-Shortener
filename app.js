import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import router from "./src/routes/url.routes.js";

app.use("/api/url", router);

app.get("/", (req, res) => {
  res.send("URL Shortener Backend is Live");
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
    errors: err.errors || [],
  });
});

export default app;
