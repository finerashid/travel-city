require('dotenv').config();
require('./src/models/db');
require('dotenv').config();
require('./src/models/db');

require('./src/models/Country');
require('./src/models/City');
require('./src/models/Mosque');

const userRoutes = require('./src/routes/User');
const reviewRoutes = require('./src/routes/Review');
const userRoutes = require('./src/routes/User');
const reviewRoutes = require('./src/routes/Review');

const express = require('express');
const hotelRoutes = require("./src/routes/hotel")
const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./src/middlewares/notFound');
const transportOption = require('./src/routes/TransportOption')
const favoriteRoutes = require('./src/routes/favorite')
const restaurantRoutes = require("./src/routes/restaurant");
const cityRoutes = require("./src/routes/city");


const mosqueRoutes = require("./src/routes/mosque")

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/countries', countryRoutes);
app.use("/api/hotels", hotelRoutes)

app.get('/check', (req, res) => {
  res.json({
    success: true,
    message: 'Travel City Explorer API is running',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});
const localGuideRoutes = require('./src/routes/LocalGuide');
const visaInfoRoutes = require("./src/routes/VisaInfo")

app.use("/api/local-guides",localGuideRoutes);
app.use("/api/visa-info",visaInfoRoutes)
// TODO: EVERYONE CREATE YOUR ROUTES FROM HERE

app.use('/api/transport-option', transportOption);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/mosque", mosqueRoutes);

app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(notFound);
app.use('/api/culture-notes', noteRouter);

app.use("/api/travel-expenses", travelExpenseRoutes)

app.use("/api/auth", authRoutes)

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/cities", cityRoutes);


const placeRoutes = require("./src/routes/Place")
app.use("/api/places", placeRoutes);

const itineraryRoutes = require("./src/routes/TravelItinerary")
app.use("/api/travel-itineraries", itineraryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
