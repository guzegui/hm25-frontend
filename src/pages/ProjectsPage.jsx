import React, { useState } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectModal from '../components/projects/ProjectModal';

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
