import Planet from '../models/planet.model.js';
import objectToDotNotation from '../libs/database/objectToDotNotation.js';

const ZERO_KELVIN = -273.15;

class PlanetRepository {

    delete(idPlanet) {
        return Planet.findByIdAndDelete(idPlanet);
    }
    // put , patch
    update(idPlanet, planetModifs) {

        const planetToDotNotation = objectToDotNotation(planetModifs);
        return Planet.findByIdAndUpdate(idPlanet, planetToDotNotation, { new: true });

    }

    retrieveById(idPlanet) {
        return Planet.findById(idPlanet);
    }

    retrieveAll(filter) {

        // hard coding
        const testFilter = {
            discoveredBy: 'Skadex',
            temperature: { $gt: 240 },
            'position.y': { $lte: 500 }
        }
        //WHERE discoveredBy = 'Skadex' AND temperature > 240 AND position.y <= 500

        const testFilter2 = {
            $or: [{ discoveredBy: 'Skadex' }, // OU
            { temperature: { $gte: 240 } }
            ]
        }


        return Planet.find(filter);
    }

    create(planet) {
        return Planet.create(planet);
    }


    transform(planet, transformOptions = {}) {
        if (transformOptions) {
            if (transformOptions.unit === 'c') {
                planet.temperature += ZERO_KELVIN;
                planet.temperature = parseFloat(planet.temperature.toFixed(2)); // Pour 2 chiffre apres la virgule
            }
        }

        planet.discoveredDate = dayjs(planet.discoveredDate).format('YYYY-MM-DD');

        planet.lightspeed = `${planet.position.x.toString(16)}@${planet.position.y.toString(16)}#${planet.position.z.toString(16)}`;



        // observation.hex = {
        //     alpha:0,
        //     beta:1,
        //     gamma:0,
        //     delta:0
        // }

        delete planet.__v;


        return planet;
    }
}

export default new PlanetRepository();