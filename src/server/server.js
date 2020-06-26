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

// data
let travelData = {};

// Routes
app.get('/', (req, res) => {res.sendFile('dist/index.html');})

app.post('/travelInfo', (req, res) => {
    // Get location info from Geonames
    const city = req.body.city;
    travelData = {
        ...travelData,
        city
    }
    getLocationInfoForCity(process.env.GEO_URL + city + '&maxRows=1&username=' + process.env.GEO_USERNAME)
        .then(response => {
            console.log(response); 
            travelData = {
                ...travelData,
                longitude: response.geonames[0].lng,
                latitude: response.geonames[0].lat,
                country: response.geonames[0].countryName
            };
            getWeatherDataForLocation()
                .then((weatherResponse) => {
                    console.log('weather: ', weatherResponse);
                    travelData = {
                        ...travelData,
                        weather: {
                            temperature: weatherResponse.data[0].temp,
                            description: weatherResponse.data[0].weather.description
                        }
                    };
                    res.send(travelData);
                })
        });
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

const getWeatherDataForLocation = async () => {
    // TODO: Hier aufgrund des Datums entscheiden, welche URL aufgerufen werden muss
    const url = process.env.WEATHERBIT_URL_CURRENT + 'lat=' + travelData.latitude + '&lon=' + travelData.longitude + '&key=' + process.env.WEATHERBIT_API_KEY;
    const response = await fetch(url);
    try {
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log('An error occurred while calling the weatherbit-API: ', error);
        throw error;
    }
}
