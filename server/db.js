const cfServices = require("cf-services");
const { MongoClient } = require("mongodb");

const getDatabaseUrl = () => {
  try {
    return cfServices("resource-library").credentials.uri;
  } catch (err) {
    return process.env.DATABASE_URL || "mongodb://localhost:27017/library";
  }
};

class Connection {
  constructor(url) {
    this.url = url;
    this.connection = null;
  }

  async connect() {
    if (!this.connection) {
      this.connection = await MongoClient.connect(
        this.url,
        { useNewUrlParser: true }
      );
    }
    return this.connection.db();
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}

module.exports = { Connection, getDatabaseUrl };
