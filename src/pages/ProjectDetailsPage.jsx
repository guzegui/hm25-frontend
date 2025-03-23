import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../assets/projects.json';
import { useQubicConnect } from '../contexts/QubicConnectContext';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find((project) => project.id === parseInt(id));
    const { toggleConnectModal } = useQubicConnect();
    const [selectedProof, setSelectedProof] = useState(null);

    const [votes, setVotes] = useState(
        project?.tiers?.reduce((acc, tier, index) => {
            if (tier.proofOfCompletion) {
                acc[index] = tier.proofOfCompletion.votes;
            }
            return acc;
        }, {})
    );

    const handleVote = (index) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [index]: (prevVotes[index] || 0) + 1,
        }));
    };

    const completedTiers = project?.tiers?.filter(tier => tier.status === "Completed").length || 0;
    const totalTiers = project?.tiers?.length || 0;

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
            {/* Hero Banner */}
            <div className="relative h-80 w-full">
                <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="w-full max-w-6xl mx-auto p-8">
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="bg-blue-900/70 text-blue-300 px-3 py-1 rounded-full text-sm">
                                {project.location}
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                    project.status === 'Active'
                                        ? 'bg-green-500/30 text-green-400'
                                        : 'bg-yellow-500/30 text-yellow-400'
                                }`}
                            >
                                {project.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl sm:text-5xl font-bold">{project.title}</h1>
                            <button
                                onClick={() => navigate(`/project/${id}/milestones`)}
                                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                            >
                                View All Milestones
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-6xl mx-auto px-6 py-8">
                {/* Project Brief */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                        <p className="text-gray-300 mb-6">{project.description}</p>
                        
                        <div className="bg-gray-800 p-6 rounded-lg mb-6">
                            <h3 className="text-xl font-bold mb-4">Impact</h3>
                            <p className="text-gray-300 text-lg">{project.impact}</p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Project Progress</h3>
                        
                        {/* Enhanced milestone progress visualization */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-300">Overall Completion</span>
                                <span className="text-gray-300">{project.progress}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-300">Milestones Completed</span>
                                <span className="text-white font-medium">{completedTiers} of {totalTiers}</span>
                            </div>
                            
                            {/* Milestone progress bar with clear segments and outlines - No numbers */}
                            <div className="h-7 w-full bg-gray-700 rounded-lg overflow-hidden flex">
                                {project.tiers.map((tier, index) => (
                                    <div 
                                        key={index}
                                        className={`h-full ${tier.status === "Completed" ? "bg-green-500" : tier.status === "In Progress" ? "bg-blue-500" : "bg-gray-600"} 
                                                   relative border-r border-l ${index === 0 ? "border-l-0" : ""} ${index === project.tiers.length - 1 ? "border-r-0" : ""} border-gray-900`}
                                        style={{ width: `${100 / totalTiers}%` }}
                                        onClick={() => navigate(`/project/${id}/milestones`)}
                                    >
                                        {tier.status === "Completed" && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Milestone tier name labels below the bar */}
                            <div className="flex mt-1 text-[10px]">
                                {project.tiers.map((tier, index) => (
                                    <div 
                                        key={index}
                                        className="text-center overflow-hidden whitespace-nowrap text-ellipsis text-gray-400" 
                                        style={{ width: `${100 / totalTiers}%` }}
                                        title={tier.name}
                                    >
                                        {tier.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="h-px bg-gray-700 my-4"></div>
                        
                        <h3 className="text-xl font-bold mb-4">Next Steps</h3>
                        <p className="text-gray-300">{project.nextMilestone}</p>
                        
                        <div className="mt-6">
                            <button
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                onClick={() => navigate(`/project/${id}/milestones`)}
                            >
                                Support This Project
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Milestones / Tiers */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Project Milestones</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.tiers.map((tier, index) => (
                            <div 
                                key={index} 
                                className={`bg-gray-800 p-6 rounded-lg ${tier.status === "Completed" ? "border-l-4 border-green-500" : tier.status === "In Progress" ? "border-l-4 border-blue-500" : ""} cursor-pointer`}
                                onClick={() => navigate(`/project/${id}/milestones`)}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-xl font-bold">{tier.name}</h3>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${getMilestoneStatusColor(tier.status)}`}>
                                        {tier.status}
                                    </span>
                                </div>
                                <p className="text-gray-300 mb-4">{tier.description}</p>
                                <div className="mb-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-gray-400 text-sm">Progress</span>
                                        <span className="text-gray-400 text-sm">{tier.percentage}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${tier.status === "Completed" ? "bg-green-500" : "bg-blue-500"}`}
                                            style={{ width: `${tier.percentage}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="text-right text-gray-300 text-sm mt-2">
                                    Funding Goal: <span className="text-white font-medium">{tier.fundingGoal}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Features */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                        <ul className="space-y-3">
                            {project.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <svg className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Implementation Approach</h2>
                        <div className="flex flex-wrap gap-3">
                            {project.stack.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section with Buttons */}
            <div className="bg-gray-800 py-4 px-6 mt-auto sticky bottom-0 left-0 right-0 z-10">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <button
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                        onClick={() => navigate('/projects')}
                    >
                        Back to Projects
                    </button>
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors"
                        onClick={() => navigate(`/project/${id}/milestones`)}
                    >
                        Support This Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;