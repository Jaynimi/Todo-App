import React, { useEffect, useState } from "react";
import { Switch } from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
// import { uid, getUser } from "../firebase";
import { useNavigate } from "react-router-dom";
import AuthDetails from "./AuthDetails";
import { db } from "../firebase";
import "../index.css";

import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA",
// });

function Todo() {
  const [todoItem, setTodoItem] = useState("");
  const [user, setUser] = useState({});
  const userEmail = JSON.parse(localStorage.getItem("email"));
  const [todos, setTodos] = useState([]);
  const [labelTexts, setLabelTexts] = useState(
    Array.from({ length: todos.length }, () => "TODO")
  );

  // document.getElementById("myLabel").addEventListener("click", function () {
  //   var checkbox = document.getElementById("myCheckbox");
  //   checkbox.checked = !checkbox.checked; // Toggle checkbox
  // });

  const toggleCheckbox = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          itemDone: !todo.itemDone,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);

    // Update the label text for the specific todo item
    setLabelTexts((prev) => {
      const newLabelTexts = [...prev];
      newLabelTexts[index] = newLabelTexts[index] === "TODO" ? "DONE" : "TODO";
      return newLabelTexts;
    });
  };

  const getUser = async () => {
    let usersRef = collection(db, "users");
    let users = await getDocs(usersRef);
    users.docs.forEach((cur) => {
      if (cur.id === userEmail) {
        setUser(cur.data());
        setTodos(cur.data().todo);
      }
    });
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (todoItem != "") {
      // const oldTodo = user.todo;
      let arr = [...todos, { todoItem, itemDone: false }];
      setTodos([...todos, { todoItem, itemDone: false }]);

      let updatedUser = doc(db, "users", `${userEmail}`);
      updateDoc(updatedUser, { todo: arr });
      getUser();
      setTodoItem("");
    } else {
      window.alert("Todo Item Cannot Be Empty");
    }
  };

  const changeStatus = (data) => {
    console.log(data);
    const arr = [...todos];
    const index = data.index;
    if (index !== -1) {
      arr[index] = { todoItem: data.todoItem, itemDone: data.status };
    }

    setTodos(arr);

    let updatedUser = doc(db, "users", `${userEmail}`);
    updateDoc(updatedUser, { todo: arr });
  };

  const deleteItem = (index) => {
    let arr = [...todos];
    let arr2 = arr.filter((cur, idx) => idx !== index);
    setTodos(arr2);
    let updatedUser = doc(db, "users", `${userEmail}`);
    updateDoc(updatedUser, { todo: arr2 });
  };

  const editItem = (data) => {
    setTodoItem(data.todoItem);

    let arr = [...todos];
    let arr2 = arr.filter((cur, idx) => idx !== data.index);
    let updatedUser = doc(db, "users", `${userEmail}`);
    updateDoc(updatedUser, { todo: arr2 });
    setTodos(arr2);
  };

  const clearItems = () => {
    setTodos([]);
    let updatedUser = doc(db, "users", `${userEmail}`);
    updateDoc(updatedUser, { todo: [] });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="todoCont">
      <h1 className="appName">CanDoToday</h1>

      <div className="todoCont1">
        <div className="todoCont2">
          <div className="itemFormCont">
            <h1></h1>
            <form action="" onSubmit={addTodo}>
              <input
                className="enterItem"
                type="text"
                placeholder="Enter Todo Item"
                value={todoItem}
                onChange={(e) => setTodoItem(e.target.value)}
              />
              <button className="submitItem" type="submit">
                Add item
              </button>
            </form>
            {/* <div className="text-red-500 font-bold">Jay</div>
        <Switch color="blue" defaultChecked /> */}
          </div>
          <section>
            <div className="listCont">
              {todos?.map((cur, index) => (
                <div className={`${cur.itemDone ? "done" : "pending"}`}>
                  <div className="todoItem">
                    {/* <h5>{index + 1}</h5> */}
                    <h5>{cur.todoItem}</h5>
                    <div>
                      <input
                        onChange={() => {
                          let status = cur.itemDone;
                          let todoItem = cur.todoItem;
                          toggleCheckbox(index);
                          changeStatus({
                            index,
                            todoItem,
                            status: !status,
                          });
                        }}
                        type="checkbox"
                        id={`checkbox-${index}`}
                        checked={cur.itemDone}
                      />
                      <label htmlFor={`checkbox-${index}`}>
                        {cur.itemDone ? "DONE" : "TODO"}
                      </label>
                    </div>
                  </div>
                  <div className="editList">
                    <button
                      onClick={() =>
                        editItem({ index, todoItem: cur.todoItem })
                      }
                    >
                      <FaEdit />
                    </button>
                    <button onClick={() => deleteItem(index)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="clearItems" onClick={clearItems}>
              <FaTrash />
            </button>
          </section>
        </div>
      </div>
      <AuthDetails />
    </div>
  );
}

export default Todo;
