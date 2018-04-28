Library
=======

[![Build Status][6]][7]

Technology
----------

The application uses technologies taught as part of the [Code Your Future
syllabus][2]:

  - [Express][3] web server
  - [React][4] front-end application
  - [MongoDB][8]
  - [Bootstrap][5] CSS library

Structure
---------

The application structure may seem quite complex at first, so here is a guide
to what the different parts are:

  - `bin/`: Contains the `www.js` file to start the Express app.

  - `client/`: Contains the React frontend and its associated tests. Note that
    this is also a Node project with a `package.json`.

  - `cypress/`: Contains the end-to-end test suite.

  - `routes/`: Contains the various Express app routers.

  - `migrations/`: Contains the files defining database migration steps.

  - `static/`: Contains the static resources for the Express app (note that
    these are overwritten with the compiled React app by the `yarn build`
    command).

  - `tests/`: Contains the integration tests for the Express app.

  - `app.js`: Contains the Express app definition, which configures the app
    and sets up the routes.

Development
-----------

The following are development prerequisites:

  - MongoDB (tested with 3.6.3);
  - Node (tested with 8.9.4); and
  - Yarn (1.2.1).

These versions are used to match v1.6.15 of the Cloud Foundry [Node
buildpack][1].

The repository is set up so that most Yarn commands will work correctly from
the root. The following are currently available:

  - `yar add:client`: add a new dependency to the React app.

  - `yarn install:all`: runs installation for the root Express app then
    switches to `client/` and installs there too.
   
  - `yarn build`: builds the React app and copies the files into `static/`.

  - `yarn start`: builds the React app then starts the Express app. In this
    mode, visit the app at http://localhost:3000.

  - `yarn dev`: simultaneously runs the Express app and the React development
    server. Express runs on port 3000 and React on 4200, then React's proxy
    setting is used so that any API calls go to Express. In this mode, visit
    the app at http://localhost:4200 (React's start command will open this for
    you by default).

Both `start` and `dev` expect a MongoDB running locally. By default it's
expected to be accessible on port 27017 on localhost; if your setup is
different provide the appropriate database URL as the `DATABASE_URL`
environment variable.

Migrations
----------

[`mongodb-migrations`][9] is used to handle updating the database state in
production. You can generate a new migration file with `yarn mm create <name>`
then edit the resulting file in `migrations/`. Like other parts of the app
that relate to the database, the migrations will be applied the database found
via the `DATABASE_URL` environment variable or, if that is not set, the
MongoDB running on port 27017 on localhost.

Note that the E2E tests will clear and re-seed the database, removing all
collections *including* the `_migrations` collection that tracks which
migrations have already been applied. Therefore if you want to restore a local
working state after runningn them you can run `yarn mm migrate` to re-apply
all migrations.

Testing
-------

  - `yarn lint` will run ESLint on all of the non-generated code. You can add
    `--fix` to the command to automatically fix some errors.

  - `yarn test` will run the Jest unit and integration tests in the Express
    and React apps.

  - `yarn test:watch:client` will watch the React unit tests, re-running them
    whenever the code changes.
    
  - `yarn cypress` starts the Cypress UI.

  - `yarn e2e` will run the Cypress tests using the headless Electron browser.
    You must separately run `yarn start` and make sure the app and database
    are is running first, or the end-to-end tests will fail.

  - `yarn e2e:dev` works like `e2e`, but pointing to the dev version of the
    app on port 4200; again, you must separately run the app using `yarn dev`
    and start the database.

  - `yarn e2e:ci` works like `e2e`, but boots the app for you and waits for it
    to start before testing it (and shuts it down afterwards). Note that you
    need to stop the app before running this command, but the database must
    still be running.

Deployment
----------

  - `yarn serve`: runs the Express app in production mode. Note that you must
    run `yarn build` manually first; otherwise, a warning will be shown and
    the app won't start (this is intended for production deployments where you
    don't want to ship the raw React code). This also runs database migrations
    prior to starting the app.

Environment
-----------

The following environment variables are handled by the application:

  - `DATABASE_URL`: The URL for connection to MongoDB (defaults to
    `mongodb://localhost:27017/library`)

  - `PORT`: The port to serve on (defaults to `3000`).

 [1]: https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.6.15
 [2]: https://codeyourfuture.github.io/syllabus-master/
 [3]: https://expressjs.com/
 [4]: https://reactjs.org/
 [5]: https://getbootstrap.com/
 [6]: https://travis-ci.org/textbook/cyf-library.svg?branch=master
 [7]: https://travis-ci.org/textbook/cyf-library
 [8]: https://www.mongodb.com/
 [9]: http://npmjs.com/package/mongodb-migrations
