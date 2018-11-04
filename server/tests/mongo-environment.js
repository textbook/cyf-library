const NodeEnvironment = require("jest-environment-node");

const { Connection } = require("../db");

module.exports = class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    try {
      await this.configureDatabase();
    } catch (err) {
      console.error(err);
      throw err;
    }

    return super.setup();
  }

  async teardown() {
    await this.global.__MONGO_CONNECTION__.disconnect();
    return super.teardown();
  }

  async configureDatabase() {
    const connection = new Connection(this.global.DATABASE_URL);
    this.global.__MONGO_CONNECTION__ = connection;
    this.global.__MONGO_DB__ = await connection.connect();
  }
};
