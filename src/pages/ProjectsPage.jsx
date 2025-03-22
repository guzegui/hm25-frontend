import React, { useState } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectModal from '../components/projects/ProjectModal';
import projects from '../assets/projects.json';

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="min-h-screen pt-24 px-6 pb-12">
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
