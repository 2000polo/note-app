import { Toaster, toast } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import RateLimitUI from '../components/RateLimitUI'
import { useEffect, useState } from 'react'
import NoteList from '../components/NoteList'
import api from '../../lib/axios'
import NoNotesFound from '../components/NoNotesUI'

const HomePage = () => {

    const [ isRateLimited, setIsRateLimited ] = useState(false);
    const [ notes, setNotes ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchNotesFromDb = async() => {
            try {
                const res = await api.get("/notes");
                setNotes(res?.data?.notes);
                setIsRateLimited(false)
            }catch(error){
                if(error?.status === 429){
                    setIsRateLimited(true);
                }else{
                    toast.error("failed to fetch notes from db")
                }
            }finally{
                setIsLoading(false)
            }
        }

        fetchNotesFromDb();
    }, [])

    console.log(notes)

    return (
        <div className="mx-2 lg:mx-auto max-w-6xl">
            <Navbar notesCount={notes?.length || 0} />

            {
                isLoading && 
                <div> Loading... </div>
            }

            {
                notes?.length === 0 && !isRateLimited && !isLoading &&
                <NoNotesFound />
            }

            {
                isRateLimited && !isLoading &&
                <RateLimitUI />
            }

            {
                notes?.length > 0 && !isRateLimited &&
                <NoteList notes={notes} setNotes={setNotes} />
            }


        </div>
    )
}

export default HomePage