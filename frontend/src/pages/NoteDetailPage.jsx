import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router'
import { formatDate } from '../../lib/utils';
import toast from 'react-hot-toast';
import { ArrowLeft, Pencil, Trash } from 'lucide-react';
import api from '../../lib/axios';

const NoteDetailPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [ note, setNote ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchNotesById = async () => {
            try{    
                const res = await api.get(`/notes/${id}`)
                console.log(res)
                setNote(res?.data?.note)
                setIsLoading(false);
            }catch{
                toast.error("Failed to fetch the Note")
            }finally{
                setIsLoading(false)
            }
        }

        fetchNotesById();
    }, [])

    console.log("note", note)

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!note) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-xl font-semibold">
                    Note not found
                </h2>

                <button
                    onClick={() => navigate("/")}
                    className="btn btn-primary mt-4"
                >
                    Go Home
                </button>
            </div>
        );
    }

    const navigateToUpdateNote = (e) => {
        e.preventDefault();
        navigate(`/note/update/${note?._id}`)
    }

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
        <div className=" lg:mx-auto max-w-6xl">

            {/* <header className="flex justify-between items-center my-2 bg-white/10 rounded-xl p-2">
                <div className="logo-wrapper h-fit">
                    <span className="text-primary font-bold text-2xl">NotesApp</span>
                </div>

                <div>
                    <Link to='/create' className="btn btn-primary">Add Notes</Link>
                </div>
            </header> */}

            {/* Back button */}
            {/* <Link to='/' className="btn btn-link">
                <ArrowLeft />
                <span className='font-base'>Back to home</span>
            </Link> */}

            {/* Note Card */}
            <div className="rounded-3xl mt-8 shadow-xl">
                <div className="card-body p-0">

                    <div className="header-with-actions">
                        {/* <span className="text-xs font-light text-white opacity-80 italic flex-1">{formatDate(note?.createdAt)}</span> */}
                        <h1 className="card-title text-2xl md:text-6xl text-white">
                            {note.title}
                        </h1>

                        <div className="list-actions flex gap-3 mt-3 items-center">
                            <div className="flex flex-1 flex-col">
                                <span className="text-xs font-light text-white opacity-80 italic flex-1">Created on: {formatDate(note?.createdAt)}</span>
                                <span className="text-xs font-light text-white opacity-80 italic flex-1">Last updated on: {formatDate(note?.updatedAt)}</span>
                            </div>
                            <button onClick={navigateToUpdateNote} className="btn btn-circle bg-black">
                                <Pencil className='text-white' size={14} />
                            </button>
                            <button onClick={(e) => deleteHandler(e, note?._id)} className="btn btn-circle bg-red-500">
                                <Trash size={14} />
                            </button>
                        </div>
                    </div>

                    <p className="whitespace-pre-wrap mt-4 text-white">
                        {note.description}
                    </p>

                    <div className="divider"></div>

                </div>
            </div>
        </div>
    )
}

export default NoteDetailPage;