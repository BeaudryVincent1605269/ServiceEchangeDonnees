import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';
import OBSERVATIONS from '../data/observations.js.js';

import planetRepository from '../repositories/observation.repository.js';

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        router.get('/', this.getAll);
        router.get('/:idObservation', this.getOne);
        router.post('/', this.post);
        router.delete('/:idObservation', this.delete);
        router.patch('/:idObservation', this.patch)
        router.put('/:idObservation', this.put);
    }









}