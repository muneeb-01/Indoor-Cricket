import mongoose, { Schema, Document } from "mongoose";

export interface ISlot extends Document {
sportId: string; // static id like "snooker"
date: string; // YYYY-MM-DD
time: string; // e.g. "15:00-16:00"
isBooked: boolean;
}


const SlotSchema: Schema = new Schema({
sportId: { type: String, required: true },
date: { type: String, required: true },
time: { type: String, required: true },
isBooked: { type: Boolean, default: false }
}, { timestamps: true });


export default mongoose.model<ISlot>("Slot", SlotSchema);