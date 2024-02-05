import { useState, useEffect } from "react"
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import blogService from './services/blogs'
import loginService from "./services/login"


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async e => {
    e.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
    } catch (exception) {
      console.log('wrong Details')
    }
  }


  const handleBlogCreation = async e => {
    e.preventDefault()

    const newBlog = await blogService.create({
      title: title,
      author: author,
      url: url
    })

    setBlogs(blogs.concat(newBlog))
    setAuthor('')
    setTitle('')
    setUrl('')
  }


  const handleUsernameChange = e => {
    console.log(e.target.value)
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    console.log(e.target.value)
    setPassword(e.target.value)
  }

  const handleLoggingOut = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null)
  }

  const handleTitleChange = e => {
    console.log(e.target.value);
    setTitle(e.target.value)
  }

  const handleAuthorChange = e => {
    console.log(e.target.value);
    setAuthor(e.target.value);
  }

  const handleUrlChange = e => {
    console.log(e.target.value);
    setUrl(e.target.value);
  }


  return (
    <div>
      <h1>{user ? 'blogs' : 'log in to application'}</h1>
      {
        !user
          ? <LoginForm
              handleLogin={handleLogin}
              username={username}
              handleUsernameChange={handleUsernameChange}
              password={password}
              handlePasswordChange={handlePasswordChange}
          />
          : <Blogs
              blogs={blogs}
              name={user.name}
              handleLoggingOut={handleLoggingOut}
              handleBlogCreation={handleBlogCreation}
              title={title}
              handleTitleChange={handleTitleChange}
              author={author}
              handleAuthorChange={handleAuthorChange}
              url={url}
              handleUrlChange={handleUrlChange}
            />
      }
    </div>
  );
}


export default App
