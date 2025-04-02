import User from "../model/user.js";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateAccessToken } from "../config/generateToken.js";
import { sendMail } from "../config/emailService.js";

export const registerUser = async (req, res, next) => {
  const { username, email, fullname, password } = req.body; //get info from client via form
  try {
    if (!username || !email || !fullname || !password) {
      return next(createHttpError(400, "All Fields are required"));
    }
    //check if user already exists in db
    const [existingUsername, existingEmail] = await Promise.all([
      User.findOne({ username: username }),
      User.findOne({ email: email }),
    ]);
    if (existingUsername) {
      return next(createHttpError(409, "Username already exists"));
    }
    if (existingEmail) {
      return next(createHttpError(409, "Email already exists"));
    }
    // proceed to register user if user dont exists
    const salt = await bcrypt.genSalt(10); //encryption mechanism for to handle password
    const hashedPassword = await bcrypt.hash(password, salt); //encrypt the user password
    //proceed to create the user
    const user = await User.create({
      username,
      email,
      fullname,
      password: hashedPassword,
    });
    // generate the verification token
    const verifyAccountToken = crypto.randomBytes(20).toString("hex");
    user.verificationToken = verifyAccountToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    // specify the verifyAccountlink
    const verifyAccountLink = `${process.env.CLIENT_URL}/account/verify-account${user._id}/${user.verificationToken}`;
    // send email to user
    await sendMail({
      fullname: user.fullname,
      intro: [
        "Welcome to Instashots",
        "We are very excited to have you onboard",
      ],
      instructions: `To access our platforms, please verify your email using link: ${verifyAccountLink}. Link will expire after 24 hours.`,
      btnText: "Verify",
      subject: "Email Verification",
      to: user.email,
    });
    // generate accessToken
    const accessToken = generateAccessToken(user._id, user._role);
    // send a response to a client
    res
      .status(201)
      .json({
        success: true,
        message: "Account created successfully",
        accessToken,
      });
  } catch (error) {
    next(error);
  }
};
