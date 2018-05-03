export const mockGetResourcesByCategory = jest.fn()
export const mockGetResources = jest.fn()

export default jest.fn().mockImplementation(() => {
  return {
    getResources: mockGetResources,
    getResourcesByCategory: mockGetResourcesByCategory,
  }
})
