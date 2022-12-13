import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

/*
5.13: Tee testi, joka varmistaa että blogin näyttävä komponentti renderöi
blogin titlen ja authorin mutta ei renderöi oletusarvoisesti urlia
eikä likejen määrää. Mikäli toteutit tehtävän 5.7, niin pelkkä
titlen renderöinnin testaus riittää.
*/

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'mock blog',
      author: 'Mister Mocker',
      likes: 12,
      url: 'www.mock-blog.com',
      user: {
        name: 'Juuso Mockinen'
      },
    }

    // Render the Blog component with the mock blog as props
    // Save the container of the render object
    container = render(<Blog blog={blog} />).container
  })

  test('5.13: Blog component renders its title and author', () => {
    // The test passes if the screen has this title - author text
    screen.getByText('mock blog - Mister Mocker')
  })

  test('extra info is hidden before view button is pressed', () => {
    const div = container.querySelector('.extraInfo')
    expect(div).toHaveStyle('display: none')
  })

  /*
  5.14: Tee testi, joka varmistaa että myös url, likejen määrä
  ja käyttäjä näytetään, kun blogin kaikki tiedot
  näyttävää nappia on painettu.
  */

  test('5.14: all info is shown when view is clicked', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // The display style is not hidden
    const div = container.querySelector('.extraInfo')
    expect(div).not.toHaveStyle('display: none')

    // Title and author are shown
    screen.getByText('mock blog - Mister Mocker')
    // URL is shown
    screen.getByText('www.mock-blog.com')
    // likes are shown
    screen.getByText('likes 12')
    // users name is shown
    screen.getByText('Juuso Mockinen')
  })
})

