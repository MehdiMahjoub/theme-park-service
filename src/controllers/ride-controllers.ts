import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import * as rideModel from '../models/ride-model';

export const getRideByParkName = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parkName = req.params.parkName;
            if (!parkName) {
                res.status(400).json({ message: 'Park name is required' });
                return;
            }
            const rides = await rideModel.getRidesByPark(parkName);
            res.json(rides);
        } catch (error) {
            next(error);
        }
    }
);

export const getParkWithMostRidesForHeight = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const height = parseInt(req.params.height);
            if (isNaN(height)) {
                res.status(400).json({ message: 'Height must be a valid number' });
                return;
            }
            const park = await rideModel.findBestParkByHeight(height);
            res.json(park);
        } catch (error) {
            next(error);
        }
    }
);

export const getExtremeRides = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const extremeRides = await rideModel.findExtremeRides();
            res.json(extremeRides);
        } catch (error) {
            next(error);
        }
    }
);
