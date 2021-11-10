import expressValidator from 'express-validator';
const { body } = expressValidator;

class PlanetValidors {

    partial() {
        //PATCH
        return [
            body('discoveryDate').optional()
                .isISO8601().withMessage('Doit être une date').bail()
                .isBefore(new Date().toISOString()).withMessage('Doit être dans le passée'),
            body('temperature').optional()
                .isNumeric().withMessage('La valeur d ela température doit être numérique'),
            body('satellites').optional()
                .isArray().withMessage('Les satellites doivent être une collection'),
            body('position.x').optional()
                .isFloat({ min: -1000, max: 1000 }).withMessage('La position en x doit être comprise entre -1000 et 1000'),
            body('position.y').optional()
                .isFloat({ min: -1000, max: 1000 }).withMessage('La position en y doit être comprise entre -1000 et 1000'),
            body('position.z').optional()
                .isFloat({ min: -1000, max: 1000 }).withMessage('La position en z doit être comprise entre -1000 et 1000')
            //isIn est il dedans
        ];

    }

    complete() {
        return [
            body('name').exists().withMessage('Le nom de la planète est requis'),
            body('discoreryDate').exists().withMessage('La date de découverte est requise'),
            body('temperature').exists().withMessage('La valeur de la temperature est requise'),
            body('position.x').exists().withMessage('La position en x est requise'),
            body('position.y').exists().withMessage('La position en y est requise'),
            body('position.z').exists().withMessage('La position en z est requise'),
            ... this.partial()
        ]
    }


}

export default new PlanetValidors();