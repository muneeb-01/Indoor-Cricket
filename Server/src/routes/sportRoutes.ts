import express from "express"
import { sports } from "../data/sport"

const router = express.Router()

// GET static sports
router.get("/", (_req, res) => {
  res.json(sports)
})

export default router
