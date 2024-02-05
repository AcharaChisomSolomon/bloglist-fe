import Blog from "./Blog";
import BlogForm from "./BlogForm";

const Blogs = props => {
  const {
    blogs,
    name,
    handleLoggingOut,
    handleBlogCreation,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange
  } = props

    return (
      <div>
        <p>
          {name} logged in
          <button onClick={handleLoggingOut}>logout</button>
        </p>

        <h1>create new</h1>

        <BlogForm
          handleBlogCreation={handleBlogCreation}
          title={title}
          handleTitleChange={handleTitleChange}
          author={author}
          handleAuthorChange={handleAuthorChange}
          url={url}
          handleUrlChange={handleUrlChange}
        />

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
}


export default Blogs