import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router'
import { formatDate } from '../../lib/utils';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
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


    return (
        <div className="mx-2 lg:mx-auto max-w-6xl">

            <header className="flex justify-between items-center my-2 bg-white/10 rounded-xl p-2">
                <div className="logo-wrapper h-fit">
                    <span className="text-primary font-bold text-2xl">NotesApp</span>
                </div>

                <div>
                    <Link to='/create' className="btn btn-primary">Add Notes</Link>
                </div>
            </header>

            {/* Back button */}
            <Link to='/' className="btn btn-link">
                <ArrowLeft />
                <span className='font-base'>Back to home</span>
            </Link>

            {/* Note Card */}
            <div className="bg-white/10 rounded-xl mt-2 shadow-xl">
                <div className="card-body">

                    <h1 className="card-title text-3xl text-white">
                        {note.title}
                    </h1>

                    <p className="whitespace-pre-wrap mt-4 text-white">
                        {note.description}
                    </p>

                    <div className="divider"></div>

                    <div className="text-sm text-base-content/60">
                        <p className='text-white'>
                            Created:{" "}
                            {formatDate(note.createdAt)}
                        </p>

                        <p className='text-white'>
                            Updated:{" "}
                            {formatDate(note.updatedAt)}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NoteDetailPage;