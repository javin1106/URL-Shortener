import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import router from "./src/routes/url.routes.js";

app.use("/api/url", router);

app.get("/", (req, res) => {
  res.send("URL Shortener Backend is Live");
});

export default app;
