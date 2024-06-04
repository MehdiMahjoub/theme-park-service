import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as rideModel from "../models/ride-model";

export const getRideByParkName = asyncHandler(
    async (req: Request, res: Response) => {
        const parkName = req.params.parkName;
        const rides = await rideModel.getRidesByPark(parkName);
        res.json(rides);
    }
);

export const getParkWithMostRidesForHeight = asyncHandler(
    async (req: Request, res: Response) => {
        const height = parseInt(req.params.height);
        const park = await rideModel.findBestParkByHeigth(height);
        res.json(park);
    }
);

export const getExtremeRides = asyncHandler(
    async (req: Request, res: Response) => {
        const extremeRides = await rideModel.findExtremeRides();
        res.send(extremeRides);
    }
);