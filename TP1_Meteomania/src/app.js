import dayjs from 'dayjs';
import express from 'express';

import database from './libs/database.js';

import methodMiddleware from './middlewares/method.js';
import errorMiddleware from './middlewares/errors.js';

import observationsRoutes from './routes/observation.routes.js';


database();

const app = express();


app.use(express.json());
app.use(methodMiddleware);
app.use('/observations', observationsRoutes);



app.use(errorMiddleware);
export default app;