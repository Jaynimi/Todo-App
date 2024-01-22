import { useState } from "react";
import "./App.css";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import AuthDetails from "./component/AuthDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./component/todo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/todo" element={<Todo />} />
          <Route path="/" exact element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<AuthDetails />} />
        </Routes>
      </Router>
      {/* <SignIn />
      <SignUp />
      <AuthDetails /> */}
    </>
  );
}

export default App;
