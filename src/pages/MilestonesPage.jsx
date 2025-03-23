import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../assets/projects.json';

const MilestonesPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => p.id === parseInt(id));
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [votes, setVotes] = useState(
        project?.tiers?.reduce((acc, tier, index) => {
            if (tier.proofOfCompletion) {
                acc[index] = tier.proofOfCompletion.votes || 0;
            }
            return acc;
        }, {})
    );

    const handleVote = (index) => {
        setVotes(prev => ({
            ...prev,
            [index]: (prev[index] || 0) + 1
        }));
    };

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        onClick={() => navigate('/projects')}
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    const getMilestoneStatusColor = (status) => {
        switch(status) {
            case "Completed":
                return "bg-green-500/20 text-green-400";
            case "In Progress":
                return "bg-blue-500/20 text-blue-400";
            default:
                return "bg-gray-500/20 text-gray-400";
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">{project.title}</h1>
                        <button
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors mt-24"
                            onClick={() => navigate(`/project/${id}`)}
                        >
                            Back to Project
                        </button>
                    </div>
                </div>
            </div>

            {/* Spacer to fix layout issues */}
            <div className="h-4 bg-gray-900"></div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8 ">
                <div className="grid gap-6">
                    {project.tiers.map((tier, index) => (
                        <div 
                            key={index}
                            className={`bg-gray-800 rounded-lg overflow-hidden ${
                                tier.status === "Completed" ? "border-l-4 border-green-500" : 
                                tier.status === "In Progress" ? "border-l-4 border-blue-500" : ""
                            }`}
                        >
                            <div className="p-6">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold">{tier.name}</h2>
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm mt-1 ${getMilestoneStatusColor(tier.status)}`}>
                                                {tier.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-gray-400 text-sm mb-1">Funding Goal</div>
                                        <div className="text-lg font-medium">{tier.fundingGoal}</div>
                                    </div>
                                </div>

                                <p className="text-gray-300 mb-6">{tier.description}</p>

                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-400">Progress</span>
                                        <span className="text-gray-400">{tier.percentage}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${tier.status === "Completed" ? "bg-green-500" : "bg-blue-500"}`}
                                            style={{ width: `${tier.percentage}%` }}
                                        />
                                    </div>
                                </div>

                                {tier.status === "Completed" && tier.proofOfCompletion && (
                                    <div className="mt-6 pt-6 border-t border-gray-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold">Proof of Completion</h3>
                                            <button
                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                                onClick={() => setSelectedMilestone(selectedMilestone === index ? null : index)}
                                            >
                                                {selectedMilestone === index ? 'Hide Details' : 'Show Details'}
                                            </button>
                                        </div>

                                        {selectedMilestone === index && (
                                            <div className="bg-gray-700/30 rounded-lg p-4 mb-4">
                                                <p className="text-gray-300">{tier.proofOfCompletion.description}</p>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <button
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                                        onClick={() => handleVote(index)}
                                                    >
                                                        Validate Milestone
                                                    </button>
                                                    <div className="text-gray-400">
                                                        {votes[index] || 0} validations received
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MilestonesPage;