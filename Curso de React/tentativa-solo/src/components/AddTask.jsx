import { useState } from "react";

export default function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="bg-slate-200 p-6 rounded-md shadow flex flex-col gap-4 ">
      <input
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={() => setTitle(event.target.value)}
        className="px-4 py-2 rounded-md border border-slate-300 outline-slate-400"
      />
      <input
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={() => setDescription(event.target.value)}
        className="px-4 py-2 rounded-md border border-slate-300 outline-slate-400"
      />
      <button
        type="button"
        className="bg-slate-500 px-4 py-2 rounded-md text-white font-medium"
        onClick={() => {
          onAddTaskSubmit(title, description)
          setTitle("")
          setDescription("")
        }}
      >
        Adicionar
      </button>
    </div>
  );
}
