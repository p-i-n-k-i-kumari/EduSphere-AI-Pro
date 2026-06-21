import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
console.log({
  email,
  password,
});
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      window.location.href = "/";
    }catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  alert("Login Failed");
}
  };

  return (
    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleLogin}
      >
        <h1>EduSphere AI</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>
      </form>

    </div>
  );
}

export default Login;