import axios from 'axios';
import { getRidesData } from '../../src/services/ride-services';
import { Ride, Rides } from '../../src/types/Ride';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Ride Services', () => {
    const mockRides: Rides = {
        rides: [
            {
                coaster_name: "Switchback Railway",
                length: "600 ft (180 m)",
                speed: "6 mph (9.7 km/h)",
                location: "Coney Island",
                status: "Removed",
                opening_date: "June 16, 1884",
                type: "Wood",
                manufacturer: "LaMarcus Adna Thompson",
                height_restriction: "",
                model: "Lift Packed",
                height: "50 ft (15 m)",
                inversions: "",
                lift_launch_system: "gravity",
                cost: "",
                trains: "",
                park_section: "Coney Island Cyclone Site",
                duration: "1:00",
                capacity: "1600 riders per hour",
                g_force: 2.9,
                designer: "LaMarcus Adna Thompson",
                max_vertical_angle: "30°",
                drop: "43 ft (13 m)",
                soft_opening_date: "",
                fast_lane_available: "",
                replaced: "",
                track_layout: "Gravity pulled coaster",
                fastrack_available: "",
                closing_date: "",
                opened: "",
                replaced_by: "",
                website: "",
                flash_pass_available: "",
                must_transfer_from_wheelchair: "",
                theme: "",
                single_rider_line_available: "",
                restraint_style: "",
                acceleration: "",
                restraints: "",
                year_introduced: 1884,
                latitude: 40.574,
                longitude: -73.978,
                type_main: "Wood",
                opening_date_clean: "1884-06-16",
                speed1: "6 mph",
                speed2: "9.7 km/h",
                speed1_value: 6,
                speed1_unit: "mph",
                speed_mph: 6,
                height_value: 50,
                height_unit: "ft",
                height_ft: "",
                inversions_clean: 0,
                gforce_clean: 2.9
            }
        ]
    };

    it('should fetch rides data successfully', async () => {
        mockedAxios.get.mockResolvedValue({ data: mockRides });

        const rides = await getRidesData();

        expect(rides).toBeInstanceOf(Array);
        expect(rides.length).toBe(1);
        expect(rides[0]).toHaveProperty('coaster_name', 'Switchback Railway');
    });

    it('should handle error while fetching rides data', async () => {
        const originalError = console.error;
        console.error = jest.fn();

        mockedAxios.get.mockRejectedValue(new Error('Network Error'));

        await expect(getRidesData()).rejects.toThrow('Failed to fetch rides data');

        console.error = originalError;
    });
});
