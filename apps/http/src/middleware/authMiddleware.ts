import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../utils/envExports";
import { Request, Response, NextFunction } from "express";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token as string;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET as string) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}