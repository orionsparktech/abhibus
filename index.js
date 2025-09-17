const express = require('express');
const app = express();

const mongoose = require('mongoose');
require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRoute = require('./routes/users');
const locationRoute = require('./routes/locations');
const stopRoute = require('./routes/stops');
const travelsRoute = require('./routes/travels');
const busRoute = require('./routes/bus');
const cronJobRoute = require('./routes/cronjob');
const imageRoute = require('./routes/image');
const hotelRoute = require('./routes/hotels');

app.use('/users', usersRoute);
app.use('/location', locationRoute);
app.use('/stop', stopRoute);
app.use('/travels', travelsRoute);
app.use('/bus', busRoute);
app.use('/cronjob', cronJobRoute);
app.use('/image', imageRoute);
app.use('/hotel', hotelRoute);

// Root Route
app.get('/check', (req, res) => {
    res.send('This is the root URL');
});

//Connect to DB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });


app.listen(process.env.PORT || 3000, function () {
    console.log("SERVER STARTED PORT: 3000");
}); 