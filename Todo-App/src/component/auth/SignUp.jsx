import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

// async function saveUser() {
//   await setDoc(doc(db, "user"), {
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA",
//   });
// }

const SignIn = () => {
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
    <div className="sign-in-container">
      <form action="" onSubmit={signUp}>
        <h1>Sign Up</h1>
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
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Nickname"
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignIn;
