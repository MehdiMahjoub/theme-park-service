import * as rideModel from '../../src/models/ride-model';
import { getRidesData } from '../../src/services/ride-services';
import { Ride } from '../../src/types/Ride';

jest.mock('../../src/services/ride-services');
const mockedGetRidesData = getRidesData as jest.MockedFunction<
  typeof getRidesData
>;

describe('Ride Model', () => {
  const mockRides: Ride[] = [
    {
      coaster_name: 'Switchback Railway',
      length: '600 ft (180 m)',
      speed: '6 mph (9.7 km/h)',
      location: 'Coney Island',
      status: 'Removed',
      opening_date: 'June 16, 1884',
      type: 'Wood',
      manufacturer: 'LaMarcus Adna Thompson',
      height_restriction: '120 cm',
      model: 'Lift Packed',
      height: '50 ft (15 m)',
      inversions: '',
      lift_launch_system: 'gravity',
      cost: '',
      trains: '',
      park_section: 'Coney Island Cyclone Site',
      duration: '1:00',
      capacity: '1600 riders per hour',
      g_force: 2.9,
      designer: 'LaMarcus Adna Thompson',
      max_vertical_angle: '30°',
      drop: '43 ft (13 m)',
      soft_opening_date: '',
      fast_lane_available: '',
      replaced: '',
      track_layout: 'Gravity pulled coaster',
      fastrack_available: '',
      closing_date: '',
      opened: '',
      replaced_by: '',
      website: '',
      flash_pass_available: '',
      must_transfer_from_wheelchair: '',
      theme: '',
      single_rider_line_available: '',
      restraint_style: '',
      acceleration: '',
      restraints: '',
      year_introduced: 1884,
      latitude: 40.574,
      longitude: -73.978,
      type_main: 'Wood',
      opening_date_clean: '1884-06-16',
      speed1: '6 mph',
      speed2: '9.7 km/h',
      speed1_value: 6,
      speed1_unit: 'mph',
      speed_mph: 6,
      height_value: 50,
      height_unit: 'ft',
      height_ft: '',
      inversions_clean: 0,
      gforce_clean: 2.9,
    },
    {
      coaster_name: 'Flip Flap Railway',
      length: '',
      speed: '',
      location: 'Sea Lion Park',
      status: 'Operating',
      opening_date: '1895',
      type: 'Wood',
      manufacturer: 'Lina Beecher',
      height_restriction: '140 cm',
      model: '',
      height: '',
      inversions: '1',
      lift_launch_system: '',
      cost: '',
      trains:
        'a single car. Riders are arranged 1 across in 2 rows for a total of 2 riders per train.',
      park_section: '',
      duration: '',
      capacity: '',
      g_force: 12,
      designer: 'Lina Beecher',
      max_vertical_angle: '',
      drop: '',
      soft_opening_date: '',
      fast_lane_available: '',
      replaced: '',
      track_layout: '',
      fastrack_available: '',
      closing_date: '',
      opened: '',
      replaced_by: '',
      website: '',
      flash_pass_available: '',
      must_transfer_from_wheelchair: '',
      theme: '',
      single_rider_line_available: '',
      restraint_style: '',
      acceleration: '',
      restraints: '',
      year_introduced: 1895,
      latitude: 40.578,
      longitude: -73.979,
      type_main: 'Wood',
      opening_date_clean: '1895-01-01',
      speed1: '',
      speed2: '',
      speed1_value: 0,
      speed1_unit: '',
      speed_mph: 0,
      height_value: 0,
      height_unit: '',
      height_ft: '',
      inversions_clean: 1,
      gforce_clean: 12,
    },
  ];

  beforeEach(() => {
    mockedGetRidesData.mockResolvedValue(mockRides);
  });

  it('should get rides by park name', async () => {
    const rides = await rideModel.getRidesByPark('Coney Island');
    expect(rides.operating.length).toBe(0);
    expect(rides.closed.length).toBe(1);
  });

  it('should get operating and closed rides by park name', async () => {
    const rides = await rideModel.getRidesByPark('Sea Lion Park');
    expect(rides.operating.length).toBe(1);
    expect(rides.closed.length).toBe(0);
  });

  it('should find the best park by height', async () => {
    const result = await rideModel.findBestParkByHeight(130);
    expect(result).toEqual({ park: '', count: 0 });
  });

  it('should return no park for height restriction higher than allowed', async () => {
    const result = await rideModel.findBestParkByHeight(110);
    expect(result).toEqual({ park: '', count: 0 });
  });

  it('should find extreme rides', async () => {
    const result = await rideModel.findExtremeRides();
    expect(result).toEqual({
      fastest: mockRides[1],
      highest: mockRides[1],
    });
  });

  it('should handle rides with missing height and speed values', async () => {
    mockedGetRidesData.mockResolvedValue([mockRides[1]]);
    const result = await rideModel.findExtremeRides();
    expect(result).toEqual({
      fastest: mockRides[1],
      highest: mockRides[1],
    });
  });

  it('should handle empty ride data', async () => {
    mockedGetRidesData.mockResolvedValue([]);
    const result = await rideModel.findExtremeRides();
    expect(result).toEqual({
      fastest: null,
      highest: null,
    });
  });

  it('should handle error from getRidesData', async () => {
    mockedGetRidesData.mockRejectedValue(new Error('Network Error'));
    await expect(rideModel.getRidesByPark('Coney Island')).rejects.toThrow(
      'Failed to fetch rides data'
    );
  });
});
