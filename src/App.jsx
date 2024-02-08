import { useState, useEffect } from "react"
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from "./components/Notification"


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notice, setNotice] = useState(null)


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
      setNotice({
        message: 'wrong username or password',
        isError: true
      })
      setTimeout(() => {
        setNotice(null)
      }, 5000)
    }
  }


  const handleBlogCreation = async newObject => {
    try {
      const newBlog = await blogService.create(newObject);
      setBlogs(blogs.concat(newBlog));

      setNotice({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        isError: false,
      });
      setTimeout(() => {
        setNotice(null);
      }, 5000);
      
    } catch (exception) {
      console.log(exception)

      setNotice({
        message: exception.response.data.error,
        isError: true
      })
      setTimeout(() => {
        setNotice(null)
      }, 5000)

    }
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


  return (
    <div>
      <h1>{user ? 'blogs' : 'log in to application'}</h1>
      <Notification notice={notice} />
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
            />
      }
    </div>
  );
}


export default App
