import {ChevronRightIcon, TrashIcon} from 'lucide-react'


export default function Training({treinos, onTreinoClick, onDeleteTreinoClick, onSeeDetailsClick}) {
    return (
        <ul className='bg-slate-200 p-6 rounded-md shadow-sm space-y-4'>
            {treinos.map((treino) => (
                <li key={treino.id} className='flex gap-4'>
                    <button onClick={() => onTreinoClick(treino.id)} className={`bg-yellow-600 px-4 py-2 rounded-md w-full text-left ${treino.isCompleted && "line-through"}`}>{treino.name}</button>
                    <button onClick={() => onSeeDetailsClick(treino)} className='bg-yellow-600 p-3 rounded-md'><ChevronRightIcon /></button>
                    <button onClick={() => onDeleteTreinoClick(treino.id)} className='bg-yellow-600 p-3 rounded-md'><TrashIcon /></button>
                </li>
            ))}
        </ul>
    )
}