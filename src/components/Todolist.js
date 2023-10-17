import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Task from "./Task";

function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("todolists")
      .doc("yourTodolistId")
      .collection("tasks")
      .onSnapshot((snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      });

    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    await db
      .collection("todolists")
      .doc("yourTodolistId")
      .collection("tasks")
      .add({
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
