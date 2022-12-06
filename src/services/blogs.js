import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = newToken ? `bearer ${newToken}` : null
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (title, author, url) => {
  const config = {
    headers: { Authorization: token }
  }

  const newBlog = {
    title: title,
    author: author,
    url: url
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, setToken, createBlog }