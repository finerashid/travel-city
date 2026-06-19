require('dotenv').config();
require('./src/models/db');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./src/middlewares/notFound');
const cityRoutes = require("./src/routes/city");

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

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

// TODO: EVERYONE CREATE YOUR ROUTES FROM HERE

app.use("/api/cities", cityRoutes);



app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
