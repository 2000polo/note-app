import { NotebookPen } from "lucide-react";
import { useNavigate } from "react-router";

const NoNotesFound = () => {

    const navigate = useNavigate();

    const navigateToCreateNote = () => {
        navigate('/create')
    }

    return (
        <div className="flex flex-col items-center justify-center text-center py-24 px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-5">
                <NotebookPen size={30} strokeWidth={1.8} />
            </div>

            <h2 className="text-2xl font-semibold">
                No notes yet
            </h2>

            <p className="text-base-content/60 mt-2 mb-6 max-w-sm">
                Capture your ideas, thoughts, and reminders by creating
                your first note.
            </p>

            <button onClick={navigateToCreateNote} className="btn btn-primary">
                Create your first note
            </button>
        </div>
    );
};

export default NoNotesFound;