"use client";
import Link from "next/link";

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const [userName, email, password] = e.target.elements;

    const newUser = {
      userName: userName.value,
      email: email.value,
      password: password.value,
    };
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (res.status === 409) {
      console.log("User is already registered");
      return;
    }
    if (res.status === 500) {
      console.log("oops problem on server");
      return;
    }

    const data = await res.json();
    console.log(data);
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
