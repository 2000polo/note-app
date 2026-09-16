import { CrossIcon, Delete, DeleteIcon, Edit, LucideDelete, Pencil, Trash } from 'lucide-react';
import React from 'react';
import { formatDate } from '../../lib/utils';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import api from '../../lib/axios';

const NoteCard = ({note, setNotes}) => {

    const navigate = useNavigate();

    const navigateToUpdateNote = (e) => {
        e.preventDefault();
        navigate(`/note/update/${note?._id}`)
    }

    const colors = ['#249D8F', '#972828', '#BD114A', '#FA5C5C','#921A40']

    const deleteHandler = async (e, id) => {
        e.preventDefault();

        try{
            await api.delete(`/notes/${id}`);
            toast.success("Successfully deleted the note!");
            setNotes((prev) => prev?.filter((note) => note?._id !== id))
        }catch{
            toast.error("Failed to delete the note!");
        }

    }

    return (
        <Link 
            to={`/note/${note?._id}`}
            className="flex flex-col border-b border-white/10 rounded-3xl p-4 md:p-6 md:min-h-[235px]"
            style={{background:colors[Math.floor(Math.random() * 4)]}}
        >
            <div className='flex flex-col justify-center mb-4'>
                <div className='text-white font-medium uppercase mb-2 text-[12px] sm:text-base line-clamp-2'>{note?.title}</div>
                <div className="text-xs font-light text-white opacity-80 line-clamp-3">{ note?.description }</div>
            </div>
            <div className="list-actions flex gap-1 mt-auto items-center">
                <span className="text-xs font-light text-white opacity-80 italic flex-1">{formatDate(note?.createdAt)}</span>
                <button onClick={navigateToUpdateNote} className="btn btn-circle bg-black">
                    <Pencil className='text-white' size={14} />
                </button>
                <button onClick={(e) => deleteHandler(e, note?._id)} className="btn btn-circle bg-black">
                    <Trash size={14} />
                </button>
            </div>
        </Link>
    )
}

export default NoteCard;