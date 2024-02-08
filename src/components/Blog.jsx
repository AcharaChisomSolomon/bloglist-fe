import { useState } from "react";

const Blog = ({ blog, handleLikeUpdate, handleDeleteBlog }) => {
    const [visible, setVisible] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    };

    const visibleStyle = {
        display: visible ? "" : "none"
    };

    const toggleVisibility = () => setVisible(!visible);

    const handleLike = () => { 
        handleLikeUpdate(blog.id)
    }

    const handleDelete = () => { 
        handleDeleteBlog(blog.id)
    }

    return (
        <div style={blogStyle}>
            {blog.title} - {blog.author}
            <button onClick={toggleVisibility}>
                {visible ? 'hide' : 'view'}
            </button>
            <div style={visibleStyle}>
                <div>{blog.url}</div>
                <div>{blog.likes} <button onClick={handleLike}>like</button></div>
                <div>{blog.user.name}</div>
                <div>
                    <button onClick={handleDelete}>
                        remove
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Blog