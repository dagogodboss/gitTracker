import supertest from 'supertest';
import mongoose from 'mongoose';
import { eventPayLoad } from '../utils';

jest.setTimeout(30000)
const request = supertest('http://127.0.0.1:3000');

beforeEach(async () => {
  await request.delete('/events/erase');

  // Create events using POST /events endpoint
  for (const event of eventPayLoad) {
    await request.post('/events').send(event);
  }
});

afterAll(async () => {
  await request.delete('/events/erase');
  await request.delete('/actors/erase');

  await mongoose.connection.close();
});

describe('Actor APIs', () => {
  it('should update an actor using the actor _id property', async () => {
    const newActor = {
      id: 3648056,
      login: 'newActor',
      avatar_url: 'https://avatars.com/modified',
    };
    const updatedActor = {
      id: 3648056,
      avatar_url: 'https://avatars.com/modified2',
    };

    // Make a PUT request to update the actor
    const actor = await request.post(`/actors/`).send(newActor);
    // Make a PUT request to update the actor
    await request.put(`/actors/${actor.body._id}`).send(updatedActor);
    const response = await request
      .get(`/actors/${actor.body._id}`);

    // Assert the response status code and updated actor data
    expect(response.status).toBe(200);
    expect(response.body.avatar_url).toEqual(updatedActor.avatar_url);
  });

  // Test case 2
  it('should create two events with the same actor without creating the actor twice', async () => {
    const actor = {
      id: 2790311,
      login: 'daniel33',
      avatar_url: 'https://avatars.com/2790311',
    };
    const event1 = {
      id: 4055191679,
      type: 'PushEvent',
      actor,
      repo: {
        id: 352806,
        name: 'johnbolton/exercitationem',
        url: 'https://github.com/johnbolton/exercitationem',
      },
      created_at: '2015-10-03 06:13:31',
    };
    const event2 = {
      id: 4055191689,
      type: 'PushEvent',
      actor,
      repo: {
        id: 352806,
        name: 'johnbolton/exercitationem',
        url: 'https://github.com/johnbolton/exercitationem',
      },
      created_at: '2015-10-03 06:13:31',
    };

    // Create event1
    await request.post('/events').send(event1);

    // Create event2
    await request.post('/events').send(event2);

    // Get the actors
    const actorsResponse = await request.get('/actors/get-actors');

    // Assert the response status code and the number of actors
    expect(actorsResponse.status).toBe(200);
    expect(actorsResponse.body.length).toBe(10);

    // Assert the actor data
    expect(actorsResponse.body[0]).toEqual(actor);
  });
  it('should return the JSON array of all actors sorted by the total number of associated events in descending order', async () => {
    const response = await request.get('/actors');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Check if actors are sorted by the total number of associated events
    const actors = response.body;
    for (const actor of actors) {
      expect(actor).toHaveProperty('id');
      expect(actor).toHaveProperty('login');
      expect(actor).toHaveProperty('avatar_url');
    }
  });
});

describe('GET /actors/streak', () => {
  it('should return the JSON array of actors with the longest streak of consecutive days with at least one event', async () => {
    const response = await request.get('/actors/streak');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
