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

  describe('When logged in', function () {
    beforeEach(function () {
      // Log user in
      cy.login({ username: 'valttering', password: 'salainen' })
    })

    it('A blog can be created', function () {
      // Make the blog form visible
      cy.contains('new blog').click()

      cy.get('#title').type('Test Blog')
      cy.get('#author').type('John Smith')
      cy.get('#url').type('www.test-blog.com')

      cy.get('#create-button').click()

      // There should be a notification of succesful blog adding
      cy.contains('A new blog Test Blog by John Smith added')
      // And the new blog should now exist
      cy.contains('Test Blog - John Smith')
    })

    describe('And a blog has been created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test Blog',
          author: 'John Smith',
          url: 'www.test-blog.com'
        })
      })
      it('Blog can be liked', function () {
        // Click view to show all info
        cy.contains('view').click()

        //At start likes should be at zero
        cy.get('#likes').should('contain', 'likes 0')

        // Click the like button
        cy.get('#like-button').click()

        // Likes should be incremented by 1
        cy.get('#likes').should('contain', 'likes 1')
      })
    })
  })
})