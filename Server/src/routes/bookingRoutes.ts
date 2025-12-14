import express from "express";
import { bookSlot, getUserBookings, getAllBookings, cancelBooking } from "../controllers/bookingController";
import { authenticateToken } from "../middleware/auth";
import { admin } from "../middleware/admin";


const router = express.Router();


router.post("/", authenticateToken, bookSlot);
router.get("/me", authenticateToken, getUserBookings);


// admin routes
router.get("/", authenticateToken, admin, getAllBookings);
router.delete("/:bookingId", authenticateToken, admin, cancelBooking);


export default router;