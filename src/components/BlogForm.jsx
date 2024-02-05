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
                <input type="text" />
            </div>
            <div></div>
            <button type="submit">create</button>
        </form>
    )
}