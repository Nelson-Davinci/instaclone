import express from "express"; //middleware in express i.e json
import {
  registerUser,
  loginUser,
  authenticateUser,
  resendEmailVerificationLink,
  verifyEmail,
  sendForgotPasswordMail,
} from "../controller/user.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js"; // import the middleware

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post(
  "/resend-verification",
  verifyToken,
  authorizeRoles("user", "admin"),
  resendEmailVerificationLink
);

// get
router.get(
  "/user",
  verifyToken,
  authorizeRoles("user", "admin"),
  authenticateUser
);

router.patch("/user", verifyToken, authorizeRoles("user", "admin"));

router.patch(
  "/verify-account/:userId/:verificationToken",
  verifyToken,
  authorizeRoles("admin"),
  verifyEmail
);

router.post("/sendforgot-password-mail", sendForgotPasswordMail);


export default router;
