import { useState, useEffect } from 'react'
import BlogList from './components/BlogList';
import CreateBlogs from './components/CreateBlog';
import LoggedUser from './components/LoggedUser';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    value: null,
    valid: null,
  });

  useEffect(() => {
    const loggedUserJSON = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    );
    if (loggedUserJSON) {
      setUser(loggedUserJSON);
      blogService.setToken(loggedUserJSON.token);
    }
  }, []);

  return (
    <>
      <Notification message={message} />
      {user === null
      ? <LoginForm setUser={setUser} setMessage={setMessage} />
      : <div>
          <LoggedUser user={user} setUser={setUser} />
          <CreateBlogs setBlogs={setBlogs} setMessage={setMessage}/>
          <BlogList blogs={blogs} setBlogs={setBlogs} />
        </div>}
    </>
  );
};

export default App;





