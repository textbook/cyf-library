describe('Home Page', () => {
  beforeEach(() => {
    cy.seed('state.json')
    cy.visit('/')
  })

  it('should show the application title', () => {
    cy.title().should('equal', 'CYF Library')
    cy.get('h1').should('have.text', 'Resource library')
  })

  it('should show the default resources', () => {
    cy.get('.resource').should('have.length', 1)
    cy.get('.resource').first().then(element => {
      cy.wrap(element).find('.resource-name').should('have.text', 'React')
      cy.wrap(element).find('.resource-description').should('have.text', 'The official website for React')
      cy.wrap(element).find('.resource-link')
        .should('have.text', 'View')
        .and('have.prop', 'href', 'https://reactjs.org/')
    })
  })
})
