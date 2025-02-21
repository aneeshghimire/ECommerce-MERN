import { useState } from 'react';
import { Lock, User,Mail } from 'lucide-react';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md transform transition-all hover:scale-[1.01]">
                <div className="flex flex-col items-center mb-6">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <User size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">We are glad to see you again</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="password"
                                name="password"
                                value={formData.password} 
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : 'Sign In'}
                    </button>
                </form>


               

                <p className="text-center text-gray-600 mt-8">
                    Don't have an account?
                    <a href="/register" className="text-green-600 hover:text-green-700 font-medium ml-1">
                        Sign up for free
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;