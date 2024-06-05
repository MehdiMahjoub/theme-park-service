import axios from 'axios';
import { Ride, Rides } from "../types/Ride";

const DATA_URL =
    process.env.DATA_URL ||
    'https://gist.githubusercontent.com/Jurollet/12470631232f30a81ace67add5bf839a/raw/3c514d9618b98e58a870bb2f0f01fbe3221e03f5/rides.json';


export const getRidesData = async (): Promise<Ride[]> => {
    try {
        const response = await axios.get<Rides>(DATA_URL);
        return response.data.rides;
    } catch (error) {
        console.error('Error fetching rides data:', error);
        throw new Error('Failed to fetch rides data');
    }
};
