// Import the standard JWT payload interface
import { JwtPayload } from 'jsonwebtoken';

/**
 * Interface for the data you want to store in your JWT payload.
 * It extends JwtPayload to include standard claims like 'exp', 'iat', etc.
 * The 'sub' (subject) claim is typically used for the user ID.
 */
export interface TokenPayload extends JwtPayload {
  userId: string;
  // You can add more user-specific data here (e.g., email, roles)
}

/**
 * Interface for the response when generating both tokens.
 */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}