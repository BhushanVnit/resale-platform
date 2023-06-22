import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send signup information to server
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-lg font-medium mb-4 text-center">Sign Up</h2>
                <label className="block font-medium text-gray-700 mb-2">Email:</label>
                <input
                    className="w-full border border-gray-400 p-2 rounded-lg mb-4"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <label className="block font-medium text-gray-700 mb-2">Username:</label>
                <input
                    className="w-full border border-gray-400 p-2 rounded-lg mb-4"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
                <label className="block font-medium text-gray-700 mb-2">Password:</label>
                <input
                    className="w-full border border-gray-400 p-2 rounded-lg mb-4"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <label className="block font-medium text-gray-700 mb-2">Confirm Password:</label>
                <input
                    className="w-full border border-gray-400 p-2 rounded-lg mb-4"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                />
                <div className="flex items-center justify-center">
                    <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">
                        Sign Up
                    </button>
                </div>
                <div className="text-center mt-4">
                    Already have an account? <Link className="text-indigo-500 hover:text-indigo-600" to="/">Log in</Link>
                </div>
            </form>
        </div>
    );
}

export default SignupScreen;
