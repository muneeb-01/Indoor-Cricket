import jwt, { SignOptions } from "jsonwebtoken"
import config from "../config/env"
import { TokenPayload, TokenPair } from "../types/token"
import TokenStore from "../models/refreshToken"
import { Response } from "express"
import "cookie-parser" // ensures types augment Express.Response

function signToken(
  payload: object,
  secret: string,
  expiresIn: string | number,
  type: "access" | "refresh" = "access"
): string {
  expiresIn = 20 * 60 // 20 minutes
  return expiresIn
    ? jwt.sign(payload, secret, { expiresIn })
    : jwt.sign(payload, secret)
}

export const generateAccessToken = async (
  payload: TokenPayload
): Promise<string> => {
  return signToken(payload, config.jwt.secret, config.jwt.expiresIn, "access")
}

// -------- Generate Refresh Token --------
export const generateRefreshToken = async (
  payload: TokenPayload
): Promise<string> => {
  return signToken(payload, config.jwt.refreshSecret, config.jwt.refreshExpiresIn, "refresh")
}
export async function generateTokens(
  userId: string,
  res: Response
): Promise<TokenPair> {
  const payload: TokenPayload = { userId }

  // Generate access token
  const accessToken = signToken(payload, config.jwt.secret, config.jwt.expiresIn, "access")

  // Generate refresh token
  const refreshToken = signToken(payload, config.jwt.refreshSecret, config.jwt.refreshExpiresIn, "refresh")

  // Save refresh token in MongoDB
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  await TokenStore.save(refreshToken, userId, expires)

  // Set refresh token as HTTP-only cookie
  // res.cookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  // })

  return { accessToken, refreshToken }
}
export function verifyToken(
  token: string,
  secret: string
): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, secret) as TokenPayload
    return decoded
  } catch (error) {
    return null
  }
}

export function verifyAccessToken(token: string): TokenPayload | null {
  return verifyToken(token, config.jwt.secret)
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  return verifyToken(token, config.jwt.refreshSecret)
}
