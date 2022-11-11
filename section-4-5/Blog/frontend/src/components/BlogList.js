import { useState } from "react";

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  
  const [displayDetails, setDisplayDetails] = useState(false)  

  const toggleDisplay = () => setDisplayDetails(!displayDetails);
  
  const updateLikes = async () => {
    const modifiedBlog = { 
      ...blog,
      likes: blog.likes + 1,
      user: blog.user && blog.user.id
    }; 
    await updateBlog(modifiedBlog);
  };

  const handleDelete = async () => await deleteBlog(blog);

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {" "}
      <button onClick={toggleDisplay}>{displayDetails ? 'hide' : 'show'}</button>
      {displayDetails &&
        <div>
          {blog.url} <br/>
          likes {blog.likes} {" "}
          <button onClick={updateLikes}>like</button> <br/>
          {blog.user && 
            <div>
              {blog.user.name} <br/>
              {(blog.user.username === user.username) &&
                <button onClick={handleDelete}>remove</button>
              }
            </div>
          }
        </div>
      }
    </div>
  );
};

const BlogList = ({ blogs, user, updateBlog, deleteBlog }) => (
  <div>
    <h2>blogs</h2>
    {blogs
      .sort((a,b) => b.likes - a.likes)
      .map(blog => 
      <Blog 
        key={blog.id} 
        blog={blog} 
        user={user}
        updateBlog={updateBlog} 
        deleteBlog={deleteBlog}
        /> 

    )}
  </div>
);
export default BlogList;