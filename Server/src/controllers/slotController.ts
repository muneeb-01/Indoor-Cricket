

import { Request, Response } from "express";
import Slot from "../models/Slot";


export const addSlot = async (req: Request, res: Response) => {
try {
const { sportId, date, time } = req.body;
if (!sportId || !date || !time) return res.status(400).json({ error: "Missing fields" });


// avoid duplicate slot for same sport/date/time
const exists = await Slot.findOne({ sportId, date, time });
if (exists) return res.status(400).json({ error: "Slot already exists" });


const slot = await Slot.create({ sportId, date, time });
res.status(201).json(slot);
} catch (err: any) {
res.status(500).json({ error: err.message });
}
};

export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { sportId, date, isBooked } = req.query as {
      sportId?: string;
      date?: string;
      isBooked?: string;
    };

    // base filter
    const filter: any = {};

    // add filters only if provided
    if (sportId) filter.sportId = sportId;
    if (date) filter.date = date;
    if (isBooked) filter.isBooked = isBooked;
    const slots = await Slot.find(filter).sort({ time: 1 });

    res.status(200).json(slots);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
