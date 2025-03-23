import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQubicConnect } from '../contexts/QubicConnectContext';
import { useHM25 } from '../contexts/HM25Context';

function StartPage() {
    const navigate = useNavigate();
    const { connected, toggleConnectModal } = useQubicConnect();
    const { state, balance } = useHM25();

    if (!connected) {
        return (
            <div className="pt-24 px-6 pb-12 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Fund a project, get rewards</h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Please login to access the application.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center items-center">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg"
                            onClick={toggleConnectModal}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 px-6 pb-12 bg-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Welcome to HM25</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Manage and support sustainable development projects with ease.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg"
                        onClick={() => navigate('/projects')}
                    >
                        View Projects
                    </button>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-lg"
                        onClick={() => navigate('/add-project')}
                    >
                        Add Projects
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StartPage;
