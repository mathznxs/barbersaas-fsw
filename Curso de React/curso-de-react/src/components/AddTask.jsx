import { useState } from "react";

export default function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="bg-slate-200 rounded-md shadow p-6 space-y-4 flex flex-col">
      <input
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={() => setTitle(event.target.value)}
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={() => setDescription(event.target.value)}
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
      />

      <button
        type="submit"
        className="bg-slate-500 text-white rounded-md py-2 font-medium"
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