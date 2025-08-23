const express = require('express');
const app = express();

const mongoose = require('mongoose');
require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRoute = require('./routes/users');

app.use('/users', usersRoute);

// Root Route
app.get('/', (req, res) => {
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