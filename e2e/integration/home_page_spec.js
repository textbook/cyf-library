describe('Home Page', () => {
  beforeEach(() => {
    cy.seed('single-resource.json')
    cy.visit('/')
  })

  it('should show the site title', () => {
    cy.title().should('equal', 'CYF Library')
    cy.get('[data-qa=site-title]').should('have.text', 'Resource library')
  })

  it('should show the default resources', () => {
    cy.get('[data-qa=resource]').should('have.length', 1)
    cy.get('[data-qa=resource]').first().then(element => {
      cy.wrap(element).find('[data-qa=resource-name]').should('have.text', 'React')
      cy.wrap(element).find('[data-qa=resource-description]').should('have.text', 'The official website for React')
      cy.wrap(element).find('[data-qa=resource-link]')
        .should('have.text', 'View')
        .and('have.prop', 'href', 'https://reactjs.org/')
    })
  })

  it('should show the categories of the resource', () => {
    const expectedCategories = ['react', 'javascript']
    cy.get('[data-qa=resource]').first().then(element => {
      cy.wrap(element).find('[data-qa=resource-category]').each((el, index) => {
        cy.wrap(el).should('have.text', expectedCategories[index])
      })
    })
  })

  it('should provide a link to the about page', () => {
    cy.get('[data-qa=nav-link][data-qa-value=about]').first().should('have.text', 'About').click()
    cy.get('[data-qa=page-title').should('have.text', 'About')
  })
})
