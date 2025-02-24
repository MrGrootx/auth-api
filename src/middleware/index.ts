import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import User from "../models/User.schema";
import "../types/express";  

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized: Invalid token format" });
      return;
    }

    if (!process.env.SECRET_KEY) {
      console.error("SECRET_KEY is not defined in environment variables!");
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;

    const user = await User.findById(decoded?.id).select("-password");  
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = user.toObject();

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: "Unauthorized: Token expired" });
      return;
    }
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
};

export { verifyToken };
