import { verifyAccessToken } from "../utils/jwt.utils"
import { Request, Response, NextFunction } from "express"
import User from "../models/User";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.headers["authorization"] ?? (req.headers.Authorization as string)
  if (!authHeader) return res.status(401).json({ error: "No token provided" })

  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Access token required" })
  }

  try {
    const decoded = verifyAccessToken(token)
    ;(req as any).userId = decoded?.userId
    const user = await User.findById(decoded?.userId).select("-password");

    if (!user) return res.status(401).json({ error: "User not found" });
    (req as any).user = user;
    next()
  } catch (err) {
    res.status(403).json({ error: "Invalid token" })
  }
}
