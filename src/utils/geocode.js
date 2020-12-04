const request = require('postman-request');


const  geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidHltb2xvbG8iLCJhIjoiY2tob3NqYXl6MTQwNTMybXhtYjRhZ2c2ayJ9.GXe7qokN-J6A5_FO2e-pTQ`;

    request({url, json:true}, (error, {body:{features}} = response) => {
        if(error){
            callback("Unable to connect to mapbox service!", undefined);
        } else if(features.length === 0){
            callback('Wrong name city', undefined)
        } else{
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                city: features[0].place_name
            })
        }
    });
};

module.exports = geocode;