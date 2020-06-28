const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('dist'));

// data
let travelData = {};

// Routes
app.get('/', (req, res) => {res.sendFile('dist/index.html');})

app.post('/travelInfo', async (req, res) => {
    // Get location info from Geonames
    const city = req.body.city;
    const countdown = getCountdown(req.body.date);
    travelData = {
        ...travelData,
        city,
        date: req.body.date,
        countdown
    }

    // call GEONAMES
    try {
        const locationResponse = await getLocationInfoForCity();
        travelData = {
            ...travelData,
            longitude: locationResponse.geonames[0].lng,
            latitude: locationResponse.geonames[0].lat,
            country: locationResponse.geonames[0].countryName
        };
    } catch (error) {
        console.log('An error occurred while calling the GEOnames-API: ', error);
        throw error;
    }

    // call WEATHERBIT
    try {
        const weatherResponse = await getWeatherDataForLocation();
        travelData = {
            ...travelData,
            weather: {
                temperature: weatherResponse.temp,
                description: weatherResponse.weather.description
            }
        };
    } catch (error) {
        console.log('An error occurred while calling the weatherbit-API: ', error);
        return error;
    }

    // call PIXABAY
    try {
        const imageResponse = await getImageForLocation(travelData.city);
        travelData = {
            ...travelData,
            image: imageResponse
        }
    } catch (error) {
        console.log('An error occurred while calling the pixabay-API: ', error);
        throw error;
    }
            
    // send all travelData
    res.send(travelData);

})

// Helper Functions
const getCountdown = (dateString) => {
    const splittedDateString = dateString.split('-');
    const travelDate = new Date(splittedDateString[0], splittedDateString[1] - 1, splittedDateString[2]);
    const dif = travelDate.getTime() - Date.now();
    return Math.round(dif / (1000*60*60*24));
}

const getWeatherforTravelDate = (weatherData) => {
    let result = weatherData.data[0];
    weatherData.data.map((currentWeatherData) => {
        if (currentWeatherData.valid_date === travelData.date) {
            result = currentWeatherData; 
        }
    })
    return result;
}

// Fetch Functions
const getLocationInfoForCity = async () => {
    // complete URL used: http://api.geonames.org/searchJSON?q={city}&maxRows=1&username={username}
    const url = `${process.env.GEO_URL}${travelData.city}&maxRows=1&username=${process.env.GEO_USERNAME}`;
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
    // depending on the countdown the current weather or the forecast weather needs to be fetched
    // complete current URL used: https://api.weatherbit.io/v2.0/current?lat={latitude}&lon={longitude}&key={API_KEY}
    let weatherbitURL = process.env.WEATHERBIT_URL_CURRENT;
    if (travelData.countdown > 7) {
        // complete forecast URL used: https://api.weatherbit.io/v2.0/forecast/daily?lat={latitude}&lon={longitude}&key={API_KEY}
        weatherbitURL = process.env.WEATHERBIT_URL_FORECAST;
    }
    const url = `${weatherbitURL}lat=${travelData.latitude}&lon=${travelData.longitude}&key=${process.env.WEATHERBIT_API_KEY}`;
    const response = await fetch(url);
    try {
        const weatherData = await response.json();
        if (travelData.countdown > 7) {
            return getWeatherforTravelDate(weatherData);
        }
        return weatherData.data[0];
    } catch (error) {
        console.log('An error occurred while calling the weatherbit-API: ', error);
        return error;
    }
}

const getImageForLocation = async (searchParameter) => {
    console.log('getting image for:', searchParameter);
    // complete URL used: https://pixabay.com/api/?image_type=photo&key={API_KEY}&q={searchParamter}
    // searchParameter is city in first place and country in second place, if an image for the city is not found
    const url = `${process.env.PIXABAY_URL}&key=${process.env.PIXABAY_API_KEY}&q=${searchParameter.replace(' ', '+')}`;
    const response = await fetch(url);
    try {
        const imageData = await response.json();
        if (imageData.hits && imageData.hits.length > 0) {
            return imageData.hits[0].webformatURL;
        }
        return getImageForLocation(travelData.country);
    } catch (error) {
        console.log('An error occurred while calling the pixabay-API: ', error);
        throw error;
    }
}

app.listen(3000, () => {
    console.log('server is up - listening on port 3000');
})
