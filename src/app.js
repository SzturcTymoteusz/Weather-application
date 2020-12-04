const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const paritalsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(paritalsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather app',
        name:'Tymek'
    });
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About',
        name:'Tymek'
    });
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        name:'Tymek'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude , city} = { }) => {
        if(error){
            return res.send({
                    error: error
                });
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                });
            }

            res.send({
                forecast: forecastData,
                location: city,
                address: req.query.address
            });
        });
    });
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'});
    } else{
        res.send({
            products: []
        })
    }

})

app.get('/help/*', (req,res) => {
    res.render('page404', {
        message: 'Help article not found',
        name: 'Tymek',
        title: 'Page 404'
    });
})

app.get('*', (req, res) => {
    res.render('page404', {
        message: 'Page not found',
        name: 'Tymek',
        title: 'Page 404'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});