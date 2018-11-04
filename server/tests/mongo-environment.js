const NodeEnvironment = require("jest-environment-node");
const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

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
    await this.global.__MONGO_CONNECTION__.close();
    await this.global.__MONGOD__.stop();
    return super.teardown();
  }

  async configureDatabase() {
    let mongod = new MongoMemoryServer({ binary: { version: "3.6.3" } });
    this.global.__MONGOD__ = mongod;

    const uri = await mongod.getConnectionString();
    this.global.__MONGO_URI__ = uri;

    const connection = await MongoClient.connect(
      uri,
      { useNewUrlParser: true }
    );
    this.global.__MONGO_CONNECTION__ = connection;

    this.global.__MONGO_DB__ = await connection.db();
  }
};
