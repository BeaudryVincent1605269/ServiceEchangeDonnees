import Planet from '../models/planet.model.js';

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

}

export default new PlanetRepository();