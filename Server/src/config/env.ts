import dotenv from "dotenv";
// Load environment variables
dotenv.config({ quiet: true });

// ---------- Primitive exports ----------
export const MONGO_URI: string =
  process.env.MONGO_URI ?? "mongodb://localhost:27017/indoor-booking";

export const PORT: number = Number(process.env.PORT) || 5000;

// ---------- Config Types ----------
interface JwtConfig {
  secret: any;
  refreshSecret: string;
  expiresIn: number | string;
  refreshExpiresIn: number | string;
}

interface GoogleConfig {
  clientId: string;
  clientSecret: string;
}

interface MailerConfig {
  email: string;
  password: string;
}

interface AppConfig {
  jwt: JwtConfig;
  google: GoogleConfig;
  frontendUrl: string;
  mailer: MailerConfig;
  serverUrl: string;
}

// ---------- Config Object ----------
const config: AppConfig = {
  jwt: {
    secret: process.env.JWT_SECRET ?? "",
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? "",
    expiresIn: (process.env.JWT_EXPIRES_IN) ?? "15m",  
    refreshExpiresIn: (process.env.JWT_REFRESH_EXPIRES_IN) ?? "7d", 
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  },
  frontendUrl: process.env.ORIGIN ?? "",
  mailer: {
    email: process.env.EMAIL_USER ?? "",
    password: process.env.EMAIL_PASS ?? "",
  },
  serverUrl: process.env.SERVER_URL ?? "",
};

export default config;
