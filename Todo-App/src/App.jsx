import { useState } from "react";
import "./App.css";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import AuthDetails from "./component/AuthDetails";
import DefaultPage from "./component/auth/DefaultPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./component/Todo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/todo" element={<Todo />} />
          <Route path="/signin" exact element={<SignIn />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/signout" element={<AuthDetails />} />
          <Route path="/" element={<DefaultPage />} />
        </Routes>
      </Router>
      {/* <SignIn />
      <SignUp />
      <AuthDetails /> */}
    </>
  );
}

export default App;
