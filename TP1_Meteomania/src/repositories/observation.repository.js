import dayjs from 'dayjs';
import Observation from '../models/observation.model.js';

const ZERO_KELVIN = -273.15; // L'équivalent de 0 Kelvin en Celsius
const ZERO_FAHRENHEIT = -459.67; // L'équivalent de 0 kelvin en Fahrenheit

class ObservationRepository {

    retrieveByName(filter) {

        return Observation.find(filter.station ? { 'location.station': filter.station } : {}); // Retourne les stations du même nom ou retourne un objet vide

    }

    retrieveById(idObservation) {
        return Observation.findById(idObservation);
    }

    async retrieveByNameAndId(stationName, idObservation) {

        let observation = await this.retrieveById(idObservation);

        // Ce if la regarde si l'observation est bonne.
        // Si observation = undefined , c'est parceque le retrieveById as rien trouver avec 'idObservation'
        // ^ si ton idObservation est pas bonne en fait.
        if (observation) {

            // Si le nom passer en parametre est le meme que celui de l'observation trouver par l'id ,
            // on lui retourne l'observation
            if (stationName == observation.location.station)
                return observation
        }

        // On met pas de else , car si les noms de stations sont pareils , on return avec l'observation.
        // Cependant , si on trouve rien OU que l'observation de correspont pas , on va se rendre a ce
        // dernier return la qui est valide pour les deux cas.
        return undefined

    }

    transform(observation, transformOptions = {}) {
        if (transformOptions) {
            if (transformOptions.unit === 'm') {
                observation.temperature += ZERO_KELVIN;
                observation.temperature = parseFloat(observation.temperature.toFixed(2)); // Pour 2 chiffre apres la virgule
                observation.feelslike += ZERO_KELVIN;
                observation.feelslike = parseFloat(observation.temperature.toFixed(2));
            }
            if (transformOptions.unit === 's') {
                observation.temperature = observation.temperature;
                observation.feelslike = observation.feelslike;

            }
            if (transformOptions.unit === 'f') {
                observation.temperature = observation.temperature += ZERO_FAHRENHEIT;
                observation.temperature = parseFloat(observation.temperature.toFixed(2));
                observation.feelslike = observation.feelslike += ZERO_FAHRENHEIT;
                observation.feelslike = parseFloat(observation.temperature.toFixed(2));
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

        observation.observationDate = dayjs(observation.observationDate).format('YYYY-MM-DD');

        // Méthode trouvé sur l'internet :
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
        let a = parseInt(observation.hexMatrix[0], 16);
        let b = parseInt(observation.hexMatrix[1], 16);  // Prend un string et le convertie en hexadécimal
        let c = parseInt(observation.hexMatrix[2], 16);  // Ici Prend l'élément x du tableau et le convertie
        let d = parseInt(observation.hexMatrix[3], 16);
        let e = parseInt(observation.hexMatrix[4], 16);

        observation.hex = {};

        observation.hex.alpha = a + b + c + d + e;
        observation.hex.beta = a * b * c * d * e;
        observation.hex.gamma = observation.hex.beta / observation.hex.alpha;
        observation.hex.delta = observation.hex.beta % observation.hex.alpha;

        delete observation.hexMatrix;

        return observation;
    }

    create(observation) {
        return Observation.create(observation);
    }


}


export default new ObservationRepository();