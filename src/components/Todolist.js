import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Task from "./Task";
import { collection, doc, addDoc, onSnapshot } from "firebase/firestore";
import Header from "./Header";
import background2 from "./background2.jpeg";
import { auth } from "../firebase";

function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const tasksRef = collection(db, "todolists", auth.currentUser.uid, "tasks");
    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const addTask = async () => {
    const tasksRef = collection(db, "todolists", auth.currentUser.uid, "tasks");
    await addDoc(tasksRef, {
      title: newTask,
      completed: false,
    });
    setNewTask("");
  };

  return (
    <div>
      <Header />
      <div className="relative flex flex-col w-screen justify-center align-middle text-center m-0 h-screen items-center">
        <img
          src={background2}
          alt="background"
          className="h-screen w-screen bg-cover bg-center"
        />
        <div className="z-30 flex flex-col max-w-lg absolute">
          <div className="flex border-4 bg-black border-white flex-col p-4 gap-5">
            <h1 className="text-white flex font-black align-middle justify-center p-1 bg-black border-white border-4 uppercase text-5xl">
              Type anything you need to do ! If you want to (lol){" "}
            </h1>
            <div className="flex flex-col justify-center items-center gap-3">
              <input
                value={newTask}
                className="w-full min-h-full h-10 text-black p-4 uppercase font-semibold"
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                className="bg-white
            text-black
            hover:bg-black
            hover:text-white
            border-2
            border-black
            hover:border-white
            uppercase
            text-base
            font-bold
            py-2
            px-4
            rounded-none
            cursor-pointer
            max-w-max
            
            "
                onClick={addTask}
              >
                ADD !
              </button>
            </div>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todolist;
