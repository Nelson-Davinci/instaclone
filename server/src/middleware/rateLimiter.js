import { rateLimit } from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 attempts within a 5 min window
  message: "Too many requests from this IP, please try again later",
});
