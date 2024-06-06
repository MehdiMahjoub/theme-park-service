import express, { NextFunction, Request, Response } from "express";
import rideRoutes from "./routes/ride-routes";
import { errorHandler } from './utils/errorHandler';


const app = express();

app.use(express.json());

app.use("/v1", rideRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

export default app;