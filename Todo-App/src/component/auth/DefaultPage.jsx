import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

function DefaultPage() {
  const navigate = useNavigate();
  const signUp = () => {
    navigate("/signup");
    console.log("errrr");
  };

  return (
    <>
      <div>
        <SignIn />
      </div>
      <div>
        <p>Dont have an account?</p>
        <button onClick={signUp}>Sign Up</button>
      </div>
    </>
  );
}

export default DefaultPage;
