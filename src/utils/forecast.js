const request = require('postman-request');

const forecast = (latitiude ,longitiude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1af4ac519f3aafa5b138793e7df0aa12&query=${latitiude},${longitiude}&units=m`;

    request({url, json : true}, (error, {body})=>{
        if(error){
            callback("Unable to connect to weather service!", undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            const {weather_descriptions, temperature, feelslike} = body.current
            callback(undefined, `${weather_descriptions}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out`)
        }
    });
}
module.exports = forecast;



