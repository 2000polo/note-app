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
        <div className="mx-2 lg:mx-auto max-w-6xl min-h-screen flex items-center">
            <div className="card bg-base-100 border border-white/10 max-w-md mx-auto p-4 w-full">
                <h2 className="card-title mb-1 text-white">Create an account</h2>
                <p className="text-sm opacity-70 mb-4">Register to start taking notes</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Name</span>
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            name="name"
                            value={formData.name}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Email</span>
                        </label>
                        <input
                            onChange={handleChange}
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            name="email"
                            value={formData.email}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Password</span>
                        </label>
                        <input
                            onChange={handleChange}
                            type="password"
                            placeholder="At least 6 characters"
                            className="input input-bordered w-full"
                            name="password"
                            value={formData.password}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                        {isLoading ? <span className="loading loading-spinner"></span> : null}
                        Register
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="link link-primary">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
