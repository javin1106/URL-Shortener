import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateShortId } from "../utils/generateShortId.js";
import Url from "../models/url.model.js";

export const generateNewShortId = asyncHandler(async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    throw new ApiError(400, "URL is required");
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

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Short URL created", {
        ...newUrl.toObject(),
        shortUrl,
      })
    );
});
