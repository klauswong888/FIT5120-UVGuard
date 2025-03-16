'use client';
import { useState, useEffect } from 'react';

const PasswordProtect = ({ children }: { children: React.ReactNode }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [hasTried, setHasTried] = useState(false);

    const correctPassword = 'uvguard2025';

    useEffect(() => {
        const storedAuth = localStorage.getItem('uvguard-auth');
        if (storedAuth === 'true') {
            setIsAuthorized(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setHasTried(true);
        if (inputPassword === correctPassword) {
            localStorage.setItem('uvguard-auth', 'true');
            setIsAuthorized(true);
        }
    };

    if (isAuthorized) return <>{children}</>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm flex flex-col items-center gap-4"
            >
                <h2 className="text-xl font-semibold text-purple-900">Enter Password</h2>
                <input
                    type="password"
                    placeholder="Password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {hasTried && inputPassword !== correctPassword && (
                    <p className="text-sm text-red-500">Incorrect password</p>
                )}
                <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
                >
                    Unlock
                </button>
            </form>
        </div>
    );
};

export default PasswordProtect;
