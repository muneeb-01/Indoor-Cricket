import express from "express";
import { addSlot, getAvailableSlots } from "../controllers/slotController";
import { authenticateToken } from "../middleware/auth";
import { admin } from "../middleware/admin";


const router = express.Router();

// create a slot (admin only)
router.post("/create", authenticateToken, admin, addSlot);


// get available slots for sport + date
router.get("/available", getAvailableSlots);


export default router;