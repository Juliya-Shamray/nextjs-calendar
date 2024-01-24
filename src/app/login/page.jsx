"use client";

import { loginThunk, refreshThunk } from "@/redux/auth/operations";
import { selectIsLogin, selectIsRefresh } from "@/redux/auth/selectors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const isLogin = useSelector(selectIsLogin);
  const isRefresh = useSelector(selectIsRefresh);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);
  if (isLogin) {
    redirect("/calendar");
  }

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
