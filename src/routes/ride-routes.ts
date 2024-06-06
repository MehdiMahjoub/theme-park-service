import express from 'express';
import {
  getRideByParkName,
  getParkWithMostRidesForHeight,
  getExtremeRides,
} from '../controllers/ride-controllers';

const router = express.Router();

router.get('/status/:parkName', getRideByParkName);
router.get('/most-rides/:height', getParkWithMostRidesForHeight);
router.get('/extreme-rides', getExtremeRides);

export default router;
