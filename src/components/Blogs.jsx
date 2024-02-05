import Blog from "./Blog";

const Blogs = props => {
    const { blogs, name, handleLoggingOut } = props

    return (
      <div>
        <p>
          {name} logged in
          <button onClick={handleLoggingOut}>logout</button>
        </p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
}


export default Blogs