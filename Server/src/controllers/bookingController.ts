

import { Request, Response } from "express";
import Slot from "../models/Slot";
import Booking from "../models/Booking";
import mongoose from "mongoose";


export const bookSlot = async (req: Request, res: Response) => {
try {
const userId = (req as any).userId as string;
const { sportId, slotId } = req.body;
if (!userId) return res.status(401).json({ error: "Not authenticated" });
if (!sportId || !slotId) return res.status(400).json({ error: "Missing fields" });


const slot = await Slot.findById(slotId);
if (!slot) return res.status(404).json({ error: "Slot not found" });
if (slot.isBooked) return res.status(400).json({ error: "Slot already booked" });
if (slot.sportId !== sportId) return res.status(400).json({ error: "Slot does not match sport" });


// mark booked
slot.isBooked = true;
await slot.save();


const booking = await Booking.create({ userId: new mongoose.Types.ObjectId(userId), sportId, slotId: slot._id });


res.status(201).json({ message: "Booked", booking });
} catch (err: any) {
res.status(500).json({ error: err.message });
}
};



export const getUserBookings = async (req: Request, res: Response) => {
try {
const userId = (req as any).userId as string;
if (!userId) return res.status(401).json({ error: "Not authenticated" });


const bookings = await Booking.find({ userId }).populate("slotId");
res.json(bookings);
} catch (err: any) {
res.status(500).json({ error: err.message });
}
};


export const getAllBookings = async (req: Request, res: Response) => {
try {
const bookings = await Booking.find().populate("slotId");
res.json(bookings);
} catch (err: any) {
res.status(500).json({ error: err.message });
}
};


export const cancelBooking = async (req: Request, res: Response) => {
try {
const { bookingId } = req.params;
const booking = await Booking.findByIdAndDelete(bookingId);
if (!booking) return res.status(404).json({ error: "Booking not found" });


// free slot
const slot = await Slot.findById(booking.slotId);
if (slot) {
slot.isBooked = false;
await slot.save();
}

res.json({ message: "Cancelled", booking });
} catch (err: any) {
res.status(500).json({ error: err.message });
}
};