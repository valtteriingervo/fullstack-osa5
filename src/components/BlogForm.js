import { useState } from 'react'

import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  // Create new blog states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    // Call the function residing in App component
    // with the state title, author and url
    await createBlog(title, author, url)
    // Reset input states after submit
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm