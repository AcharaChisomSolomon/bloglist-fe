const BlogForm = props => {
    const {
        handleBlogCreation,
        title,
        handleTitleChange,
        author,
        handleAuthorChange,
        url,
        handleUrlChange
    } = props

    return (
        <form onSubmit={handleBlogCreation}>
            <div>
                title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    value={url}
                    name="URL"
                    onChange={handleUrlChange}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}


export default BlogForm