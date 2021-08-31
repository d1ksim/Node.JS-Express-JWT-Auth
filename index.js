import express from 'express';
import helmet from 'helmet';
import { router } from './router/index.js'
import bodyParser from "body-parser";
import { config } from 'dotenv';
import { errorMiddleware } from "./middleware/error-middleware.js";

config();

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', router);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => { console.log(`Server started on port: ${process.env.PORT}`); });