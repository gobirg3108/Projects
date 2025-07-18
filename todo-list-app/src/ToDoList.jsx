import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([
    { text: "Eat Breakfast", completed: false },
    { text: "Go for a run", completed: false },
    { text: "Wake up early", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function toggleTask(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  function moveTask(direction, index) {
    const updatedTasks = [...tasks];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < tasks.length) {
      [updatedTasks[index], updatedTasks[newIndex]] = [
        updatedTasks[newIndex],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function clearCompleted() {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  }

  return (
    <div className="to-do-list">
      <h1>TO-DO LIST</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          aria-label="Enter a new task"
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-message">
          No tasks yet. Add a task to get started!
        </p>
      ) : (
        <ol>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              <span className="text" onClick={() => toggleTask(index)}>
                {task.text}
              </span>

              <div className="buttons-container">
                <button
                  className="complete-button"
                  onClick={() => toggleTask(index)}
                  aria-label={
                    task.completed ? "Mark as incomplete" : "Mark as complete"
                  }
                >
                  {task.completed ? "✓" : "○"}
                </button>

                <button
                  className="move-button"
                  onClick={() => moveTask("up", index)}
                  disabled={index === 0}
                  aria-label="Move task up"
                >
                  ↑
                </button>

                <button
                  className="move-button"
                  onClick={() => moveTask("down", index)}
                  disabled={index === tasks.length - 1}
                  aria-label="Move task down"
                >
                  ↓
                </button>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                  aria-label="Delete task"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}

      {tasks.some((task) => task.completed) && (
        <button className="clear-button" onClick={clearCompleted}>
          Clear Completed
        </button>
      )}
    </div>
  );
}

export default ToDoList;
