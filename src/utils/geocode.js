const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ2F6enU4MzE4IiwiYSI6ImNsdmNwNGh6OTBtYzUycXBibDY3aHFqa24ifQ.Yn0TzzY8WZdXG2eGPCLLoQ`
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (response?.body?.features?.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { center, place_name } = response?.body?.features?.[0] || {};
            callback(undefined, {
                latitude: center?.[1],
                longitude: center?.[0],
                location: place_name,
                address
            });
        }
    });
};

module.exports = geocode;
