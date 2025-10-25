import React, { useState , useEffect } from 'react';
import './style.css';

export default function App() {
  const [task, setTask] = useState(()=>{
    const LocalTodo=localStorage.getItem('task');
    return LocalTodo?JSON.parse(LocalTodo):[]
  });
  const [newTask, setNewTask] = useState('');

  useEffect(()=>{
    localStorage.setItem('task',JSON.stringify(task));
  },[task]);

  function handleNewTask(e) {
    setNewTask(e.target.value);
  }
  function addTask() {
    if (newTask.trim() !== '') {
      setTask((All) => [...All,{
        id:Date.now(),
        Goal:newTask,
        completed:false
      }]);
      setNewTask('');
      //console.log(task)
    }
  }

  const deleteTask = (index) => {
    const updatedTasks = task.filter((tasks) => tasks.id !== index);
    setTask(updatedTasks);
  };

  function upTask(index) {
    if (index > 0) {
      const newUpdatedTasks = [...task];
      [newUpdatedTasks[index], newUpdatedTasks[index - 1]] = [
        newUpdatedTasks[index - 1],
        newUpdatedTasks[index],
      ];
      setTask(newUpdatedTasks);
    }
  }
  function downTask(index) {
    if (index < task.length - 1) {
      const newUpdatedTasks = [...task];
      [newUpdatedTasks[index + 1], newUpdatedTasks[index]] = [
        newUpdatedTasks[index],
        newUpdatedTasks[index + 1],
      ];
      setTask(newUpdatedTasks);
    }
  }
  function Refresh(){
    setTask([])
  }
  function Check(i){
    setTask(
    task.map(task =>task.id==i?{...task,completed:!task.completed}:task))
         
  }

  return (
    <>
      <div>
        <h1>My Todo List</h1>
        <button onClick={Refresh}>🔄</button>
        <input
          value={newTask}
          placeholder="Enter Your New Task"
          onChange={handleNewTask}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ol>
        {task.map((tasks,index) => (
          <div key={tasks.id}>
            <input 
            type="checkbox"
            checked={tasks.completed} 
            onChange={()=>Check(tasks.id)}
            />
            <li
            className={tasks.completed?"Completed":""}>{tasks.Goal}</li>

            <button onClick={() => deleteTask(tasks.id)}>Delete</button>
            <button onClick={() => upTask(index)}>⬆️</button>
            <button onClick={() => downTask(index)}>⬇️</button>
          </div>
        ))}
      </ol>

      
    </>
  );
}
