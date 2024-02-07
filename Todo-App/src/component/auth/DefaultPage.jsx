import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import "../../index.css";

function DefaultPage() {
  const navigate = useNavigate();
  const signUp = () => {
    navigate("/signup");
    console.log("errrr");
  };

  return (
    <div className="defaultPageCont">
      <div>
        <SignIn />
      </div>
      <div className="noAccount">
        <p>Dont have an account?</p>
        <button onClick={signUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default DefaultPage;
