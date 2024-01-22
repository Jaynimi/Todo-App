import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
// import { uid, getUser } from "../firebase";
import { useNavigate } from "react-router-dom";
import AuthDetails from "./AuthDetails";
import { db } from "../firebase";

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
  // console.log(getUser(uid));
  const [todoItem, setTodoItem] = useState("");
  const [user, setUser] = useState({});
  const userEmail = JSON.parse(localStorage.getItem("email"));
  const [todos, setTodos] = useState([]);

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
    <>
      <div>
        <h1></h1>
        <form action="" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Enter Todo Item"
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
          />
          <button type="submit">Add item</button>
        </form>
      </div>
      <section>
        {todos?.map((cur, index) => (
          <div className={`${cur.itemDone ? "done" : "pending"}`}>
            <div>
              <h5>{index + 1}</h5>
              <h5>{cur.todoItem}</h5>
              <input
                onChange={() => {
                  let status = cur.itemDone;
                  let todoItem = cur.todoItem;
                  changeStatus({
                    index,
                    todoItem,
                    status: !status,
                  });
                }}
                type="checkbox"
                checked={cur.itemDone}
              />
            </div>
            <div>
              <button
                onClick={() => editItem({ index, todoItem: cur.todoItem })}
              >
                <FaEdit />
              </button>
              <button onClick={() => deleteItem(index)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
        <button onClick={clearItems}>clear items</button>
      </section>
      <AuthDetails />
    </>
  );
}

export default Todo;
