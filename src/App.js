import { useState, useEffect } from 'react'

// Components
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
// Services
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) // User is null by default

  const [notifMessage, setNotifMessage] = useState(null)
  const [typeOfNotifMessage, setTypeOfNotifMessage] = useState('success')

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

  const showNotifMessage = (message, typeOfMsg, timeInSec) => {
    // Set message and type for the notif to let the user know the login failed
    setNotifMessage(message)
    setTypeOfNotifMessage(typeOfMsg)
    // Hide the notification message after X seconds
    setTimeout(() => { setNotifMessage(null) }, timeInSec * 1000)
  }

  const handleLogin = async (event) => {
    event.preventDefault() // prevent site from reloading

    try {
      const user = await loginService.login({
        username, password
      })
      // Set user in browser localstorage
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      // Set the token
      blogService.setToken(user.token)

      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {

      showNotifMessage(
        'Wrong username or password. Please try again',
        'error',
        3
      )

      console.log('expection happened:', exception)
    }
  }

  // Remove the localstorage item and remove user info from state forching reloading 
  // of App component
  const handleLogout = () => {
    console.log(`${user.username} time to logout!`)
    // Reset localStorage
    window.localStorage.removeItem('loggedBlogAppUser')
    // Set user in App state to null
    setUser(null)
    // Reset the token
    blogService.setToken(null)
  }



  const createNewBlog = async (title, author, url) => {

    try {
      const response = await blogService.createBlog(title, author, url)
      console.log(response)

      const allBlogsInDB = await blogService.getAll()

      setBlogs(allBlogsInDB)

      showNotifMessage(
        `A new blog ${title} by ${author} added`,
        'success',
        3
      )
    } catch (exception) {
      if (exception.response.status === 400) {
        showNotifMessage(
          'Error in creation: Missing one or more of the blog fields',
          'error',
          3
        )
      }
      console.log('exception', exception)
    }

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
        <Notification message={notifMessage} typeOfMessage={typeOfNotifMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  // If the user is logged in render the users blogs
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notifMessage} typeOfMessage={typeOfNotifMessage} />
      <div>
        <p>{user.username} logged in </p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <br></br>
      <h2>create new</h2>
      <BlogForm createBlog={createNewBlog} />
      <br></br>
      {usersBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App
