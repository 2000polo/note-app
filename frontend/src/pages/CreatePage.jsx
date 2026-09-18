import { useState } from "react";
import { ArrowLeft, Check, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../../lib/axios";

const CreatePage = () => {
    const navigate = useNavigate();

    const initialFormData = {
        title: "",
        description: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            toast.error("Title and description are required");
            return;
        }

        try {
            setIsLoading(true);

            await api.post("/notes", formData);

            toast.success("Successfully created the note");
            navigate("/");
        } catch (error) {
            toast.error("Failed to create note");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="lg:mx-auto max-w-6xl pb-24">

            {/* Back button */}
            <Link
                to="/"
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
                <span>Back to home</span>
            </Link>

            {/* Note Editor */}
            <form onSubmit={handleSubmit}>

                <div className="rounded-3xl mt-8 shadow-xl">
                    <div className="card-body p-0">

                        {/* Title */}
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            autoFocus
                            placeholder="Enter heading..."
                            className="
                                w-full
                                bg-transparent
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
                            name="description"
                            value={formData.description}
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
                            to="/"
                            className="
                                btn
                                btn-ghost
                                text-white
                            "
                        >
                            Cancel
                        </Link>

                        {/* Save */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="
                                btn
                                btn-primary
                                gap-2
                            "
                        >
                            {isLoading ? (
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
                                    Save Note
                                </>
                            )}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default CreatePage;

