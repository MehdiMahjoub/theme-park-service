import express, { NextFunction, Request, Response } from "express";
import rideRoutes from "./routes/ride-routes";

const app = express();

app.use(express.json());

app.use("/v1", rideRoutes);

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong",
    });
    next();
});

export default app;