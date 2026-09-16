import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { loginUser } from '../store/authSlice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
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

        if (!formData.email.trim() || !formData.password) {
            toast.error('Email and password are required');
            return;
        }

        try {
            setIsLoading(true);
            const result = await dispatch(loginUser(formData));

            if (loginUser.rejected.match(result)) {
                toast.error(result.payload || 'Login failed');
                return;
            }

            toast.success('Logged in successfully');
            navigate('/');
        } catch {
            toast.error('Login failed');
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
                            Hello
                            <br />
                            NotesApp! 👋
                        </h1>
    
                        <p className="mt-8 max-w-lg text-lg leading-8 text-white/75">
                            Capture your thoughts, organize your ideas, and
                            keep your important notes in one simple place.
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
                    <div className="mb-12 flex items-center gap-3 lg:hidden">
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
                            Welcome back!
                        </h2>
    
                        <p className="mt-3 text-sm leading-6 text-base-content/60">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-base-content underline underline-offset-2 transition-colors hover:text-primary"
                            >
                                Create a new account
                            </Link>
                            .
                            <br />
                            It&apos;s free and takes less than a minute.
                        </p>
                    </div>
    
                    {/* Existing login form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
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
                            <div className="flex items-center justify-between">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Password
                                    </span>
                                </label>
    
                                <button
                                    type="button"
                                    className="text-xs font-medium text-base-content/50 hover:text-primary"
                                >
                                    Forgot password?
                                </button>
                            </div>
    
                            <input
                                onChange={handleChange}
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full bg-base-100 focus:outline-none focus:border-primary"
                                name="password"
                                value={formData.password}
                            />
                        </div>
    
                        {/* Login button */}
                        <button
                            type="submit"
                            className="btn btn-primary bg-purple-700 mt-2 w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : null}
    
                            Login Now
                        </button>
                    </form>
    
                    {/* Divider */}
                    <div className="divider my-7 text-xs text-base-content/30">
                        OR
                    </div>
    
                    {/* Google button - UI only */}
                    <button
                        type="button"
                        className="btn btn-outline w-full bg-base-100"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fill="#4285F4"
                                d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.93-4.18 2.93-7.39Z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 21.99c2.63 0 4.84-.87 6.45-2.37l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.5A9.75 9.75 0 0 0 12 21.99Z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M6.54 14.08A5.86 5.86 0 0 1 6.24 12c0-.72.12-1.42.3-2.08v-2.5H3.3A9.99 9.99 0 0 0 2.25 12c0 1.61.39 3.13 1.05 4.5l3.24-2.42Z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.9c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 2.99 14.63 2 12 2a9.75 9.75 0 0 0-8.7 5.42l3.24 2.5 3.24-2.5C7.31 7.62 9.46 5.9 12 5.9Z"
                            />
                        </svg>
    
                        Continue with Google
                    </button>
    
                    {/* Register */}
                    <p className="mt-8 text-center text-sm text-base-content/60">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-primary hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
