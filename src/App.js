import React, { useState, useEffect } from 'react';
import './App.css';


const TaskList = ({ tasks, toggleTask }) => (
  <ul>
    {tasks.map((task, index) => (
      <li className='text2' key={index}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(index)}
        />
        {task.text}
      </li>
    ))}
  </ul>
);



const AddTaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='input'
        type="text"
        placeholder="Ваша задача"
        value={newTask}
        onChange={handleInputChange}
      />
      <button className='submit' type="submit">Add</button>
    </form>
  );
};




const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return savedTasks;
  });

  useEffect(() => {
 
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
 
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const addTask = (text) => {
    const newTask = { text, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className='general_content'>
      <h1 className='text'>Task Checklist</h1>
      <AddTaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} />
    </div>
  );
};

export default App;
