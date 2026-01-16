import express from "express";
import rateLimiter from "../middleware/rateLimited.middleware.js";
import { Router } from "express";
import {
  generateNewShortId,
  redirectToLongUrl,
} from "../controllers/url.controllers.js";

const router = Router();

router.post("/generate", rateLimiter, generateNewShortId);
router.get("/:shortId", redirectToLongUrl);

export default router;
