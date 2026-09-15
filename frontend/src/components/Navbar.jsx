import React from "react";  
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { logoutUser } from "../store/authSlice";

const getInitials = (name = "") => {
    return name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U";
};

const Navbar = ({ notesCount }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        const result = await dispatch(logoutUser());

        if (logoutUser.rejected.match(result)) {
            toast.error(result.payload || "Logout failed");
            return;
        }

        toast.success("Logged out successfully");
    };
    
    return (
        <header className="flex justify-between items-center my-2  rounded-xl py-2">
            <div className="logo-wrapper h-fit">
                <span className="text-white font-bold text-2xl">NotesApp</span>
            </div>

            <div className="flex gap-2 items-center">
                <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-12 rounded-full">
                        <span>{getInitials(user?.name)}</span>
                    </div>
                    
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-white text-sm font-bold tracking-tight">{user?.name}</span>
                    {typeof notesCount === "number" && (
                        <span className="text-xs">{notesCount} notes</span>
                    )}
                </div>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm ml-2" type="button">
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </header>
    )
}

export default Navbar
