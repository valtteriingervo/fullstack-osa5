describe('Blog', function () {
  beforeEach(function () {
    // Reset the DB before each test
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // And go to the site under test before each test
    cy.visit('http://localhost:3000')
  })

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
})