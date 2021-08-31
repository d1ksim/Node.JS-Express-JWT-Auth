import express from 'express';
import helmet from 'helmet';
//import {authRouter} from './router/auth.js';
import { router } from './router/index.js'
import bodyParser from "body-parser";
import { config } from 'dotenv';

config();

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', router);
//app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => { console.log('Проект запущен'); });