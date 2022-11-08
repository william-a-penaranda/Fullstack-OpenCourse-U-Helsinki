import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');

    } catch (exception) {
      setMessage({ value: 'Wrong credentials', error: true });
      setTimeout(() => {
        setMessage({ value: null });
      }, 5000);
    };
  }
  return (
  <form onSubmit={handleLogin}>
    <h2>Sign in</h2>
    <div>
      username
        <input 
          type="text"
          value={username}
          name='Username'
          onChange={({ target }) =>  setUsername(target.value)}
        />
    </div>
    <div>
      password
        <input 
          type="password"
          value={password}
          name='Password'
          onChange={({ target }) =>  setPassword(target.value)}
        />
    </div>
    <button type='submit'>login</button>
  </form>
  );
};

export default LoginForm;