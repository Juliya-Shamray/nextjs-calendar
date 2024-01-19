"use client";

import { loginThunk } from "@/redux/auth/operations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const [email, password] = e.target.elements;

    const existingUser = {
      email: email.value,
      password: password.value,
    };
    dispatch(loginThunk(existingUser))
      .unwrap()
      .then(() => {
        router.push("/calendar");
      })
      .catch(() => {
        return toast.error("Password or email is not valid");
      });
  };
  return (
    <div className="container">
      <h2 className="title">Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input type="email" placeholder="Email" name="email" required />
        </div>
        <div>
          <input
            minLength={6}
            type="password"
            placeholder="password"
            name="password"
            required
          />
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
