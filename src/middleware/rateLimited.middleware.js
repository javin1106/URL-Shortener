import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later",
  },
  standardHeaders: true,
  legacyHeaders: true,
});

export default rateLimiter;
