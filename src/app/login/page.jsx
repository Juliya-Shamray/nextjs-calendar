import Link from "next/link";

const Login = () => {
  return (
    <div className="container">
      <h2 className="title">Login</h2>
      <form className="form">
        <div>
          <input type="email" placeholder="Email" />
        </div>
        <div>
          <input type="password" placeholder="password" />
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
        <Link href="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;
