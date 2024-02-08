import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blogs = props => {
  const {
    blogs,
    name,
    handleLoggingOut,
    handleBlogCreation,
  } = props

    return (
      <div>
        <p>
          {name} logged in
          <button onClick={handleLoggingOut}>logout</button>
        </p>

        <Togglable buttonLabel='new note'>
          <BlogForm handleBlogCreation={handleBlogCreation}/>
        </Togglable>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
}


export default Blogs