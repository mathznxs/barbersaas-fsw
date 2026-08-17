import { useState } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar Java",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil doloribus minus non veniam ullam asperiores vero dolore, et error. Fugiat sapiente rerum nisi reiciendis nihil aut odit quam cum ea.",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Consagração Camp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil doloribus minus non veniam ullam asperiores vero dolore, et error. Fugiat sapiente rerum nisi reiciendis nihil aut odit quam cum ea.",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Terminar a aplicação",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil doloribus minus non veniam ullam asperiores vero dolore, et error. Fugiat sapiente rerum nisi reiciendis nihil aut odit quam cum ea.",
      isCompleted: false,
    },
  ]);

  function onTaskClick(taskId) {
    const newTask = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTask);
  }

  function onDeleteTaskClick(taskId) {
    const newTask = tasks.filter((task) => task.id != taskId);
    setTasks(newTask);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-800 flex justify-center">
      <div className="w-[500px] space-y-4">
        <h1 className="text-center font-bold text-3xl text-white p-6">
          Gerenciador de tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
