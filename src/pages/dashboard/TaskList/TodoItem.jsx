import React from "react";
import { Input } from "reactstrap";

const TodoItem = ({ task, filteredTodos, setFilteredTodos }) => {
  const testTask = (todo) => {
    if (todo["status"] === "completed") {
      todo["status"] = "";
      const withoutChanged = filteredTodos.filter(task => task.id !== todo.id )

      setFilteredTodos([...withoutChanged, todo])
    } else {
      todo["status"] = "completed";
      const withoutChanged = filteredTodos.filter(
        (task) => task.id !== todo.id
      );
      setFilteredTodos([...withoutChanged, todo]);
    }
  };

  return (
    <div className="todo-item" key={task && task.id}>
      <Input
        type="checkbox"
        className="custom-input"
        onChange={() => testTask(task)}
        defaultChecked={task.status === "completed" ? true : false}
      />
      <div className="text-content">
        <p>{task && task.task_name}</p>
        <small>
          {/* You’re having a meeting the Saathi Hiring Team on the 17th of March,
          2021 by 4PM (WAT)  */}
          {task && task.details}
        </small>
      </div>
    </div>
  );
};

export default TodoItem;
