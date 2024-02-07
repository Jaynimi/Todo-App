import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../../index.css";
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
      <h1 className="appName">CanDoToday</h1>
      <form action="" onSubmit={signIn} className="formContainer">
        <div className="inputCont">
          <p className="inputText">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
        </div>
        <div className="inputCont">
          <p className="inputText">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
        </div>
        <div className="loginButton">
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
