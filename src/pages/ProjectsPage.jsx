import React, { useState } from 'react';

const ProjectModal = ({ project, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div 
            className="bg-gray-800 rounded-lg w-full max-w-3xl transform transition-all duration-300 scale-100 opacity-100"
            onClick={e => e.stopPropagation()}
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${project.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {project.status}
                        </span>
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

                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300">{project.description}</p>
                        
                        <h3 className="text-white mt-6">Key Features</h3>
                        <ul className="text-gray-300">
                            {project.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>

                        <h3 className="text-white mt-6">Technical Stack</h3>
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

                        {project.nextMilestone && (
                            <div className="mt-6">
                                <h3 className="text-white">Next Milestone</h3>
                                <p className="text-gray-300">{project.nextMilestone}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ProjectCard = ({ project, onClick }) => (
    <div 
        className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
        onClick={onClick}
    >
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex justify-between items-center">
            <span className={`px-3 py-1 rounded-full text-sm ${project.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {project.status}
            </span>
            <div className="flex items-center gap-2">
                <div className="h-2 w-24 bg-gray-600 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
                <span className="text-gray-400 text-sm">{project.progress}%</span>
            </div>
        </div>
    </div>
);

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            title: "DeFi Lending Platform",
            description: "Decentralized lending platform with automated interest rate adjustment and collateral management.",
            status: "Active",
            progress: 75,
            features: [
                "Automated market maker for interest rates",
                "Multi-collateral lending pools",
                "Flash loan functionality",
                "Liquidation protection mechanisms",
                "Yield optimization strategies"
            ],
            stack: ["Solidity", "React", "Ethers.js", "Hardhat", "The Graph", "IPFS"],
            nextMilestone: "Integration with multiple L2 networks for reduced gas fees"
        },
        {
            title: "NFT Marketplace",
            description: "Marketplace for trading unique digital assets with support for multiple blockchain networks.",
            status: "Planning",
            progress: 30,
            features: [
                "Multi-chain NFT support",
                "Lazy minting capability",
                "Royalty enforcement",
                "Auction system",
                "Social features and curation"
            ],
            stack: ["Next.js", "Solidity", "IPFS", "Polygon", "OpenZeppelin"],
            nextMilestone: "Launch beta version with support for ERC-721 and ERC-1155 tokens"
        },
        {
            title: "DAO Governance",
            description: "Decentralized governance system with proposal creation and voting mechanisms.",
            status: "Active",
            progress: 60,
            features: [
                "Proposal submission system",
                "Quadratic voting",
                "Delegation mechanism",
                "Time-lock execution",
                "Multiple voting strategies"
            ],
            stack: ["Solidity", "TypeScript", "Compound Governor", "React", "Web3.js"],
            nextMilestone: "Implementation of off-chain voting with Snapshot integration"
        },
        {
            title: "Cross-chain Bridge",
            description: "Secure bridge for transferring assets between different blockchain networks.",
            status: "Planning",
            progress: 45,
            features: [
                "Multi-signature validation",
                "Automated relayer network",
                "Asset wrapping protocols",
                "Emergency pause mechanism",
                "Cross-chain messaging"
            ],
            stack: ["Rust", "Solidity", "Polkadot", "Chainlink", "React"],
            nextMilestone: "Security audit and testnet deployment"
        },
        {
            title: "DeFi Analytics",
            description: "Real-time analytics dashboard for tracking DeFi protocols and market trends.",
            status: "Active",
            progress: 90,
            features: [
                "Protocol integration APIs",
                "Real-time price feeds",
                "Custom alert system",
                "Portfolio tracking",
                "Risk assessment tools"
            ],
            stack: ["React", "Node.js", "GraphQL", "PostgreSQL", "Redis", "AWS"],
            nextMilestone: "Launch of mobile app with push notifications"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900 pt-24 px-6 pb-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={index} 
                            project={project} 
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </div>

            {selectedProject && (
                <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setSelectedProject(null)}
                >
                    <ProjectModal 
                        project={selectedProject} 
                        onClose={() => setSelectedProject(null)} 
                    />
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;
