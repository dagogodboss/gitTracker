# gitTracker

gitTracker is a simple event tracker on Git Repos, the software keeps track of actors and their repo with respect to the event sent to the repo.

## Features

- It is a RestAPI that allows the storage of git event
  - Create Event
  - Update Actor Avatar
  - Get Events by Actor
  - Create Actor and Repo
  - Get Actor by Streaks(total number of consecutive days actor has pushed an event to the system in  descending order)
  - Get Actors ordered by the number of event pushed in descending order
  - Get All Events available
  - Delete all the event or Actors
- Unit Tests using Jest and supertest
- API-DOC with openAPI 3.0.0 swagger, using swagger Yaml file.

## Requirements

- [Nodejs from v12](https://nodejs.dev/en/download/)
- [MongoDb installed](https://www.mongodb.com/docs/manual/administration/install-community/)
- [Typescript](https://www.typescriptlang.org/download)
- [ExpressJs](https://expressjs.com/en/starter/installing.html)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

## Installation

To install clone this git repo

```bash
git clone https://github.com/dagogodboss/gitTracker
```

```bash
cd gitTracker && yarn 
```

## Environment Variables

To be able to use the app you need to copy .env.example file to .env file, it will holds the required variables to run the server

```bash
cp .env.example .env
```

## Usage

After installing gitTracker, you can use it by running the dev server.

``` bash
yarn dev
```

To run the uint test the dev server has to be running then you run the bash command on a separate terminal

```bash
yarn test
```

### Options

- `yarn build`: Generate a build directory folder for the production server this should be called before `yarn start`.
- `yarn start`: To mock a production server of the application
- `yarn lint`: To lint all the files in the src folder to follow the eslint rules.

## Documentation

To see the Documentation generated for this service goto

``` bash
http:127.0.0.1:3000:/api-docs
```

## The API

This is the documentation for Your API, which provides endpoints for managing actors and events.

## Endpoints

### Create an Actor

Create a new actor.

- **URL**: `/actors`
- **Method**: `POST`
- **Request Body**: ActorDto
- **Response**: 200 (Actor created successfully)

### Get All Actors Ordered by Total Events

Retrieve all actors ordered by total events.

- **URL**: `/actors`
- **Method**: `GET`
- **Response**: 200 (OK)

### Get All Actors

Retrieve all actors.

- **URL**: `/actors/get-actors`
- **Method**: `GET`
- **Response**: 200 (OK)

### Get Actor Streak

Retrieve actor streak.

- **URL**: `/actors/streak`
- **Method**: `GET`
- **Response**: 200 (OK)

### Get Actor by ID

Retrieve an actor by ID.

- **URL**: `/actors/{id}`
- **Method**: `GET`
- **Parameters**:
  - `id` (path parameter): ID of the actor (string)
- **Response**: 200 (OK)

### Update an Actor

Update an existing actor.

- **URL**: `/actors/{id}`
- **Method**: `PUT`
- **Parameters**:
  - `id` (path parameter): ID of the actor (string)
- **Request Body**: ActorDto
- **Response**: 200 (Actor updated successfully)

### Delete an Actor

Delete an existing actor.

- **URL**: `/actors/{id}`
- **Method**: `DELETE`
- **Parameters**:
  - `id` (path parameter): ID of the actor (string)
- **Response**: 200 (Actor deleted successfully)

### Create an Event

Create a new event.

- **URL**: `/events`
- **Method**: `POST`
- **Request Body**: EventDto
- **Response**: 200 (Event created successfully)

### Get All Events

Retrieve all events.

- **URL**: `/events`
- **Method**: `GET`
- **Response**: 200 (OK)

### Get Events by Actor ID

Retrieve events by actor ID.

- **URL**: `/events/actors/{actorID}`
- **Method**: `GET`
- **Parameters**:
  - `actorID` (path parameter): ID of the actor (string)
- **Response**: 200 (OK)

### Erase All Events

Erase all events.

- **URL**: `/events/erase`
- **Method**: `DELETE`
- **Response**: 200 (Events erased successfully)

## Schemas

### ActorDto

- `id` (number)
- `login` (string)
- `avatar_url` (string, format: url)

### EventDto

- `id` (number)
- `type` (string)
- `actor` (ActorDto)
- `repo` (RepoDto)

### RepoDto

- `id` (number)
- `name` (string)
- `url` (string, format: url)

---

## Contributing

Contributions to gitTracker are welcome! If you find a bug or have an idea for an improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

gitTracker was inspired by nodejs challenge.

## Contact

For any questions or inquiries, please contact [Ilamini Dagogo](mailto:your.email@example.com).

---

---
