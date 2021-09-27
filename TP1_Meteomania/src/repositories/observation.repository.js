import Observation from '../models/observation.model.js';

const ZERO_KELVIN = -273.15;
const ZERO_FAHRENHEIT = -459.67;

class ObservationRepository {

    retrieveAll(filter) {
        return Observation.find({ "location.station": filter.station });
    }

    retrieveById(idObservation) {
        return Observation.findById(idObservation);
    }

    transform(observation, transformOptions = {}) {
        if (transformOptions) {
            if (transformOptions.unit === 'c') {
                observation.temperature += ZERO_KELVIN;
                observation.temperature = parseFloat(observation.temperature.toFixed(2)); // Pour 2 chiffre apres la virgule
                observation.feelslike += ZERO_KELVIN;
                observation.feelslike = parseFloat(observation.temperature.toFixed(2));
            }
            if (transformOptions.unit === 'k') {
                observation.temperature = observation.temperature;
                observation.feelslike = observation.feelslike;

            }
            if (transformOptions.unit === 'f') {
                observation.temperature = observation.temperature - ZERO_FAHRENHEIT;
                observation.feelslike = observation.feelslike - ZERO_FAHRENHEIT;
            }
        }
        if (observation.wind.degree >= 337.5 && observation.wind.degree < 22.5) {
            observation.wind.direction = 'N';
        }
        else if (observation.wind.degree >= 22.5 && observation.wind.degree < 67.5) {
            observation.wind.direction = 'NE';
        }
        else if (observation.wind.degree >= 67.5 && observation.wind.degree < 112.5) {
            observation.wind.direction = 'E';
        }
        else if (observation.wind.degree >= 112.5 && observation.wind.degree < 157.5) {
            observation.wind.direction = 'SE';
        }
        else if (observation.wind.degree >= 157.5 && observation.wind.degree < 202.5) {
            observation.wind.direction = 'S';
        }
        else if (observation.wind.degree >= 202.5 && observation.wind.degree < 247.5) {
            observation.wind.direction = 'SW';
        }
        else if (observation.wind.degree >= 247.5 && observation.wind.degree < 292.5) {
            observation.wind.direction = 'W';
        }
        else if (observation.wind.degree >= 292.5 && observation.wind.degree < 337.5) {
            observation.wind.direction = 'NW';
        }



        return observation;
    }

    create(observation) {
        return Observation.create(observation);
    }


}


export default new ObservationRepository();