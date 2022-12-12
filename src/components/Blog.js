import { useState } from 'react'

import blogService from '../services/blogs'


const Blog = ({ blog }) => {
  const [viewAll, setViewAll] = useState(false)
  // Use state in likes to force rerenders when likes change
  const [blogLikes, setBlogLikes] = useState(blog.likes ? blog.likes : 0)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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

  const displayToggle = { display: viewAll ? '' : 'none' }

  const toggleAll = () => {
    setViewAll(!viewAll)
  }

  return (
    <div style={blogStyle} >
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleAll}>view</button>
        <div style={displayToggle}>
          <p>{blog.url}</p>
          <p>likes {blogLikes}</p>
          <button onClick={likeBlog}>like</button>
          <p>{blog.user.name}</p>
        </div>
      </div>
    </div >
  )

}

export default Blog