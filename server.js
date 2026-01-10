import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./src/config/db.config.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(); // wait for mongoose.connect
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
};

start();
