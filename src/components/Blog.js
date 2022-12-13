import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'


const Blog = ({ blog, handleBlogLike }) => {
  const [viewAll, setViewAll] = useState(false)
  const [removed, setRemoved] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: removed
  }

  // If blog.likes is undefined set it to zero for the component
  const blogLikes = blog.likes ? blog.likes : 0

  const likeBlog = async () => {
    const blogObject = {
      user: blog.user.id,
      likes: blogLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    // Pass the updated blog to the prop function
    await handleBlogLike(blog.id, blogObject)
    // Rerender blog component with like change
  }

  const deleteBlog = async () => {
    const windowText =
      `Remove blog ${blog.title} by ${blog.author}?`

    if (window.confirm(windowText)) {
      await blogService.deleteBlog(blog.id)
      setRemoved('none')
    }
  }

  const displayToggle = { display: viewAll ? '' : 'none' }

  const toggleAll = () => {
    setViewAll(!viewAll)
  }

  return (
    <div style={blogStyle} >
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleAll}>view</button>
        <div style={displayToggle} className='extraInfo'>
          <p>{blog.url}</p>
          <p>likes {blogLikes}</p>
          <button onClick={likeBlog}>like</button>
          <p>{blog.user.name}</p>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div >
  )

}

Blog.propTypes = {
  handleBlogLike: PropTypes.func.isRequired
}

export default Blog