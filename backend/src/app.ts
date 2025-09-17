import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './api/routes';
import bodyParser from 'body-parser';
import { errorHandlers } from './errors';
import './lib/auth/auth.handlers';

const app = express();

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN,
  'http://localhost:4200',
]

app.use(cors({
  origin: (origin, callback) => {
    // Permetti richieste da origine assente (es. Postman) o da quelle incluse
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}));

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use(errorHandlers);

export default app;
