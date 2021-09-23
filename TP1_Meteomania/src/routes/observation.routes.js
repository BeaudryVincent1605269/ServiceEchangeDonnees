import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';


import observationRepository from '../repositories/observation.repository.js';

const router = express.Router();

class ObservationsRoutes {
    constructor() {
        router.get('/', this.getAll);
        router.get('/:idObservation', this.getOne);
        router.post('/', this.post);
        router.delete('/:idObservation', this.delete);
        router.patch('/:idObservation', this.patch)
        router.put('/:idObservation', this.put);
    }


    patch(req, res, next) {
        return next(HttpError.NotImplemented());
    }

    put(req, res, next) {
        return next(HttpError.MethodNotAllowed());
    }

    delete(req, res, next) {
        const index = PLANETS.findIndex(p => p.id == req.params.idPlanet); // params est une information passer dans l'url

        if (index === -1) {
            return next(HttpError.NotFound(`LA planète avec l'identifiant ${req.params.idPlanet} n'existe pas`))
        } else {
            PLANETS.splice(index, 1);

            res.status(204).end();
        }
    }

    async post(req, res, next) {
        const newPlanet = req.body;

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
    }

    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

    }


}

new ObservationsRoutes();

export default router;