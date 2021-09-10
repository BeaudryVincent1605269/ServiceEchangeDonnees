import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';
import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        router.get('/planets', this.getAll);
        router.get('/planets/:idPlanet', this.getOne);
        router.post('/planets', this.post);
    }

    post(req, res, next) {
        const newPlanet = req.body;

        const planet = PLANETS.find(p => p.id == newPlanet.id);
        if (planet) {
            //Doublon del puguino (planet)
            return next(HttpError.Conflict(`La planète avec l'id ${newPlanet.id} existe déjà`));
        } else {

        }

        PLANETS.push(newPlanet);
    }

    getAll(req, res, next) {
        res.status(200); //Etape 1 = Status
        //res.set('Content-Type', 'application/json') // Etape 2 = Contenu de la réponse
        res.json(PLANETS); // Étape 3 = Envoyer les données

        //res.status(200).json(PLANETS);
    }
    getOne(req, res, next) {
        const idPlanet = req.params.idPlanet
        // let planets;
        // for (let p of PLANETS) {    // foreach
        //     if (p.id == idPlanet) { // J'ai trouvé la planet  // == égalité === égalité et égalité de type ex int string etc
        //         planets = p;
        //         break;
        //     }
        // }

        // const planet = PLANETS.filter(p => p.id == idPlanet); // Filter fait une boucle jusqua temps que le p est égale au id
        const planet = PLANETS.find(p => p.id == idPlanet); // Find en trouve 1 et arrete

        //1.  J'ai une planete
        if (planet) {
            res.status(200).json(planet);
        }
        else {

            return next(HttpError.NotFound(`No planeta  : ${idPlanet} no Pingüino`));
        }
        //2. pas de planete
        // if (!planet) {

        //  }

    }
}

new PlanetsRoutes();

export default router;