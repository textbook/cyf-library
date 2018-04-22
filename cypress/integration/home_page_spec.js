describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show the application title', () => {
    cy.title().should('eq', 'CYF Library')
    cy.get('h1').should('have.text', 'Resource library')
  })

  it('should show the default resources', () => {
    cy.get('.resource').should(elements => {
      expect(elements).to.have.length(1)
      let firstElement = elements.first()
      expect(firstElement.find('.resource-name')).to.contain('React')
      expect(firstElement.find('.resource-description')).to.contain('The official website for React')
    })
  })
})
