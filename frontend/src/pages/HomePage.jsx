import { Toaster, toast } from 'react-hot-toast'
import RateLimitUI from '../components/RateLimitUI'
import { useEffect, useState } from 'react'
import NoteList from '../components/NoteList'
import api from '../../lib/axios'
import NoNotesFound from '../components/NoNotesUI'
import { getGreeting } from '../utils/greeting'
import { useSelector } from 'react-redux'

const HomePage = () => {

    const [ isRateLimited, setIsRateLimited ] = useState(false);
    const [ notes, setNotes ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const { user } = useSelector((state) => state.auth);


    const greeting = getGreeting();

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
        <div className="">
            {/* <Navbar notesCount={notes?.length || 0} /> */}

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
                <>
                    <section className='mt-4'>
                        <h1 className='text-xl md:text-4xl text-white font-medium flex flex-col'>
                            <span>{greeting},</span>
                            <span>{user?.name || 'there'}. 👋</span>
                        </h1>

                        <p className='text-xs md:text-sm md:max-w-[70%] mt-2'>
                            Keep your thoughts organized and your ideas within reach. Capture
                            what matters, jot down something you don’t want to forget, and come
                            back to it whenever you need.
                        </p>
                    </section>
                    <NoteList notes={notes} setNotes={setNotes} />
                </>
            }
        </div>
    )
}

export default HomePage