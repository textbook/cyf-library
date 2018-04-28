describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('should show the page title', () => {
    cy.get('[data-qa=page-title]').should('have.text', 'About')
  })
})
