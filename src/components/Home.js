const Home = ({ username, onLogout }) => {
  return (
    <div className="login-box">
      <h1>Home Page</h1>
      <img className="home-picture" src="/logo512.png" alt="React logo" />
      <p className="welcome-text">Welcome, {username}!</p>
      <p className="welcome-text">You are now logged in.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
