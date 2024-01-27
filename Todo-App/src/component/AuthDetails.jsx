import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./../firebase";
import { useNavigate } from "react-router-dom";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  // navigate("/session-timed-out");

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        setMsg("sign out successful");
        window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
        setMsg("sign out failed.");
      });
  };
  return (
    <div>
      <h5>{msg}</h5>
      {authUser ? (
        <>
          <p>{`Signed In As ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
