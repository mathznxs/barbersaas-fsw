import { ChevronRightIcon, TrashIcon } from "lucide-react";

export default function Exercises({
  treinos,
  onTreinoClick,
  onDeleteTreinoClick,
}) {
  return (
    <ul className="bg-slate-200 rounded-md p-6 space-y-4">
      {treinos.map((treino) => (
        <li key={treino.id} className="flex gap-2">
          <button
            onClick={() => onTreinoClick(treino.id)}
            className={`text-white bg-yellow-600 rounded-md px-4 py-2 w-full text-left ${treino.isCompleted && "line-through"}`}
          >
            {treino.name}
          </button>
          <button className="text-white bg-yellow-600 rounded-md px-4 py-2">
            <ChevronRightIcon />
          </button>
          <button onClick={() => onDeleteTreinoClick(treino.id)} className="text-white bg-yellow-600 rounded-md px-4 py-2">
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}
