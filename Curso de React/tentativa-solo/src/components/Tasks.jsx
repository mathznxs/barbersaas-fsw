import { ChevronRightIcon, TrashIcon } from "lucide-react";

export default function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  return (
    <ul className="bg-slate-200 p-6 rounded-md shadow space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-center gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className={`text-white bg-slate-400 p-2 rounded-md w-full text-left ${task.isCompleted && "line-through"}`}
          >
            {task.title}
          </button>
          <button className="text-white bg-slate-400 p-2 rounded-md ">
            <ChevronRightIcon />
          </button>
          <button
            onClick={() => onDeleteTaskClick(task.id)}
            className="text-white bg-slate-400 p-2 rounded-md"
          >
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}
