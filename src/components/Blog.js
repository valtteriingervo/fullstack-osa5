import { useState } from 'react'


const Blog = ({ blog }) => {
  const [viewAll, setViewAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const displayToggle = { display: viewAll ? '' : 'none' }

  const toggleAll = () => {
    setViewAll(!viewAll)
    console.log(viewAll)
  }

  return (
    <div style={blogStyle} >
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleAll}>view</button>
        <div style={displayToggle}>
          <p>{blog.url}</p>
          <p>likes {blog.likes}</p>
          <button>like</button>
          <p>{blog.user.name}</p>
        </div>
      </div>
    </div >
  )

}

export default Blog