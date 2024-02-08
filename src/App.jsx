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


  blogs.sort((a, b) => b.likes - a.likes)


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
      setBlogs(blogs.concat({
        ...newBlog,
        user: {
          name: user.name
        }
      
      }));

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

  const handleLikeUpdate = async id => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    const blogToUpdateDetails = {
      user: blogToUpdate.user.id,
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1
    }

    const updatedBlog = await blogService.update(id, blogToUpdateDetails)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : {
      ...updatedBlog,
      user: {
        name: blog.user.name
      }
    }))
  }

  const handleDeleteBlog = async id => {
    try {
      if (window.confirm('Do you really want to delete this blog?')) {
        await blogService.remove(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
      }
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
              handleLikeUpdate={handleLikeUpdate}
              handleDeleteBlog={handleDeleteBlog}
            />
      }
    </div>
  );
}


export default App
