import express, { Request, Response } from "express";
import User from "../models/User.schema";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/index.lib";
import { verifyToken } from "../middleware";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      message: "User Created",
    });
    return;
  }
  res.status(404).json({
    message: "User Already Exists",
  });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({
      message: "Invalid Credentials",
    });
    return;
  }
  const token = generateToken(user);
  res.status(200).json({
    message: "Login Successful",
    token,
  });
});

router.get("/data", verifyToken , (req: Request, res: Response) => {
  res.status(200).json({
    message: "Data",
    data: req.user,
  });
});

router.post(
  "/reset-password",
  verifyToken,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password Request",
      // text: `Click on the link to reset your password: http://localhost:5000/api/reset-password/${token}`,
      text: `
        Password Reset Code: ${token}
      `,
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        res.status(500).json({
          message: "Error sending email",
        });
        return;
      }
      res.status(200).json({
        message: "Email sent",
      });
    });
  }
);

router.post("/reset-password/:token",  async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  res.status(200).json({
    message: "Password reset successful",
  });
});
export default router;
