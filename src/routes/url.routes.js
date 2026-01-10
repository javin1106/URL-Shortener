import express from "express";
import { Router } from "express";
import {
  generateNewShortId,
  redirectToLongUrl,
} from "../controllers/url.controllers.js";

const router = Router();

router.post("/generate", generateNewShortId);
router.get("/:shortId", redirectToLongUrl);

export default router;
