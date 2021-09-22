import mongoose from 'mongoose';

const observationSchema = mongoose.Schema({

    location: {
        station: { type: String, unique: true, require: true },
        coord: {
            lon: {type: Number, min: -1000, max: 1000, required: true },
            lat: {type: Number, min: -1000, max: 1000, required: true }
        }


    },

    temperature: Number,
    pressure: Number,
    humidity: Number,
    feelslike: Number,
    uvIndex: Number,
    wind: {
        speed: Number,
        degree: Number
    },

    clouds: {
        cloudcover: Number
    },
    observationDate: Date,
    hexMatrix: [String, String, String, String, String]

},{
    collection: 'observations',
    strict: 'throw',

});

export default mongoose.model('Observation', observationSchema);