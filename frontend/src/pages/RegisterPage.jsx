import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { registerUser } from '../store/authSlice';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
            toast.error('All form fields are required');
            return;
        }

        try {
            setIsLoading(true);
            const result = await dispatch(registerUser(formData));

            if (registerUser.rejected.match(result)) {
                toast.error(result.payload || 'Registration failed');
                return;
            }

            toast.success('Account created successfully');
            navigate('/');
        } catch {
            toast.error('Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen lg:grid lg:grid-cols-2">
            {/* Left panel */}
            <div className="relative hidden min-h-screen overflow-hidden bg-purple-700 lg:flex">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-72 top-16 h-[850px] w-[850px] rounded-full border border-white/10" />
                    <div className="absolute -left-60 top-28 h-[750px] w-[750px] rounded-full border border-white/10" />
                    <div className="absolute -left-48 top-40 h-[650px] w-[650px] rounded-full border border-white/10" />
    
                    <div className="absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full bg-primary-focus/30 blur-3xl" />
                </div>
    
                <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
                    <div>
                        {/* App icon */}
                        <div className="mb-16 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="34"
                                height="34"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white"
                            >
                                <path d="M4 4h16v16H4z" />
                                <path d="M8 8h8" />
                                <path d="M8 12h8" />
                                <path d="M8 16h5" />
                            </svg>
                        </div>
    
                        <h1 className="max-w-xl text-5xl font-bold leading-tight text-white xl:text-6xl">
                            Start your
                            <br />
                            NotesApp journey! ✨
                        </h1>
    
                        <p className="mt-8 max-w-lg text-lg leading-8 text-white/75">
                            Create your account and start capturing your
                            thoughts, ideas, and everything worth remembering.
                        </p>
                    </div>
    
                    <p className="text-sm text-white/50">
                        © 2026 NotesApp. All rights reserved.
                    </p>
                </div>
            </div>
    
            {/* Right panel */}
            <div className="flex min-h-screen items-center justify-center bg-base-100 px-6 py-12 sm:px-10">
                <div className="w-full max-w-md">
                    {/* Mobile branding */}
                    <div className="mb-10 flex items-center gap-3 lg:hidden">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 4h16v16H4z" />
                                <path d="M8 8h8" />
                                <path d="M8 12h8" />
                                <path d="M8 16h5" />
                            </svg>
                        </div>
    
                        <span className="text-xl font-bold">
                            NotesApp
                        </span>
                    </div>
    
                    {/* Heading */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Create an account
                        </h2>
    
                        <p className="mt-3 text-sm leading-6 text-base-content/60">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-base-content underline underline-offset-2 transition-colors hover:text-primary"
                            >
                                Login here
                            </Link>
                            .
                            <br />
                            It&apos;s free and takes less than a minute.
                        </p>
                    </div>
    
                    {/* Existing registration form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Name
                                </span>
                            </label>
    
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter your name"
                                className="input input-bordered w-full bg-base-100 focus:outline-none focus:border-primary"
                                name="name"
                                value={formData.name}
                            />
                        </div>
    
                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Email
                                </span>
                            </label>
    
                            <input
                                onChange={handleChange}
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full bg-base-100 focus:outline-none focus:border-primary"
                                name="email"
                                value={formData.email}
                            />
                        </div>
    
                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Password
                                </span>
                            </label>
    
                            <input
                                onChange={handleChange}
                                type="password"
                                placeholder="At least 6 characters"
                                className="input input-bordered w-full bg-base-100 focus:outline-none focus:border-primary"
                                name="password"
                                value={formData.password}
                            />
                        </div>
    
                        {/* Register */}
                        <button
                            type="submit"
                            className="btn btn-primary bg-purple-700 mt-2 w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : null}
    
                            Create Account
                        </button>
                    </form>
    
                    {/* Login */}
                    <p className="mt-8 text-center text-sm text-base-content/60">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-primary hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
