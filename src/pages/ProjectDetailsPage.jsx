import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../assets/projects.json';
import { useQubicConnect } from '../contexts/QubicConnectContext';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find((project) => project.id === parseInt(id));
    const { toggleConnectModal } = useQubicConnect();

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
                <div>
                    <h1 className="text-3xl font-bold">Project Not Found</h1>
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        onClick={() => navigate('/projects')}
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Header Section */}
            <div className="bg-gray-800 py-6 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold">{project.title}</h1>
                    <p className="text-gray-300 mt-2">{project.description}</p>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="flex-1 py-6 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2">Status</h2>
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                    project.status === 'Active'
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-yellow-500/20 text-yellow-400'
                                }`}
                            >
                                {project.status}
                            </span>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2">Progress</h2>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-32 bg-gray-600 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                                <span className="text-gray-400 text-sm">{project.progress}%</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2">Key Features</h2>
                            <ul className="list-disc list-inside text-gray-300">
                                {project.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2">Technical Stack</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.nextMilestone && (
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-2">Next Milestone</h2>
                                <p className="text-gray-300">{project.nextMilestone}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Section with Buttons */}
            <div className="bg-gray-800 py-4 px-6 fixed bottom-0 left-0 right-0">
                <div className="max-w-4xl mx-auto flex justify-between">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        onClick={() => navigate('/projects')}
                    >
                        Back to Projects
                    </button>
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors"
                        onClick={toggleConnectModal}
                    >
                        Invest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;