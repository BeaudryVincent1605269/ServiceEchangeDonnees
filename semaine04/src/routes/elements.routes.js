import express from 'express';
import HttpErrors from 'http-errors';
import HttpStatus from 'http-status';
import ELEMENTS from '../data/elements.js';

const router = express.Router();

class ElementsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);

    }

    getAll(req, res, next) {
        res.status(200); //Etape 1 = Status
        res.json(ELEMENTS); // Étape 3 = Envoyer les données
    }

    getOne(req, res, next) {
        const idElement = req.params.symbol

        const element = ELEMENTS.find(e => e.symbol == idElement); // Find en trouve 1 et arrete

        //1.  J'ai une planete
        if (element) {
            res.status(200).json(element);
        }
        else {

            return next(HttpErrors.NotFound(`No planeta  : ${idElement} no Pingüino`));
        }
    }

    post(req, res, next) {
        const newElement = req.body;

        const element = ELEMENTS.find(e => e.symbol == newElement.symbol);
        if (element) {
            //Doublon del puguino (planet)
            return next(HttpError.Conflict(`L'élément avec le symbol ${newElement.symbol} existe déjà`));
        } else {
            ELEMENTS.push(newElement);
            res.status(HttpStatus.CREATED).json(newElement);
        }

        ELEMENTS.push(newPlanet);

    }

    delete(req, res, next) {
        const index = ELEMENTS.findIndex(e => e.id == req.params.idElement); // params est une information passer dans l'url

        if (index === -1) {
            return next(HttpError.NotFound(`L'élément avec l'identifiant ${req.params.idElement} n'existe pas`))
        } else {
            ELEMENTS.splice(index, 1);

            res.status(204).end();
        }
    }
}

new ElementsRoutes();

export default router;