import supertest from 'supertest';
import { eventPayLoad } from './../utils';

const request = supertest('http://127.0.0.1:3000');
jest.setTimeout(30000);

describe('Event API', () => {

  it('should create events using /events endpoint', async () => {
    for (const event of eventPayLoad) {
      const response = await request.post('/events/').send(event);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({});
    }
  });

  it('should get all events using /events endpoint', async () => {
    const response = await request.get('/events');
    expect(response.status).toBe(200);
  });

  it("should get all actor's events by actor id", async () => {
    const actorId = 2790311;
    const response = await request.get(`/events/actors/${actorId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 4055191679,
        type: 'PushEvent',
        actor: {
          id: 2790311,
          login: 'daniel33',
          avatar_url: 'https://avatars.com/2790311',
        },
        repo: {
          id: 352806,
          name: 'johnbolton/exercitationem',
          url: 'https://github.com/johnbolton/exercitationem',
        },
        created_at: '2015-10-03 06:13:31',
      },
    ]);
  });

  it('should delete all events using /erase endpoint', async () => {
    const response = await request.delete('/events/erase');
    expect(response.status).toBe(200);

    // Check if the resource is empty
    const getResponse = await request.get('/events');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual([]);
  });
});
