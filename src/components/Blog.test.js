import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

/*
Tee testi, joka varmistaa että blogin näyttävä komponentti renderöi
blogin titlen ja authorin mutta ei renderöi oletusarvoisesti urlia
eikä likejen määrää. Mikäli toteutit tehtävän 5.7, niin pelkkä
titlen renderöinnin testaus riittää.
*/


test('Blog component renders its title and author', () => {
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
  render(<Blog blog={blog} />)

  // The test passes if the screen has this title - author text
  screen.getByText('mock blog - Mister Mocker')
})