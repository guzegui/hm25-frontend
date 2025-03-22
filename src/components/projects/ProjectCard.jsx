import React from 'react';

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

export default ProjectCard;
