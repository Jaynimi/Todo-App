import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../index.css";

// async function saveUser() {
//   await setDoc(doc(db, "user"), {
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA",
//   });
// }

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  async function saveUser() {
    await setDoc(doc(db, "users", `${email}`), {
      email,
      name,
      todo: [],
    });
  }
  const signUp = (e) => {
    // Handle ToDo SignIn
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        localStorage.setItem("email", JSON.stringify(email));
        saveUser();
        navigate("/todo");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="sign-in-container defaultPageCont">
      <h1 className="appName">CanDoToday</h1>
      <form action="" onSubmit={signUp} className="formContainer">
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
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
        </div>
        <div className="inputCont">
          <p>Username</p>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Nickname"
          />
        </div>
        <div className="loginButton">
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
