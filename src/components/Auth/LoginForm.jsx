import { useState } from "react";
import { login } from "../../api/auth.ts";
import { useNavigate } from "react-router";

const LoginForm = ({ loggedIn, setLoggedIn }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = { name, email };
    try {
      const response = login(user);
      setLoggedIn(true);
      navigate("/search");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="authInputName">What should we call you?</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="authInputEmail">Email</label>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="rounded">
        Submit
      </button>
    </form>
  );
};
export default LoginForm;
