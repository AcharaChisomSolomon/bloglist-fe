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

    return (
      <div>
        <p>
          {name} logged in
          <button onClick={handleLoggingOut}>logout</button>
        </p>

        <Togglable buttonLabel='create new blog'>
          <BlogForm
            handleBlogCreation={handleBlogCreation}
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