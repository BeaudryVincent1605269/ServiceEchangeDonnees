import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';


import observationRepository from '../repositories/observation.repository.js';

const router = express.Router();

class ObservationsRoutes {
    constructor() {
        router.get('/', this.getAll);
        router.get('/:stationName', this.getAll);
        router.get('/:stationName/:idObservation', this.getOne);
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

        return next(HttpError.MethodNotAllowed());

    }

    async post(req, res, next) {
        const newObservation = req.body;


        if (Object.keys(newObservation).length === 0) {
            return next(HttpError.BadRequest('La station ne peut pas donner des information vide !'));
        }



        try {
            let observationAdded = await observationRepository.create(newObservation);
            observationAdded = observationAdded.toObject({ getters: false, virtuals: false });
            observationAdded = observationRepository.transform(observationAdded);



            res.status(HttpStatus.CREATED).json(observationAdded);
        } catch (err) {
            return next(err);
        }




    }

    async getAll(req, res, next) {

        const filter = {};



        if (req.params.stationName) {
            filter.station = req.params.stationName;
        }

        const transformOptions = {};
        if (req.query.unit) {
            const unit = req.query.unit;
            if (unit === 'm') {
                transformOptions.unit = unit;
            }
            else if (unit === 's') {
                transformOptions.unit = unit;
            }
            else if (unit === 'f') {
                transformOptions.unit = unit;
            }
            else {
                return next(HttpError.BadRequest('Le paramètre unit doit avoir la valeur c, f ou k'));
            }

        }

        try {

            let observations = await observationRepository.retrieveByName(filter);
            if (observations.length == 0) {
                return next(HttpError.BadRequest(`La station ${req.params.stationName} n'existe pas!`));
            }

            observations = observations.map(o => {
                o = o.toObject({ getter: false, virtuals: false });
                o = observationRepository.transform(o, transformOptions);
                return o;
            });

            res.status(200).json(observations);
        } catch (err) {
            return next(err);
        }

    }

    async getOne(req, res, next) {
        const idObservation = req.params.idObservation;
        const stationName = req.params.stationName;
        const transformOptions = {};

        if (req.query.unit) {
            const unit = req.query.unit;
            if (unit === 'm') {
                transformOptions.unit = unit;
            }
            else if (unit === 's') {
                transformOptions.unit = unit;
            }
            else if (unit === 'f') {
                transformOptions.unit = unit;
            }
            else {
                return next(HttpError.BadRequest('Le paramètre unit doit avoir la valeur m, s ou f'));
            }

        }

        try {
            let observation = await observationRepository.retrieveByNameAndId(stationName, idObservation);



            if (observation) {
                observation = observation.toObject({ getters: false, virtuals: false });
                observation = observationRepository.transform(observation, transformOptions);
                res.status(200).json(observation);
            }
            else {

                return next(HttpError.NotFound(`La station d'observation: ${idObservation} n'existe pas`));
            }
        } catch (err) {

            return next(err);
        }
    }



}

new ObservationsRoutes();

export default router;