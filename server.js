
require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const indexRoutes = require('./routes/indexRoutes'); // Import indexRoutes
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;  
const cors = require('cors');

const app = express();
const port = 3001;


app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Atlas connection
//const connectionString = process.env.MONGOOSE_URI
//mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    //.then(() => {
       // console.log('Connected to MongoDB Atlas');
    //})
   // .catch((error) => {
    //    console.error('Error connecting to MongoDB Atlas:', error);
   // });

// Routes
app.use(indexRoutes); 
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});
app.use(cors({
    origin: `http://localhost:${port}`,
    credentials: true 
}));
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
