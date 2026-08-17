import { useState } from "react";

export default function AddExercise({ onAddTreinoSubmit }) {
  const [name, setName] = useState("");
  const [muscle, setMuscle] = useState("");
  const [series, setSeries] = useState("");
  const [rep, setRep] = useState("");
  const [kg, setKg] = useState("");
  return (
    <div className="bg-slate-200 rounded-md p-6 flex flex-col gap-4">
      <label htmlFor="" className="font-medium ">
        Exercício:
      </label>
      <input
        type="text"
        placeholder="Digite o nome do exercício"
        className="px-4 py-2 rounded-md border border-yellow-200 outline-yellow-300"
        value={name}
        onChange={() => setName(event.target.value)}
      />
      <label htmlFor="" className="font-medium ">
        Músculo:
      </label>
      <input
        type="text"
        placeholder="Músculo trabalhado no exercício"
        className="px-4 py-2 rounded-md border border-yellow-200 outline-yellow-300"
        value={muscle}
        onChange={() => setMuscle(event.target.value)}
      />
      <label htmlFor="" className="font-medium ">
        Séries:
      </label>
      <input
        type="number"
        placeholder="Quantidade de séries"
        className="px-4 py-2 rounded-md border border-yellow-200 outline-yellow-300"
        value={series}
        onChange={() => setSeries(event.target.value)}
      />
      <label htmlFor="" className="font-medium ">
        Repetições:
      </label>
      <input
        type="number"
        placeholder="Quantidade de repetições"
        className="px-4 py-2 rounded-md border border-yellow-200 outline-yellow-300"
        value={rep}
        onChange={() => setRep(event.target.value)}
      />
      <label htmlFor="" className="font-medium ">
        Carga (kg):
      </label>
      <input
        type="number"
        placeholder="Carga utilizada no exercício (Kg)"
        className="px-4 py-2 rounded-md border border-yellow-200 outline-yellow-300"
        value={kg}
        onChange={() => setKg(event.target.value)}
      />
      <button
        type="submit"
        className=" bg-yellow-500 rounded-md px-4 py-4 mt-4 "
        onClick={() => {
          onAddTreinoSubmit(name, muscle, series, rep, kg);
          setName("");
          setMuscle("");
          setSeries("");
          setRep("");
          setKg("");
        }}
      >
        Adicionar
      </button>
    </div>
  );
}
