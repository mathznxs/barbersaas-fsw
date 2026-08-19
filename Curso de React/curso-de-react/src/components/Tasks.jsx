import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }
  return (
    <ul className="bg-slate-200 p-6 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex">
          <button
            onClick={() => onTaskClick(task.id)}
            className={`bg-slate-400 text-white p-2 rounded-md m-2 w-full text-left ${task.isCompleted && "line-through"}`}
          >
            {task.title}
          </button>
          <button onClick={() => onSeeDetailsClick(task)} className="text-white bg-slate-400 p-2 rounded-md m-2">
            <ChevronRightIcon />
          </button>
          <button
            onClick={() => onDeleteTaskClick(task.id)}
            className="text-white bg-slate-400 p-2 rounded-md m-2"
          >
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}
