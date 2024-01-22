import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { Link } from "react-router-dom";
import Todo from "../todo";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn = (e) => {
    // Handle ToDo SignIn
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        localStorage.setItem("email", JSON.stringify(email));
        navigate("/todo");
        // window.location.assign("/todo");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="sign-in-container">
      <form action="" onSubmit={signIn}>
        <h1>Log-in to view and edit your todo list</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default SignIn;
