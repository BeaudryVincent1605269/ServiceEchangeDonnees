import Planet from '../models/planet.model.js';

const ZERO_KELVIN = -273.15;

class PlanetRepository {

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

        delete planet.__v;


        return planet;
    }
}

export default new PlanetRepository();