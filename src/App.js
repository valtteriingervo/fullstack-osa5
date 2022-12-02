import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) // User is null by default
  // Create new blog states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  useEffect(() => {
    const getAllBlogs = async () => {
      const allBlogsInDB = await blogService.getAll()
      setBlogs(allBlogsInDB)
    }

    getAllBlogs()
  }, [])

  // Check if there is logged in user already in localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault() // prevent site from reloading

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('expection happened:', exception)
    }
  }

  // Remove the localstorage item and remove user info from state forching reloading 
  // of App component
  const handleLogout = () => {
    console.log(`${user.username} time to logout!`)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }



  const handleCreateNew = async (event) => {
    event.preventDefault()

    console.log('title', title)
    console.log('author', author)
    console.log('url', url)

    await blogService.createBlog(title, author, url)

    const allBlogsInDB = await blogService.getAll()

    setBlogs(allBlogsInDB)

    setTitle('')
    setAuthor('')
    setURL('')
  }

  // Filter only the blogs of the logged in user
  // If the user is null just use the list of all the blogs
  let usersBlogs = user
    ? blogs.filter(blog => blog.user.username === user.username)
    : blogs

  // Render to login form only if user not yet logged in
  if (user === null) {
    return (
      <div>
        <h2>login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)} // Couple the React state and username input field with this function 
            />
          </div>
          <div>
            password
            <input
              type="password" // Hides the text 
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  // If the user is logged in render the users blogs
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>{user.username} logged in </p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <br></br>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
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
      <br></br>
      {usersBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App
