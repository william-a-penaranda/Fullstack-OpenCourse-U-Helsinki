
const LoggedUser = ({ user, setUser }) => {
  
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser');
  }

  return (
    <>
      <h2>user</h2>
      <div>
        {user.name} logged in {' '}
          <button onClick={handleLogout}>logout</button>
      </div>
    </>
  );
};

export default LoggedUser;