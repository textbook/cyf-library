const request = require('supertest')
const appFactory = require('../app')

describe('/resources', () => {
  const route = '/api/resources'

  const resource = {
    name: 'React',
    description: 'The official website for React',
    url: 'https://reactjs.org/'
  }

  let app
  let db

  beforeAll(async () => {
    db = global.__MONGO_DB__
    app = appFactory(`${global.__MONGO_URI__}`)
  })

  const safeDrop = async (collection) => {
    const collections = await db.collections()
    if (collections.map(c => c.s.name).indexOf(collection) > -1) {
      await db.collection(collection).drop()
    }
  }

  beforeEach(async () => {
    await safeDrop('resources')
    await db.collection('resources').insertOne(resource)
  })

  test('should return 200 OK', async () => {
    const response = await request(app).get(route)
    expect(response.statusCode).toBe(200)
  })

  test('should return array of resources', async () => {
    const response = await request(app).get(route)
    expect(response.body.length).toBe(1)
    const result = response.body[0]
    expect(result.name).toBe(resource.name)
    expect(result.description).toBe(resource.description)
    expect(result.url).toBe(resource.url)
  })

  test('should not expose Mongo object ID', async () => {
    const response = await request(app).get(route)
    expect(response.body.length).toBe(1)
    const result = response.body[0]
    expect(result._id).toBe(undefined)
  })
})
