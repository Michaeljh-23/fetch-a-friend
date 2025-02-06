const LoginForm = () => {
  return (
    <form className="auth-form">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="auth-name"
          placeholder="What should we call you?"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default LoginForm;
