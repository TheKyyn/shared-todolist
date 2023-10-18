import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Task from "./Task";
import { collection, doc, addDoc, onSnapshot } from "firebase/firestore";

function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const tasksRef = collection(db, "todolists", "yourTodolistId", "tasks");
    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    const tasksRef = collection(db, "todolists", "yourTodolistId", "tasks");
    await addDoc(tasksRef, {
      title: newTask,
      completed: false,
    });
    setNewTask("");
  };

  return (
    <div>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={addTask}>Ajouter</button>

      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Todolist;
