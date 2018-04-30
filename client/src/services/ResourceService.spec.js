import ResourceService from './ResourceService'

describe('ResourceService', () => {
  const resources = [
    { name: 'Some Title', description: 'A description', url: 'http://example.org' },
    { name: 'Other Title', description: 'Some other context text', url: 'http://example.org' },
    { name: 'Something Else', description: 'A different description', url: 'http://example.org' },
  ]

  let service

  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(resources))
    service = new ResourceService()
  })

  describe('getResources method', () => {
    it('requests resources from the backend', () => {
      service.getResources()
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual('/api/resources')
    })

    it('exposes the resources as a Promise', done => {
      service.getResources().then(result => {
        expect(result).toEqual(resources)
        done()
      })
    })
  })

  describe('getResourcesByCategory method', () => {
    it('requests resources from the backend', () => {
      service.getResourcesByCategory('html')
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual('/api/resources?category=html')
    })

    it('exposes the resources as a Promise', done => {
      service.getResourcesByCategory('html').then(result => {
        expect(result).toEqual(resources)
        done()
      })
    })
  })
})
