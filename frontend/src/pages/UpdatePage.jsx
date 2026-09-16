import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import api from "../../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

const UpdatePage = () => {

    const [ isLoading, setIsLoading ] = useState(true); 
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({ title: "", content: "", });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotesById = async () => {
            if(id){
                try{
                    const res = await api.get(`/notes/${id}`);
                    console.log("response", res);
                    setFormData({ title: res?.data?.note?.title || "", content: res?.data?.note?.description || "", });
                }catch{ 
                    toast.error("Note not found!");
                    setIsLoading(false);
                }finally{
                    setIsLoading(false);
                }
            }
        }

        fetchNotesById();
    }, [id])

    const handleChange = (e) => { 
        const { name, value } = e.target; 
        setFormData((prev) => (
            { 
                ...prev, 
                [name]: value, 
            }
        )); 
    };

    const handleSubmit = async (e) => { 
            e.preventDefault(); 
            if (!formData.title.trim() || !formData.content.trim()) {
                toast.error("Title and content are required"); 
                return; 
            } 
            try { setIsSaving(true); 
                await api.put(`notes/${id}`, { title: formData.title, description: formData.content, });
                toast.success("Note updated successfully");
                navigate(`/note/${id}`); 
            } catch (error) {
                console.error("Failed to update note:", error); 
                toast.error("Failed to update note"); 
            } finally { 
                setIsSaving(false); 
            } 
    };

    if (isLoading) {
        return ( 
            <div className="flex justify-center py-20"> 
                <span className="loading loading-spinner loading-lg" /> 
            </div> 
        ); 
    }

    return (
        <>
            <div className="max-w-2xl mx-auto px-4 py-8"> 
                {/* <button onClick={() => navigate(-1)} className="btn btn-ghost mb-6" > 
                    <ArrowLeft size={18} /> Back 
                </button>  */}
                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body"> 
                        <h1 className="text-2xl font-bold mb-4"> Edit Note </h1> 
                        <form onSubmit={handleSubmit} className="space-y-5"> {/* Title */} 
                            <div className="form-control"> 
                                <label className="label"> 
                                    <span className="label-text"> Title </span> 
                                </label> 
                                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter note title" className="input input-bordered w-full" /> 
                            </div> {/* Content */} 
                            <div className="form-control"> 
                                <label className="label"> 
                                    <span className="label-text"> Content </span> 
                                </label> 
                                <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Write your note..." className="textarea textarea-bordered w-full h-48" /> 
                            </div> {/* Submit */} 
                            <button type="submit" disabled={isSaving} className="btn btn-primary w-full" > 
                            { isSaving ? 
                                ( <> <span className="loading loading-spinner loading-sm" /> Saving... </> ) 
                                : ( <> <Save size={18} /> Save Changes </> )
                            } 
                            </button> 
                        </form> 
                    </div> 
                </div> 
            </div>
        </>
    )
}

export default UpdatePage;