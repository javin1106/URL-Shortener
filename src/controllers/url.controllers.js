import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateShortId } from "../utils/generateShortId.js";
import Url from "../models/url.model.js";
import isUrl from "is-url";

// POST
export const generateNewShortId = asyncHandler(async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl || !isUrl(longUrl)) {
    throw new ApiError(400, "Please provide a valid URL");
  }

  const MAX_RETRIES = 5;
  let shortId;
  let exists = true;

  for (let attempt = 0; attempt < MAX_RETRIES && exists; attempt++) {
    shortId = generateShortId(6);
    exists = await Url.exists({ shortId });
  }

  if (exists) {
    throw new ApiError(500, "Failed to generate unique short URL");
  }

  const newUrl = await Url.create({ longUrl, shortId });

  const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;

  return res.status(201).json(
    new ApiResponse(201, "Short URL created", {
      ...newUrl.toObject(), // to create an extra field in the res which is not stored in DB, combines both and sends in res
      shortUrl, // not stored in DB as base URL can get changed but the shortId has to be same
    })
  );
});

// GET
export const redirectToLongUrl = asyncHandler(async (req, res) => {
  const { shortId } = req.params;

  const url = await Url.findOne({ shortId });

  if (!url) {
    throw new ApiError(404, "Short URL not found");
  }

  if (!url.isActive) {
    throw new ApiError(410, "Short URL is expired");
  }

  if (url.expiresAt && url.expiresAt < Date.now()) {
    throw new ApiError(410, "Short URL is expired");
  }

  url.totalClicks += 1;
  url.markModified("totalClicks");
  await url.save();

  res.redirect(302, url.longUrl);
});
