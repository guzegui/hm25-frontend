import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../assets/projects.json';
import toast from 'react-hot-toast';
import SupportMilestoneModal from '../components/projects/SupportMilestoneModal';

const MilestonesPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [validatedMilestones, setValidatedMilestones] = useState({});
    const [votes, setVotes] = useState({});
    const [supportModalOpen, setSupportModalOpen] = useState(false);
    const [selectedTierIndex, setSelectedTierIndex] = useState(null);

    // Load project and initialize state
    useEffect(() => {
        const foundProject = projects.find((p) => p.id === parseInt(id));
        if (foundProject) {
            setProject(foundProject);
            
            // Initialize votes from project data
            const initialVotes = foundProject.tiers.reduce((acc, tier, index) => {
                if (tier.proofOfCompletion) {
                    acc[index] = tier.proofOfCompletion.votes || 0;
                }
                return acc;
            }, {});
            setVotes(initialVotes);
            
            // Load validated milestones from localStorage
            const saved = localStorage.getItem(`validated-milestones-${id}`);
            if (saved) {
                setValidatedMilestones(JSON.parse(saved));
            }
        }
    }, [id]);

    // Save validated milestones to localStorage when they change
    useEffect(() => {
        if (Object.keys(validatedMilestones).length > 0) {
            localStorage.setItem(`validated-milestones-${id}`, JSON.stringify(validatedMilestones));
        }
    }, [validatedMilestones, id]);

    const handleVote = (index) => {
        if (validatedMilestones[index]) return; // Prevent multiple votes
        
        setVotes(prev => ({
            ...prev,
            [index]: (prev[index] || 0) + 1
        }));
        
        setValidatedMilestones(prev => ({
            ...prev,
            [index]: true
        }));
    };
    
    const handleSupportClick = (index) => {
        setSelectedTierIndex(index);
        setSupportModalOpen(true);
    };
    
    const handleDonationComplete = (tier, amount) => {
        // Calculate new percentage based on donation
        const extractNumericValue = (fundingGoal) => {
            const match = fundingGoal.match(/(\d+(?:,\d+)*)/);
            return match ? parseInt(match[0].replace(/,/g, '')) : 0;
        };
        
        const maxAmount = extractNumericValue(tier.fundingGoal);
        const currentFunded = Math.round(maxAmount * tier.percentage / 100);
        const newFunded = currentFunded + amount;
        const newPercentage = Math.min(Math.round((newFunded / maxAmount) * 100), 100);
        
        // Update the project's tier with the new percentage
        const updatedTiers = project.tiers.map((t, i) => {
            if (i === selectedTierIndex) {
                // Update status if milestone is completed
                const newStatus = newPercentage >= 100 ? "Completed" : tier.status;
                return {
                    ...t,
                    percentage: newPercentage,
                    status: newStatus
                };
            }
            return t;
        });
        
        // Calculate overall project progress
        const totalPercentage = updatedTiers.reduce((sum, t) => sum + t.percentage, 0);
        const overallProgress = Math.round(totalPercentage / updatedTiers.length);
        
        // Update the project with new tiers and progress
        const updatedProject = {
            ...project,
            tiers: updatedTiers,
            progress: overallProgress
        };
        
        setProject(updatedProject);
        
        // Save to localStorage to persist changes
        const allProjects = projects.map(p => p.id === parseInt(id) ? updatedProject : p);
        localStorage.setItem('updatedProjects', JSON.stringify(allProjects));
        
        // Show confirmation toast
        toast.success(`Thank you for supporting with ${amount} QUs!`);
    };

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

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{project.title}</h1>
                    </div>
                    <button
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                        onClick={() => navigate(`/project/${id}`)}
                    >
                        Back to Project
                    </button>
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

                                {/* Support Milestone Button - New Addition */}
                                <div className="flex justify-end">
                                    <button
                                        className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-colors ${
                                            tier.percentage >= 100 ? 
                                            'bg-gray-600 cursor-not-allowed' : 
                                            'bg-green-600 hover:bg-green-700'
                                        } text-white`}
                                        onClick={() => handleSupportClick(index)}
                                        disabled={tier.percentage >= 100}
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        {tier.percentage >= 100 ? 'Milestone Funded' : 'Support Milestone'}
                                    </button>
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
                                                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                                            validatedMilestones[index] 
                                                                ? 'bg-green-600 text-white cursor-not-allowed' 
                                                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                        }`}
                                                        onClick={() => handleVote(index)}
                                                        disabled={validatedMilestones[index]}
                                                    >
                                                        {validatedMilestones[index] ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                                Validated
                                                            </>
                                                        ) : (
                                                            'Validate Milestone'
                                                        )}
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
            
            {/* Support Milestone Modal */}
            {supportModalOpen && selectedTierIndex !== null && (
                <SupportMilestoneModal
                    isOpen={supportModalOpen}
                    onClose={() => setSupportModalOpen(false)}
                    tier={project.tiers[selectedTierIndex]}
                    projectId={id}
                    onDonationComplete={handleDonationComplete}
                />
            )}
        </div>
    );
};

export default MilestonesPage;