import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlogs = ({ setBlogs, setMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title, author, url
      };
      const returnedBlog = await blogService.create(newBlog);
      setBlogs((blogs) => blogs.concat(returnedBlog));

      setMessage({ value: `a new blog ${title} by ${author} added`});
      setTimeout(() => {
        setMessage({ value: null, error: null });
      }, 5000);

      setTitle('');
      setAuthor('');
      setUrl('');
      
      
    } catch (exception) {
      setMessage({value: 'all fields are required', error: true});
      setTimeout(() => {
        setMessage({ value: null, error: null });
      }, 5000);
    };
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: 
          <input 
            type="text"
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author: 
          <input 
            type="text"
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: 
          <input 
            type="text"
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add blog</button>
      </form>
    </>
  );
};

export default CreateBlogs;