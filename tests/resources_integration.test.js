const request = require('supertest')
const app = require('../app');

describe('/resources', () => {
  const route = '/api/resources'

  test('should return 200 OK', async () => {
    const response = await request(app).get(route)
    expect(response.statusCode).toBe(200)
  })

  test('should return array of resources', async () => {
    const response = await request(app).get(route)
    expect(response.body.length).toBe(1)
    const resource = response.body[0]
    expect(resource.name).toBe('React')
    expect(resource.description).toBe('The official website for React')
    expect(resource.url).toBe('https://reactjs.org/')
  })
})
