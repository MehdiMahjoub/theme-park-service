import { Ride } from '../types/Ride';
import { getRidesData } from '../services/ride-services';

export const getRidesByPark = async (parkName: string): Promise<{ operating: Ride[], closed: Ride[] }> => {
    try {
        const rides = await getRidesData();
        const operating: Ride[] = [];
        const closed: Ride[] = [];

        rides.forEach(ride => {
            if (ride.location.toLowerCase() === parkName.toLowerCase()) {
                const status = ride.status ? ride.status.toLowerCase() : '';
                const isOpen = status === 'operating' || (status === '' && !ride.closing_date);

                if (isOpen) {
                    operating.push(ride);
                } else {
                    closed.push(ride);
                }
            }
        });

        return { operating, closed };
    } catch (error) {
        throw new Error('Failed to fetch rides data');
    }
};

const extractMaxCmValue = (str: string = ''): number => {
    const regex = /(\d+)\s*cm/g;
    let maxCmValue = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
        const cmValue = parseInt(match[1], 10);
        if (cmValue > maxCmValue) {
            maxCmValue = cmValue;
        }
    }

    return maxCmValue;
};

export const findBestParkByHeight = async (height: number): Promise<{ park: string, count: number }> => {
    try {
        const rides = await getRidesData();
        const parkRideCounts: { [key: string]: number } = {};

        rides.forEach(ride => {
            const maxHeightRestriction = extractMaxCmValue(ride.height_restriction || '');

            if ((maxHeightRestriction === 0 || maxHeightRestriction <= height) && ride.status.toLowerCase() === 'operating') {
                const park = ride.location;
                if (park in parkRideCounts) {
                    parkRideCounts[park]++;
                } else {
                    parkRideCounts[park] = 1;
                }
            }
        });

        let maxRides = 0;
        let bestPark = '';

        for (const park in parkRideCounts) {
            if (parkRideCounts[park] > maxRides) {
                maxRides = parkRideCounts[park];
                bestPark = park;
            }
        }

        return { park: bestPark, count: maxRides };
    } catch (error) {
        throw new Error('Failed to fetch rides data');
    }
};

export const findExtremeRides = async (): Promise<{ fastest: Ride | null, highest: Ride | null }> => {
    try {
        const rides = await getRidesData();
        let fastestRide: Ride | null = null;
        let highestRide: Ride | null = null;

        rides.forEach(ride => {
            if (ride.status.toLowerCase() === 'operating') {
                if (!fastestRide || (ride.speed1_value && ride.speed1_value > (fastestRide.speed1_value || 0))) {
                    fastestRide = ride;
                }
                if (!highestRide || (ride.height_value && ride.height_value > (highestRide.height_value || 0))) {
                    highestRide = ride;
                }
            }
        });

        return { fastest: fastestRide, highest: highestRide };
    } catch (error) {
        throw new Error('Failed to fetch rides data');
    }
};
