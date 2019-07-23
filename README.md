# Movie Finder

A bare-bones clone of The Movie Database (TMDb) using React/Redux and Express.

![home_desktop](https://user-images.githubusercontent.com/15313363/61657981-fda0f200-accc-11e9-83dc-2fbe14eb7374.png)

## Codebase

**Full-stack JavaScript**: Node.js is used to power the server and React ([Create React App](https://facebook.github.io/create-react-app/)) to power the frontend app.
All of the code you'll touch in this codebase will be JavaScript.

### Stack

- [Node.js](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reduxjs/redux)
- [React-Semantic-UI](https://github.com/Semantic-Org/Semantic-UI-React)

### Backend API

All the data is provided by [TMDb](https://www.themoviedb.org). The server acts as a proxy between the React app and the [TMDb API](https://developers.themoviedb.org/3/getting-started/introduction).

## Setup

You need to have [Node.js](https://nodejs.org/) installed on your machine and a valid [TMDb API key](https://developers.themoviedb.org/3/getting-started/introduction).

1. Clone this repository or [download zip](https://github.com/AntoniosProvidakis/movie-finder/archive/master.zip).
2. Copy `.env.example` to `.env` and paste your TMDb API key in the correct place.
3. Install dependencies: `npm run setup`.
4. Run for development: `npm run dev`.
   - Visit http://localhost:3000 if browser tab doesn't open automatically
5. Run for production: `npm run build` then `npm start`.

## Running the tests

### Unit & Integration

Jest is used for unit and integration testing.

- `npm run test:client`: Runs the tests of the React app
- `npm run test:server`: Runs the tests of the Node app (No tests are implemented yet! 🤷‍)

### E2E

Cypress is used for E2E testing.

- `npm run test:e2e`: Opens the Cypress Test Runner in interactive mode.
- `npm run test:e2e:run`: Runs Cypress tests to completion. By default will run all tests headlessly in the Electron browser.

## License

This project is licensed under the terms of the [MIT license](./LICENSE).
