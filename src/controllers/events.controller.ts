import { Request, Response } from 'express';
import EventModel from '../models/events.model';
import { EventDto, EventResponseDTO } from '../dto/event.dto';
import ActorModel from '../models/actors.model';
import RepoModel from '../models/repo.model';

// POST /events
export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const requestPayload: EventDto = req.body;

    const eventExist = await EventModel.findOne({ id: requestPayload.id });
    if (eventExist) {
      throw new Error('Event already exists');
    }

    const [actor, repo] = await Promise.all([
      ActorModel.findOrCreateActor(
        requestPayload.actor.id,
        requestPayload.actor
      ),
      RepoModel.findOrCreateRepo(requestPayload.repo.id, requestPayload.repo),
    ]);

    const event = new EventModel({
      ...requestPayload,
      actor: actor._id,
      repo: repo._id,
    });
    await event.save();

    res.status(201).end();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// GET /events
export const getAllEvents = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = (
      await EventModel.find().sort({ id: 'asc' }).populate(['actor', 'repo'])
    ).map((event) => toResponseDTO(event));
    res.status(200).json(events);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: `An error occurred while getting the event list` });
  }
};

export const getByActor = async (_req: Request, res: Response) => {
  try {
    const { actorID } = _req.params;

    const events = await EventModel.find({})
      .populate({
        path: 'actor',
        match: { id: actorID },
      })
      .sort({ id: 'asc' })
      .populate('repo');

    const filteredEvents = events.filter((event) => event.actor !== null);

    if (filteredEvents.length === 0) {
      res
        .status(404)
        .json({ message: `Events for actor with id ${actorID} not found` });
      return;
    }
    const result = filteredEvents.map((event) => toResponseDTO(event));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while getting the event list for Actor`,
    });
  }
};

// DELETE /erase
export const eraseEvents = async (_req: Request, res: Response) => {
  try {
    await EventModel.deleteMany();
    res.status(200).end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

function toResponseDTO(event: any): EventResponseDTO {
  return {
    id: event.id,
    type: event.type,
    actor: {
      id: event.actor.id,
      login: event.actor.login,
      avatar_url: event.actor.avatar_url,
    },
    repo: {
      id: event.repo.id,
      name: event.repo.name,
      url: event.repo.url,
    },
    created_at: event?.created_at,
  };
}
