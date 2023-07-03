import express from 'express';
import {
  createActor,
  getActors,
  updateActor,
  eraseActors,
  deleteActor,
  getActorById,
  getActorStreak,
  getActorsOrderedByTotalEvents,
} from '../controllers/actors.controller';
import { ValidatorMiddleware } from '../middleware/ValidatorMiddleware';
import { ActorDto } from '../dto/actor.dto';

const router = express.Router();

router.post('/', ValidatorMiddleware(ActorDto), createActor);
router.get('/', getActorsOrderedByTotalEvents);
router.get('/get-actors', getActors);
router.get('/streak', getActorStreak);
router.get('/:id', getActorById);
router.put('/:id', updateActor);
router.delete('/:id', deleteActor);
router.delete('/erase', eraseActors); // erase all actors

export default router;
