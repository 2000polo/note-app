import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { DiamondPlus, Lightbulb, LogOut } from "lucide-react";

import toast from "react-hot-toast";

import { logoutUser } from "../store/authSlice";

import { useNavigate } from "react-router";

const getInitials = (name = "") => {
    return (
        name
            .split(" ")
            .filter(Boolean)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U"
    );
};

const Navbar = ({ notesCount }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await dispatch(logoutUser());

        if (logoutUser.rejected.match(result)) {
            toast.error(result.payload || "Logout failed");
            return;
        }

        toast.success("Logged out successfully");
    };

    const navigateToCreateNote = (e) => {
        e.preventDefault();
        navigate("/create");
    };

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center gap-2 md:gap-3 py-4 bg-base-100 shadow-2xl">
            {/* Logo */}
            <div className="logo-wrapper h-fit flex-1 flex items-center gap-2">
                <div className="icon p-2 bg-purple-700 rounded-2xl">
                    <span><Lightbulb /></span>
                </div>
                <span
                    onClick={() => navigate("/")}
                    className="text-white font-bold text-2xl cursor-pointer select-none"
                >
                     NotesApp
                </span>
            </div>

            {/* Create Note */}
            <div className="create-note-btn">
                <button
                    onClick={navigateToCreateNote}
                    className="btn btn-square rounded-2xl bg-purple-700 border-0"
                >
                    <DiamondPlus size={20} />
                </button>
            </div>

            {/* User */}
            <div className="flex gap-2 items-center">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="cursor-pointer"
                    >
                        <div className="avatar avatar-placeholder">
                            <div className="bg-sky-500 text-neutral-content w-10 rounded-2xl">
                                <span>{getInitials(user?.name)}</span>
                            </div>
                        </div>
                    </div>

                    <ul
                        tabIndex={-1}
                        className="menu dropdown-content bg-base-200 rounded-2xl z-50 mt-4 p-2 shadow-sm"
                    >
                        <li>
                            <div className="flex rounded-2xl">
                                <div className="avatar avatar-placeholder">
                                    <div className="bg-neutral text-neutral-content w-10 rounded-2xl">
                                        <span>
                                            {getInitials(user?.name)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center">
                                    <span className="text-white text-sm font-bold tracking-tight">
                                        {user?.name}
                                    </span>

                                    <span className="text-xs">
                                        {user?.email}
                                    </span>
                                </div>
                            </div>
                        </li>

                        <li>
                            <button
                                onClick={handleLogout}
                                className="rounded-2xl"
                                type="button"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;