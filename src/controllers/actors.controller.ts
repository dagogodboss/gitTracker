import { Request, Response } from 'express';
import ActorModel from '../models/actors.model';
import { ActorDto } from '../dto/actor.dto';

export const createActor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const actorDto: ActorDto = req.body;
    const actor = await ActorModel.create(actorDto);
    res.status(201).json(actor);
  } catch (error: any) {
    console.error('Failed to create actor:', error);
    res.status(500).json({ message: `Failed to create actor: ${error.message}` });
  }
};

export const getActorsOrderedByTotalEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const actors = await ActorModel.aggregate([
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: 'actor',
          as: 'events',
        },
      },
      {
        $addFields: {
          totalEvents: { $size: '$events' },
          latestEvent: { $slice: ['$events', -1] },
        },
      },
      {
        $sort: {
          totalEvents: -1,
          'latestEvent.created_at': -1,
          login: 1,
        },
      },
    ]);

     const formattedActors = actors.map((actor: any) => {
       return {
         id: actor.id,
         login: actor.login,
         avatar_url: actor.avatar_url,
       };
     });

    res.json(formattedActors);
  } catch (error) {
    console.error('Failed to get actors:', error);
    res.status(500).json({ error: 'Failed to get actors' });
  }
};

export const getActors = async (req: Request, res: Response): Promise<void> => { 
  try {
    const actors = await (await ActorModel.find()).map((actor) => formatActor(actor));
    res.status(200).json(actors)
  } catch (error) {
    res.status(400).json({ error: 'Error Fetching Actors' });
  }
}

export const getActorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const actor = await ActorModel.findOne({ _id: req.params.id })
    res.status(200).json(actor)
  } catch (error) {
    res.status(400).json({ error: "Something went wrong, user resource not found"})
  }
}

export const updateActor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { avatar_url } = req.body;
    const actor = await ActorModel.findByIdAndUpdate(
      id,
      { avatar_url },
      { new: true }
    );
    if (actor) {
      res.status(200).end();
    } else {
      res.status(404).json({ error: 'Actor not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update actor' });
  }
};

export const deleteActor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const actor = await ActorModel.findByIdAndDelete(id);
    if (actor) {
      res.status(200).end();
    } else {
      res.status(404).json({ error: 'Actor not found' });
    }
  } catch (error) {
    console.error('Failed to delete actor:', error);
    res.status(400).json({ error: 'Failed to delete actor' });
  }
};

// GET /actors/streak
export const getActorStreak = async (_req: Request, res: Response) => {
  try {
    const actors = await ActorModel.aggregate([
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: 'actor',
          as: 'events',
        },
      },
      {
        $project: {
          _id: 0,
          id: 1,
          login: 1,
          avatar_url: 1,
          events: 1,
          streak: {
            $reduce: {
              input: '$events',
              initialValue: { count: 0, maxStreak: 0 },
              in: {
                count: {
                  $cond: {
                    if: {
                      $eq: [
                        {
                          $dateToString: {
                            date: { $toDate: '$$this.created_at' },
                            format: '%Y-%m-%d',
                          },
                        },
                        {
                          $dateToString: {
                            date: { $toDate: '$$value.date' },
                            format: '%Y-%m-%d',
                          },
                        },
                      ],
                    },
                    then: { $add: ['$$value.count', 1] },
                    else: 1,
                  },
                },
                maxStreak: {
                  $max: ['$$value.maxStreak', '$$value.count'],
                },
                date: {
                  $dateToString: {
                    date: { $toDate: '$$this.created_at' },
                    format: '%Y-%m-%d',
                  },
                },
              },
            },
          },
        },
      },
      { $sort: { 'streak.maxStreak': -1, 'events.created_at': -1, login: 1 } },
    ]);

    const formattedActors = actors.map((actor: any) => {
      return {
        id: actor.id,
        login: actor.login,
        avatar_url: actor.avatar_url,
      };
    });

    res.status(200).json(formattedActors);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


// DELETE /erase
export const eraseActors = async (_req: Request, res: Response) => {
  try {
    await ActorModel.deleteMany();
    res.status(200).end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


const formatActor = (actor: any) => {
  return {
    id: actor.id,
    login: actor.login,
    avatar_url: actor.avatar_url,
  };
}

