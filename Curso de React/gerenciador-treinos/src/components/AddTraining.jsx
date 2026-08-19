import { useState } from "react";

export default function AddTraining({ onAddTreinoSubmit }) {
  const [name, setName] = useState("");
  const [muscle, setMuscle] = useState("");
  const [series, setSeries] = useState("");
  const [rep, setRep] = useState("");
  const [kg, setKg] = useState("");

  return (
    <div className="bg-slate-200 rounded-md p-6 shadow flex flex-col gap-4">
      <input
        type="text"
        placeholder="Nome do exercício"
        className="px-4 py-2 rounded-md border border-yellow-200 outline-yellow-300"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Músculo trabalhado"
        className="px-4 py-2 rounded-md border border-yellow-200 outline-yellow-300"
        value={muscle}
        onChange={(event) => setMuscle(event.target.value)}
      />
      <div className="space-x-4">
        <input
          type="number"
          placeholder="Quantidade de séries"
          className="px-4 py-2 rounded-md border border-yellow-200 outline-yellow-300"
          value={series}
          onChange={(event) => setSeries(event.target.value)}
        />
        <input
          type="number"
          placeholder="Repetições"
          className="px-4 py-2 rounded-md border border-yellow-200 outline-yellow-300"
          value={rep}
          onChange={(event) => setRep(event.target.value)}
        />
        <input
          type="number"
          placeholder="Carga"
          className="px-4 py-2 rounded-md border border-yellow-200 outline-yellow-300"
          value={kg}
          onChange={(event) => setKg(event.target.value)}
        />
      </div>
      <button onClick={() => {
        onAddTreinoSubmit(name, muscle, series, rep, kg)
        setName("")
        setMuscle("")
        setSeries("")
        setRep("")
        setKg("")
      }} className="bg-yellow-600 rounded-md p-4">Adicionar</button>
    </div>
  );
}
