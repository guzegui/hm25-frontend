import React, { useState } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectModal from '../components/projects/ProjectModal';
import projects from '../assets/projects.json';

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'planning'
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => 
            project.status.toLowerCase() === filter.toLowerCase()
          );

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">NGO Projects</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Support sustainable development initiatives across Africa. 
                        From clean water access to healthcare and education, your contribution 
                        makes a real difference in communities that need it most.
                    </p>
                </div>
                
                {/* Filter Section */}
                <div className="mb-8 flex justify-center">
                    <div className="inline-flex bg-gray-800 rounded-lg p-1">
                        <button 
                            className={`px-4 py-2 rounded-md transition-colors ${
                                filter === 'all' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-300 hover:text-white'
                            }`}
                            onClick={() => setFilter('all')}
                        >
                            All Projects
                        </button>
                        <button 
                            className={`px-4 py-2 rounded-md transition-colors ${
                                filter === 'active' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-300 hover:text-white'
                            }`}
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </button>
                        <button 
                            className={`px-4 py-2 rounded-md transition-colors ${
                                filter === 'planning' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-300 hover:text-white'
                            }`}
                            onClick={() => setFilter('planning')}
                        >
                            Planning
                        </button>
                    </div>
                </div>
                
                {/* Impact Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <p className="text-blue-400 text-4xl font-bold mb-2">5</p>
                        <p className="text-gray-300">Countries Supported</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <p className="text-blue-400 text-4xl font-bold mb-2">108,000+</p>
                        <p className="text-gray-300">Lives Impacted</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <p className="text-blue-400 text-4xl font-bold mb-2">1.5M QUs</p>
                        <p className="text-gray-300">Total Funding Required</p>
                    </div>
                </div>
                
                {/* Project Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
                
                {/* No Projects Message */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-xl text-gray-300">No projects found with the selected filter.</h3>
                        <button 
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                            onClick={() => setFilter('all')}
                        >
                            View All Projects
                        </button>
                    </div>
                )}
            </div>

            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                />
            )}
        </div>
    );
};

export default ProjectsPage;
