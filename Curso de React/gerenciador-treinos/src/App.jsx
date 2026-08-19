import { useState } from "react";
import Training from "./components/Training";
import AddTraining from "./components/AddTraining";
import { X } from "lucide-react";

export default function App() {
  const [treinos, setTreinos] = useState([
    {
      id: 1,
      name: "Supino Reto",
      muscle: "Peito",
      series: 3,
      rep: 10,
      kg: 30,
      isCompleted: false,
    },
    {
      id: 2,
      name: "Rosca Scott",
      muscle: "Biceps",
      series: 3,
      rep: 10,
      kg: 22,
      isCompleted: false,
    },
    {
      id: 3,
      name: "Cadeira Extensora",
      muscle: "Perna",
      series: 3,
      rep: 10,
      kg: 55,
      isCompleted: false,
    },
  ]);

  const [selectedTreino, setSelectedTreino] = useState(null);

  function onTreinoClick(treinoId) {
    const newTreino = treinos.map((treino) => {
      if (treino.id === treinoId) {
        return { ...treino, isCompleted: !treino.isCompleted };
      }
      return treino;
    });
    setTreinos(newTreino);
  }

  function onDeleteTreinoClick(treinoId) {
    const newTreino = treinos.filter((treino) => treino.id != treinoId);
    setTreinos(newTreino);
    if (selectedTreino && selectedTreino.id === treinoId) {
      setSelectedTreino(null);
    }
  }

  function onAddTreinoSubmit(name, muscle, series, rep, kg) {
    const newTreino = {
      id: treinos.length + 1,
      name,
      muscle,
      series,
      rep,
      kg,
    };
    setTreinos([...treinos, newTreino]);
  }

  function onSeeDetailsClick(treinos) {
    setSelectedTreino(treinos);
  }

  return (
    <div className="h-screen w-screen bg-zinc-900 flex justify-center">
      <div className="x-[500px] space-y-4">
        <h1 className="text-yellow-600 font-bold text-4xl text-center p-10">
          Gerenciador de Treinos
        </h1>
        <AddTraining onAddTreinoSubmit={onAddTreinoSubmit} />
        <Training
          treinos={treinos}
          onTreinoClick={onTreinoClick}
          onDeleteTreinoClick={onDeleteTreinoClick}
          onSeeDetailsClick={onSeeDetailsClick}
        />
        {selectedTreino && (
          <div className="bg-slate-200 rounded-md p-6 ">
            <div className="flex justify-between px-4 p-4">
              <h2 className="text-yellow-600 font-bold text-4xl">{selectedTreino.name}</h2>
              <button onClick={() => onSeeDetailsClick(null)} className="text-center text-2xl text-zinc-700 hover:text-zinc-950"><X /></button>
            </div>
            <p className="text-[20px]"><span className="font-bold text-[20px]">Músculo:</span> {selectedTreino.muscle}</p>
            <p className="text-[20px]"><span className="font-bold text-[20px]">Séries:</span> {selectedTreino.series}</p>
            <p className="text-[20px]"><span className="font-bold text-[20px]">Repetições:</span> {selectedTreino.rep}</p>
            <p className="text-[20px]"><span className="font-bold text-[20px]">Carga (kg):</span> {selectedTreino.kg}</p>
          </div>
        )}
      </div>
    </div>
  );
}
