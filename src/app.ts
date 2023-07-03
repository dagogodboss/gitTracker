import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

import actorsRouter from './routes/actors';
import eventsRouter from './routes/events';
import path from 'path';

const swaggerFilePath = './../swagger/swagger.yaml'; 
const app = express();
const swaggerFileContent = fs.readFileSync(
  path.resolve(__dirname, swaggerFilePath),
  'utf8'
);

const swaggerDocument = yaml.load(swaggerFileContent) as JsonObject; // Cast to JsonObject

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Software Swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/actors', actorsRouter);
app.use('/events', eventsRouter);

export default app;
