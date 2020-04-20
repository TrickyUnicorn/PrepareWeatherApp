const {Trip} = require('./model');
const {sign} = require('../../services/jwt');
const got = require('got');

const apiKey = process.env.API_KEY;
console.log(process.env);

const createTrip = async (req, res, next) => {
    // Pogoda z API
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + req.body.location +'&appid=' + process.env.API_KEY;
    let weathers = {};
    //console.log(url);

    try {

        const response = await got(url, {responseType: 'json', resolveBodyOnly: true});

        const trip = await Trip.create({
            location: req.body.location,
            description: req.body.description,
            weather: {
                location: req.body.location,
                forecast: response
            }
        });

        return res.status(201).json({
            trip: {
                trip_id: trip.trip_id,
                location: trip.location,
                description: trip.description,
                weather: trip.weather
            }
        })

    } catch(e) {
        return next(e);
    }};

const getTrip = async (req, res, next) => {
    try {
        Trip.findOne({ trip_id: req.params.id }).then((trip) => {
            if (trip === null) {
                return res.status(410).json({error: 'No trip found'});
            }
            return res.status(200).json({
                trip: {
                    trip_id: trip.trip_id,
                    location: trip.location,
                    description: trip.description,
                    weather: trip.weather
                }
            });
        });
    } catch(e) {
        return next(e);
    }
};

const getTrips = async (req, res, next) => {
    try {

        await Trip.find({}, (err, trips) => {
            let returnData = {};

            trips.forEach((trip) => {
                returnData['trip' + trip.trip_id] = {
                    trip_id: trip.trip_id,
                    location: trip.location,
                    description: trip.description,
                    weather: trip.weather
                }
            });
            res.status(200).json(returnData);
        });

    } catch(e) {
        return next(e);
    }
};

const updateTrip = async (req, res, next) => {

    try {
        const trip = await Trip.findOne({trip_id: req.params.id});
        if(trip){
            trip.location = req.body.location;
            trip.description = req.body.description;

            // Pogoda API

            await trip.save();
            return res.status(200).json({message: "Updated"});
        }
        return res.status(404).json({error: "Trip not found"});

    } catch (e) {
        next(e)
    }

};

const deleteTrip = async (req, res, next) => {
    try {
        const trip = await Trip.findOne({trip_id: req.params.id});
        if(trip){
            await trip.remove();
            return res.status(202).json({message: "Deleted"});
        }
        return res.status(404).json({error: "Trip not found"});

    } catch (e) {
        next(e)
    }
};

module.exports = {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip
};