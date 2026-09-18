import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";

import api from "../../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Check, LoaderCircle } from "lucide-react";

const UpdatePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotesById = async () => {
            if (!id) return;

            try {
                const res = await api.get(`/notes/${id}`);

                console.log("response", res);

                setFormData({
                    title: res?.data?.note?.title || "",
                    content: res?.data?.note?.description || "",
                });
            } catch (error) {
                console.error("Failed to fetch note:", error);
                toast.error("Note not found!");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotesById();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error("Title and content are required");
            return;
        }

        try {
            setIsSaving(true);

            await api.put(`/notes/${id}`, {
                title: formData.title,
                description: formData.content,
            });

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
        <div className="lg:mx-auto max-w-6xl pb-24">

            {/* Back button */}
            <Link
                to={`/note/${id}`}
                className="
                    inline-flex
                    items-center
                    gap-2
                    mt-4
                    text-sm
                    text-white/60
                    hover:text-white
                    transition
                "
            >
                <ArrowLeft size={18} />
                <span>Back to note</span>
            </Link>

            {/* Note Editor */}
            <form onSubmit={handleSubmit}>

                <div className="rounded-3xl mt-8 shadow-xl">

                    <div className="card-body p-0">

                        {/* Title */}
                        <textarea
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            autoFocus
                            placeholder="Enter heading..."
                            className="
                                w-full min-h-[1lh] max-h-[200px] field-sizing-content resize-none
         bg-transparent leading-tight
         border-none
         outline-none
         text-2xl
         md:text-6xl
         font-bold
         text-white
         placeholder:text-white/30
         p-0
                            "
                        />

                        {/* Description */}
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Start writing your note..."
                            className="
                                w-full
                                min-h-[300px]
                                mt-4
                                bg-transparent
                                border-none
                                outline-none
                                resize-none
                                text-white
                                leading-relaxed
                                placeholder:text-white/30
                                p-0
                            "
                        />

                        {/* Divider */}
                        <div className="divider"></div>

                    </div>
                </div>

                {/* Fixed Bottom Actions */}
                <div
                    className="
                        fixed
                        bottom-0
                        left-0
                        right-0
                        z-50
                        border-t
                        border-white/10
                        bg-base-100/95
                        backdrop-blur-md
                        px-4
                        py-3
                    "
                >
                    <div
                        className="
                            mx-auto
                            max-w-6xl
                            flex
                            justify-end
                            items-center
                            gap-3
                        "
                    >

                        {/* Cancel */}
                        <Link
                            to={`/note/${id}`}
                            className="
                                btn
                                btn-ghost
                                text-white
                            "
                        >
                            Cancel
                        </Link>

                        {/* Save Changes */}
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="
                                btn
                                btn-primary
                                gap-2
                            "
                        >
                            {isSaving ? (
                                <>
                                    <LoaderCircle
                                        size={16}
                                        className="animate-spin"
                                    />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Check size={16} />
                                    Save Changes
                                </>
                            )}
                        </button>

                    </div>
                </div>

            </form>
        </div>
    );
};

export default UpdatePage;

