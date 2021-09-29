import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';
import planets from '../data/planets.js';
import PLANETS from '../data/planets.js';

import planetRepository from '../repositories/planet.repository.js';

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        router.get('/', this.getAll);
        router.get('/:idPlanet', this.getOne);
        router.post('/', this.post);
        router.delete('/:idPlanet', this.delete);
        router.patch('/:idPlanet', this.patch)
        router.put('/:idPlanet', this.put);
    }

    async patch(req, res, next) {
        try {
            let planet = await planetRepository.update(req.params.idPlanet, req.body);
            if (!planet) {
                return next(HttpError.NotFound(`La planete avec l'id ${req.params.idPlanet} n'existe pas`));
            }

            planet = planet.toObject({ getters: false, virtuals: false });
            planet = planetRepository.transform(planet);

            res.status(200).json(planet)
        } catch (err) {
            return next(err);
        }
    }

    put(req, res, next) {
        return next(HttpError.MethodNotAllowed());
    }

    async delete(req, res, next) {
        try {
            const deleteResult = await planetRepository.delete(req.params.idPlanet);
            if (!deleteResult) {
                return next(HttpError.NotFound(`La planete avec l'id ${req.params.idPlanet} n'existe pas`));
            }
            res.status(204).end();


        } catch {
            return next(err);
        }
    }

    async post(req, res, next) {
        const newPlanet = req.body;


        if (Object.keys(newPlanet).length() === 0) {
            return next(HttpError.BadRequest('El planeta no mucho conteno donnato'));
        }


        try {
            let planetAdded = await planetRepository.create(newPlanet);
            planetAdded = planetAdded.toObject({ getters: false, virtuals: false });
            planetAdded = planetRepository.transform(planetAdded);



            res.status(HttpStatus.CREATED).json(planetAdded);
        } catch (err) {
            return next(err);
        }




    }

    async getAll(req, res, next) {

        //On passe pas la query
        const filter = {};
        if (req.query.explorer) {
            filter.discoveredBy = req.query.explorer;
        }

        //Validation des parametres de la request
        const transformOptions = {};
        if (req.query.unit) {
            const unit = req.query.unit;
            if (unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(HttpError.BadRequest('Le paramètre unit doit avoir la valeur c pour Celsius'));
            }
        }



        try {
            let planets = await planetRepository.retrieveAll(filter);

            planets = planets.map(p => {
                p = p.toObject({ getter: false, virtuals: false });
                p = planetRepository.transform(p, transformOptions);
                return p;
            });

            res.status(200).json(planets);
        } catch (err) {
            return next(err);
        }


    }
    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;


        const transformOptions = {};
        if (req.query.unit) {
            const unit = req.query.unit;
            if (unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(HttpError.BadRequest('Le paramètre unit doit avoir la valeur c pour Celsius'));
            }
        }

        try {
            let planet = await planetRepository.retrieveById(idPlanet);
            // let planets;
            // for (let p of PLANETS) {    // foreach
            //     if (p.id == idPlanet) { // J'ai trouvé la planet  // == égalité === égalité et égalité de type ex int string etc
            //         planets = p;
            //         break;
            //     }
            // }

            // const planet = PLANETS.filter(p => p.id == idPlanet); // Filter fait une boucle jusqua temps que le p est égale au id
            //const planet = PLANETS.find(p => p.id == idPlanet); // Find en trouve 1 et arrete


            //Validation des parametres de la request



            //1.  J'ai une planete
            if (planet) {
                planet = planet.toObject({ getters: false, virtuals: false });
                planet = planetRepository.transform(planet, transformOptions);
                res.status(200).json(planet);
            }
            else {

                return next(HttpError.NotFound(`No planeta  : ${idPlanet} no Pingüino`));
            }
        } catch (err) {
            return next(err);
        }


    }
}

new PlanetsRoutes();

export default router;