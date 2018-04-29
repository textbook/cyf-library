const NodeEnvironment = require('jest-environment-node')
const { MongoClient } = require('mongodb')
const MongodbMemoryServer = require('mongodb-memory-server')

module.exports = class MongoEnvironment extends NodeEnvironment {

  constructor(config) {
    super(config)
  }

  async setup() {
    console.log('Setup MongoDB Test Environment')

    let mongod = new MongodbMemoryServer.default({
      instance: { dbName: 'jest' },
      binary: { version: '3.6.3' },
    })
    this.global.__MONGOD__ = mongod

    const uri = await mongod.getConnectionString()
    this.global.__MONGO_URI__ = uri

    const connection = await MongoClient.connect(uri)
    this.global.__MONGO_CONNECTION__ = connection

    this.global.__MONGO_DB__ = await connection.db('jest')

    await super.setup()
  }

  async teardown() {
    console.log('Teardown MongoDB Test Environment')

    await this.global.__MONGO_CONNECTION__.close()
    await this.global.__MONGOD__.stop()
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}
