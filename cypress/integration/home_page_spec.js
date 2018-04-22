describe('Home Page', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('should show the application title', function () {
    cy.title().should('eq', 'CYF Library')
    cy.get('h1').should('have.text', 'Resource library')
  })

  it('should show the default resources', function () {
    cy.get('li').should(elements => {
      expect(elements).to.have.length(1)
      let firstElement = elements.first()
      expect(firstElement).to.contain('React')
      expect(firstElement).to.contain('The official website for React')
    })
  })
})
