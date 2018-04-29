const request = require('supertest')
const appFactory = require('../app')

describe('/resources', () => {
  const route = '/api/resources'

  const reactResource = {
    description: 'The official website for React',
    name: 'React',
    url: 'https://reactjs.org/'
  }

  const angularResource = {
    categories: ['angular'],
    description: 'The official website for Angular',
    name: 'Angular',
    url: 'https://angular.io/'
  }

  const resources = [reactResource, angularResource]

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
    await db.collection('resources').insertMany(resources)
  })

  test('should return 200 OK', async () => {
    const response = await request(app).get(route)
    expect(response.statusCode).toBe(200)
  })

  test('should return array of resources', async () => {
    const response = await request(app).get(route)
    expect(response.body.length).toBe(resources.length)
    const first = response.body[0]
    expect(first.name).toBe(resources[0].name)
    expect(first.description).toBe(resources[0].description)
    expect(first.url).toBe(resources[0].url)
  })

  test('should not expose Mongo object ID', async () => {
    const response = await request(app).get(route)
    const first = response.body[0]
    expect(first._id).toBe(undefined)
  })

  test('should expose empty categories array for resources with no categories', async () => {
    const response = await request(app).get(route)
    const first = response.body[0]
    expect(first.categories).toEqual([])
  })

  test('should filter by category with query parameter', async () => {
    const response = await request(app).get(`${route}?category=angular`)
    expect(response.body.length).toBe(1)
    const first = response.body[0]
    expect(first.name).toBe(angularResource.name)
    expect(first.description).toBe(angularResource.description)
    expect(first.url).toBe(angularResource.url)
  })
})
