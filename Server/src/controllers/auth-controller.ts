import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {generateTokens } from "../utils/jwt.utils";
import User, { IUser } from "../models/User";

export const register = async (req: Request, res: Response) => {
try {
const { name, email, phone, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });


const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ error: "Email already registered" });


const hashed = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, phone, password: hashed });


const token = await generateTokens(String(user._id), res);

res.status(201).json({ message: "Registered", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err: any) {
res.status(500).json({ error: err.message });
}
};

export const login = async (req: Request, res: Response) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ error: "Missing fields" });


const user = await User.findOne({ email });
if (!user) return res.status(400).json({ error: "Invalid credentials" });


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ error: "Invalid credentials" });


const token = await generateTokens(String(user._id), res);

res.json({ message: "Logged in", token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
} catch (err: any) {
res.status(500).json({ error: err.message });
}
};
