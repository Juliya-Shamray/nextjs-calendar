"use client";
import { registerThunk } from "@/redux/auth/operations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const [userName, email, password] = e.target.elements;

    const newUser = {
      userName: userName.value,
      email: email.value,
      password: password.value,
    };
    dispatch(registerThunk(newUser))
      .unwrap()
      .then(() => {
        toast.success(`Congratulations!!! You have successfully registered`);
        router.push("/login");
      })
      .catch((error) => {
        if (error === 409) {
          router.push("/login");
          return toast.error("You are already registered");
        }
        return toast.error("Data is not valid");
      });
  };

  return (
    <div className="container">
      <h2 className="title">Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            minLength={3}
            type="text"
            placeholder="Name"
            name="userName"
            required
          />
        </div>
        <div>
          <input
            minLength={3}
            type="email"
            placeholder="Email"
            name="email"
            required
          />
        </div>
        <div>
          <input
            minLength={6}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
        <Link href="/login">Log in</Link>
      </form>
    </div>
  );
};

export default Register;
