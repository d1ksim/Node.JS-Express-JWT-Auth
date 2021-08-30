import express from 'express';
import helmet from 'helmet';
import {authRouter} from './routes/auth.js';
import bodyParser from "body-parser";

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', authRouter);

app.listen(2001, () => { console.log('Проект запущен'); });