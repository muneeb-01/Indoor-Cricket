import mongoose, { Schema, Document } from "mongoose"

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId
  sportId: string
  slotId: mongoose.Types.ObjectId
  status: "Booked" | "Cancelled" | "Completed"
}

const BookingSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    sportId: { type: String, required: true },
    slotId: { type: Schema.Types.ObjectId, required: true, ref: "Slot" },
    status: {
      type: String,
      enum: ["Booked", "Cancelled", "Completed"],
      default: "Booked",
    },
  },
  { timestamps: true }
)

export default mongoose.model<IBooking>("Booking", BookingSchema)
