describe('Blog', function () {
  beforeEach(function () {
    // Reset the DB before each test
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // Create user to the DB
    const user = {
      name: 'Valtteri Ingervo',
      username: 'valttering',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    // And go to the site under test before each test
    cy.visit('http://localhost:3000')
  })

  // t 5.17
  it('Login form is shown', function () {
    // Text expected is shown
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
    // User can type and click on the login form
    cy.get('#username').type('typeTest')
    cy.get('#password').type('pwtest')
    cy.get('#login-button').click()
  })

  // t 5.18
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('valttering')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('valttering logged in')
      cy.contains('blogs')
      cy.contains('create new')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('valttering')
      cy.get('#password').type('incorrect')
      cy.get('#login-button').click()

      cy.get('#notification')
        .should('contain', 'Wrong username or password. Please try again')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'valttering logged in')
    })
  })
})