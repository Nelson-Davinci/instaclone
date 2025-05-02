import express from "express"; //middleware in express i.e json
import {
  registerUser,
  loginUser,
  authenticateUser,
  resendEmailVerificationLink,
  verifyEmail,
  sendForgotPasswordMail,
  resetPassword,
  logout,
  followUser,
} from "../controller/user.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js"; // import the middleware
import { rateLimiter } from "../middleware/rateLimiter.js";
import { cacheMiddleware, clearCache } from "../middleware/cache.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", rateLimiter, loginUser);
router.post(
  "/resend-verification",
  rateLimiter,
  verifyToken,
  authorizeRoles("user", "admin"),
  resendEmailVerificationLink
);

router.post("/forgot-password", sendForgotPasswordMail);
router.patch("/reset-password/:userId/:passwordToken", resetPassword);

// get
router.get(
  "/user",
  verifyToken,
  authorizeRoles("user", "admin"),
  cacheMiddleware("auth_User", 600),
  authenticateUser
);

router.patch(
  "/verify-account/:userId/:verificationToken",
  verifyToken,
  authorizeRoles("user", "admin"),
  (req, res, next) => {
    clearCache("auth_User"); //clear routes
    next();
  },
  verifyEmail
);

router.post(
  "/logout",
  (req, res, next) => {
    clearCache(null, true);
    next();
  },
  logout
);

router.patch(
  "/follow/:id",
  verifyToken,
  authorizeRoles("user", "admin"),
  (req, res, next) => {
    clearCache("auth_User");
    next();
  },
  followUser
);

export default router;
