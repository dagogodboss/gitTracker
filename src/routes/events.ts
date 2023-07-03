import express from 'express';
import {
  createEvent,
  getAllEvents,
  eraseEvents,
  getByActor,
} from '../controllers/events.controller';
import { ValidatorMiddleware } from '../middleware/ValidatorMiddleware';
import { EventDto } from '../dto/event.dto';
const router = express.Router();

router.post('/', ValidatorMiddleware(EventDto), createEvent);
router.get('/', getAllEvents);
router.get('/actors/:actorID', getByActor);
router.delete('/erase', eraseEvents);

export default router;
