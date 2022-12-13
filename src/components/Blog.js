import { useState } from 'react'

import blogService from '../services/blogs'


const Blog = ({ blog }) => {
  const [viewAll, setViewAll] = useState(false)
  // Use state in likes to force rerenders when likes change
  const [blogLikes, setBlogLikes] = useState(blog.likes ? blog.likes : 0)
  const [removed, setRemoved] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: removed
  }

  const likeBlog = async () => {
    const blogObject = {
      user: blog.user.id,
      likes: blogLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const responseData = await blogService.updateBlog(blog.id, blogObject)
    // Rerender blog component with like change
    setBlogLikes(responseData.likes)
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

export default Blog