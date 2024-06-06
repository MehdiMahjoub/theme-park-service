# Theme Park Service API
This API exports information about theme parks and their attractions. 

## Installation
```bash
git clone <votre-repository-git>
cd <nom-du-dossier>
npm install
```

### Start server

Start the development server:

`npm run dev`

The API should now be running on http://localhost:3000

### Running the Tests

`npm test`

### API Endpoints

### GET /v1/status/:parkName

Returns the operating and closed rides for a given park.

- **Parameter:**
  - `parkName`: Park Name
- **Response:**
  - `operating`: List of operating rides
  - `closed`: List of closed rides


### GET /v1/most-rides/:height

Returns the park with the number of accessible rides for a certain height.

- **Parameter:**
  - `height`: Height in cm
- **Response:**
  - `park`: Park Name
  - `count`: Number of accessible rides


### GET /v1/extreme-rides

Returns the fastest and highest rides.

- **Response:**
  - `fastest`: Fastest ride
  - `highest`: Highest ride


