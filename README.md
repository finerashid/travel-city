# Travel City Explorer API Boilerplate

A beginner-friendly Node.js, Express, MongoDB and Mongoose REST API project for a Travel Guide / City Explorer application.

This boilerplate is designed for a team exercise where each developer owns one model and writes CRUD APIs in their own Git branch.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- Git and GitHub branching workflow

## Project Structure

```txt
travel-city-explorer-api-boilerplate/
├── server.js
├── package.json
├── .env.example
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── ...15 controllers files
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── notFound.js
│   │   └── validateObjectId.js
│   ├── models/
│   │   └── ...15 model files
│   └── routes/
│       └── ...route files
└── docs/
    └── team-task-plan.md
```

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

```bash
cp .env.example .env
```

Update `.env` if needed:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/travel_city_explorer
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running locally.

### 4. Start the server

```bash
npm run dev
```

Server will run at:

```txt
http://localhost:5000
```

Health check:

```txt
GET http://localhost:5000/api/health
```

## Models Included

1. User
2. Country
3. City
4. Place
5. Mosque
6. Restaurant
7. Hotel
8. TravelItinerary
9. Review
10. Favorite
11. TransportOption
12. LocalGuide
13. CultureNote
14. VisaInfo
15. TravelExpense

## API Routes

| Model | Base Route |
|---|---|
| User | `/api/users` |
| Country | `/api/countries` |
| City | `/api/cities` |
| Place | `/api/places` |
| Mosque | `/api/mosques` |
| Restaurant | `/api/restaurants` |
| Hotel | `/api/hotels` |
| TravelItinerary | `/api/travel-itineraries` |
| Review | `/api/reviews` |
| Favorite | `/api/favorites` |
| TransportOption | `/api/transport-options` |
| LocalGuide | `/api/local-guides` |
| CultureNote | `/api/culture-notes` |
| VisaInfo | `/api/visa-info` |
| TravelExpense | `/api/travel-expenses` |

## CRUD Endpoints Expected From Each Developer

Each developer should implement these 5 APIs for their assigned model:

```txt
POST   /api/<resource>
GET    /api/<resource>
GET    /api/<resource>/:id
PUT/PATCH    /api/<resource>/:id
DELETE /api/<resource>/:id
```

## Branch Naming Rule

```bash
feature/<model_name>-<developer_name>
```

Examples:

```bash
feature/country-aamir
feature/city-faizan
feature/mosque-saqlain
feature/restaurant-ali
```

## Developer Task

Each developer should:

1. Create a branch using the required naming format.
2. Open their assigned controller file.
3. Implement all CRUD functions.
4. Test all APIs in Postman, Thunder Client, or Hoppscotch.
5. Commit changes each changes.
6. Push branch to GitHub.
7. Create a pull request for main branch.

## Example CRUD Logic

See:

```txt
src/controllers/_crudControllerTemplate.js
src/controllers/_sampleCompletedCountryController.js
```

The controller files currently return `501 Not Implemented`. That is intentional so each student can complete their own model CRUD.
