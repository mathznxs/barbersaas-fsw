import { useState } from 'react'
import Exercises from './components/Exercises'
import AddExercise from './components/AddExercise'

function App() {
  const [treinos, setTreinos] = useState([
    {
      id: 1,
      name: "Supino Reto",
      muscle: "Peito",
      series: 3,
      rep: 10,
      kg: 45,
      isCompleted: false
    },
    {
      id: 2,
      name: "Rosca Scott",
      muscle: "Biceps",
      series: 3,
      rep: 10,
      kg: 24,
      isCompleted: false
    },
    {
      id: 3,
      name: "Cadeira Extensora",
      muscle: "Perna & Quadriceps",
      series: 3,
      rep: 10,
      kg: 65,
      isCompleted: false
    }
  ])
  function onTreinoClick(treinoId) {
    const newTreino = treinos.map((treino) => {
    if (treinos.id === treinoId) {
        return {...treino, isCompleted : !treino.isCompleted}
      }
      return treino
    })
    setTreinos(newTreino)
  }

  function onDeleteTreinoClick(treinoId) {
    const newTreino = treinos.filter((treino) => treino.id != treinoId)
    setTreinos(newTreino)
  }

  function onAddTreinoSubmit(name, muscle, series, rep, kg) {
    const newTreino = {
      id: treinos.length + 1,
      name,
      muscle,
      series,
      rep,
      kg,
      isCompleted: false
    }
    setTreinos([...treinos, newTreino])
  }

  return (
    <div className='w-screen h-screen bg-zinc-900 flex justify-center'>
      <div className='w-[500px] space-y-2'>
        <h1 className='font-bold text-yellow-600 text-4xl p-10'>Gereciador de Treinos</h1>
        <AddExercise onAddTreinoSubmit={onAddTreinoSubmit} />
        <Exercises treinos={treinos} onTreinoClick={onTreinoClick} onDeleteTreinoClick={onDeleteTreinoClick}/>
      </div>
    </div>
  )
}

export default App
