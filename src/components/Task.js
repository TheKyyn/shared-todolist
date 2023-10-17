import React from "react";
import { db } from "../firebase";

//Ce composant affiche une tâche individuelle et permet de changer son état (complété ou non)

function Task({ task }) {
  const toggleCompleted = async () => {
    await db
      .collection("todolists")
      .doc("yourTodolistId")
      .collection("tasks")
      .doc(task.id)
      .update({
        completed: !task.completed,
      });
  };

  return (
    <div>
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.title}
      </span>
      <button onClick={toggleCompleted}>
        {task.completed ? "Marquer comme à faire" : "Marquer comme complété"}
      </button>
    </div>
  );
}

export default Task;
