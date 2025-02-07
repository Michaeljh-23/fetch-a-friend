import LoginForm from "../components/Auth/LoginForm";

const LoginPage = ({ loggedIn, setLoggedIn }) => {
  return (
    <div id="login-page">
      <div className="container">
        <h1>Login Page</h1>
        <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>
    </div>
  );
};

export default LoginPage;
