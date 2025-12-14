import mongoose, { Document, Model } from "mongoose";

// ---------- Interface for RefreshToken document ----------
export interface IRefreshToken extends Document {
  token: string;
  userId: string;
  expires: Date;
}

// ---------- Mongoose Schema ----------
const refreshTokenSchema = new mongoose.Schema<IRefreshToken>({
  token: { type: String, required: true },
  userId: { type: String, required: true },
  expires: { type: Date, required: true },
});

// ---------- Mongoose Model ----------
const RefreshToken: Model<IRefreshToken> = mongoose.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

// ---------- Type for Store ----------
interface RefreshTokenStore {
  save(token: string, userId: string, expires: Date): Promise<boolean>;
  find(token: string): Promise<IRefreshToken | null>;
  delete(token: string): Promise<boolean>;
}

// ---------- Mongo Store Implementation ----------
const TokenStore: RefreshTokenStore = {
  save: async (token, userId, expires) => {
    const refreshToken = new RefreshToken({ token, userId, expires });
    await refreshToken.save();
    return true;
  },

  find: async (token) => {
    return await RefreshToken.findOne({ token, expires: { $gt: new Date() } });
  },

  delete: async (token) => {
    await RefreshToken.deleteOne({ token });
    return true;
  },
};

export default TokenStore;
