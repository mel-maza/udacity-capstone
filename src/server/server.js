const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

// TODO: Hier evtl. Apis aufsetzen

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.listen(3000, () => {
    console.log('server is up - listening on port 3000');
})

// Routes
app.get('/', (req, res) => {res.sendFile('dist/index.html');})

app.post('/travelInfo', (req, res) => {
    // Get location info from Geonames
    const city = req.body.city;
    getLocationInfoForCity(process.env.GEO_URL + city + '&maxRows=1&username=' + process.env.GEO_USERNAME)
        .then(response => {console.log(response); res.send(response)});
})

// Fetch Functions
const getLocationInfoForCity = async (url = '') => {
    const response = await fetch(url);
    try {
        const locationData = await response.json();
        return locationData;
    } catch (error) {
        console.log('An error occurred while calling the GEOnames-API: ', error);
        throw error;
    }
}
