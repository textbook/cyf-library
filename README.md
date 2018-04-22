Library
=======

Development
-----------

The following are development prerequisites:

  - Node (tested with 8.9.4); and
  - Yarn (1.2.1).

These versions are used to match v1.6.15 of the Cloud Foundry [Node
buildpack][1].

The repository is set up so that most Yarn commands will work correctly from
the root. The following are currently available:

  - `yarn install`: runs installation for the root Express app then switches
    to `client/` and installs there too.
   
  - `yarn build`: builds the React app and copies the files into `static/`.

  - `yarn start`: builds the React app then starts the Express app. In this
    mode, visit the app at http://localhost:3000.

  - `yarn dev`: simultaneously runs the Express app and the React development
    server. Express runs on port 3000 and React on 4200, then React's proxy
    setting is used so that any API calls go to Express. In this mode, visit
    the app at http://localhost:4200 (React's start command will open this for
    you by default).
    
Testing
-------

  - `yarn lint` will run ESLint on all of the non-generated code. You can add
    `--fix` to the command to automatically fix some errors.

  - `yarn test` will run the Jest unit tests in the Express and React apps.

  - `yarn test:watch:client` will watch the React unit tests, re-running them
    whenever the code changes.
    
  - `yarn test:watch:server` will watch the Express unit and integration
    tests, re-running them whenever the code changes.

  - `yarn cypress` starts the Cypress UI.

  - `yarn e2e` will run the Cypress tests using the headless Electron browser.
    You must separately run `yarn start` and make sure the app is running
    first, or the end-to-end tests will fail.

  - `yarn e2e:dev` works like `e2e`, but pointing to the dev version of the
    app on port 4200; again, you must separately run the app using `yarn dev`.

Deployment
----------

  - `yarn serve`: runs the Express app in production mode. Note that you must
    run `yarn build` manually first; otherwise, a warning will be shown and
    the app won't start (this is intended for production deployments where you
    don't want to ship the raw React code).

 [1]: https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.6.15
