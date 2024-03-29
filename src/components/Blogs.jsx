import { useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blogs = props => {
  const {
    blogs,
    name,
    handleLoggingOut,
    handleBlogCreation,
    handleLikeUpdate,
    handleDeleteBlog
  } = props

  const blogFormRef = useRef()

  const newHandleBlogCreation = async blog => { 
    await handleBlogCreation(blog)
    blogFormRef.current.toggleVisibility()
  }

    return (
      <div>
        <p>
          {name} logged in
          <button onClick={handleLoggingOut}>logout</button>
        </p>

        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm
            handleBlogCreation={newHandleBlogCreation}
            handleLikeUpdate={handleLikeUpdate}
          />
        </Togglable>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeUpdate={handleLikeUpdate}
            handleDeleteBlog={handleDeleteBlog}
          />
        ))}
      </div>
    );
}


export default Blogs