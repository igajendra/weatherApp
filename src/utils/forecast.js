const request = require('request');

const forecast = (latitude, longitude, callback, address) => {
    const url = `http://api.weatherstack.com/current?access_key=47b0815aaad60213287e1cf19942d416&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response?.body?.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = response?.body?.daily?.data?.[0];
            const currently = response?.body.current;
            const summary = currently?.weather_descriptions;
            const temperature = currently?.temperature;
            const temperatureHigh = data?.temperatureHigh;
            const temperatureLow = data?.temperatureLow;
            const precipProbability = currently?.precip;

            // const forecastMessage = `${summary} It is currently ${temperature} degrees out. The high today is ${temperatureHigh} with a low of ${temperatureLow}. There is a ${precipProbability}% chance of rain.`;
            const forecastMessage = `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`;

            callback(undefined, forecastMessage, currently);
        }
    });
};

module.exports = forecast;
