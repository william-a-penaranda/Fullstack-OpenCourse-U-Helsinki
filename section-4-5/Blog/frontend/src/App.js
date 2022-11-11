import { useState, useEffect } from 'react'
import BlogList from './components/BlogList';
import CreateBlogs from './components/CreateBlog';
import LoggedUser from './components/LoggedUser';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    value: null,
    error: false,
  });

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    );
    if (loggedUserJSON) {
      setUser(loggedUserJSON);
      blogService.setToken(loggedUserJSON.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setMessage({ value: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`});
    } catch (exception) {
      setMessage({ value: 'all fields are required', error: true });
    };
    setTimeout(() => setMessage({ value: null, error: null }), 5000);
  }

  const updateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject);
      setBlogs(blogs.map(blog => blog.id === returnedBlog.id 
        ? returnedBlog
        : blog
      ));
    } catch (exception) {
      setMessage({ value: exception, error: true })
      setTimeout(() => setMessage({ value: null, error: false }), 5000);
    };
  }

  const deleteBlog = async (blogObject) => {
    const isDelete = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    if (isDelete){
      await blogService.deleteById(blogObject);
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id));
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);

    } catch (exception) {
      setMessage({ value: 'Wrong credentials', error: true });
      setTimeout(() => setMessage({ value: null, error: null }), 5000);
    };
  }

  return (
    <div>
      <Notification message={message} />
      {user === null
      ? <LoginForm handleLogin={handleLogin} />
      : <div>
          <LoggedUser user={user} setUser={setUser} />
          <Toggleable buttonLabel='new note'>
            <CreateBlogs addBlog={addBlog} />
          </Toggleable>
          <BlogList 
            blogs={blogs} 
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        </div>
      }
    </div>
  );
};

export default App;





