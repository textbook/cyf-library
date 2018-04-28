describe('Sort and Filter Functionality', () => {
  beforeEach(() => {
    cy.seed('multiple-resources.json')
    cy.visit('/')
  })

  it('should allow the user to filter displayed resources by title', () => {
    cy.get('[data-qa=search-input]').type('e')
    cy.get('[data-qa=search-button').click()
    cy.get('[data-qa=resource]').should('have.length', 2)
  })
})
