import express, { type Request, type Response, type NextFunction } from "express" 
import {PORT} from "./config/env"
import cors from "cors";
import cookieParser from "cookie-parser";

import "./config/mongoose-connection";

import authRoutes from "./routes/auth-routes";
import sportRoutes from "./routes/sportRoutes";
import slotRoutes from "./routes/slotRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();
app.use(cookieParser());

app.use(cors());
app.use(express.json());


app.get("/", (_req, res) => res.json({ message: "Indoor Booking API" }));

app.use("/api/auth", authRoutes);
app.use("/api/sports", sportRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);


app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
console.error(err);
res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));