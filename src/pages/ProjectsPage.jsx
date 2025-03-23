import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";
import projects from "../assets/projects.json";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../components/utils/animations";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter(
          (project) => project.status.toLowerCase() === filter.toLowerCase()
        );

  return (
    <motion.div
      className="min-h-screen pt-24 px-6 pb-12 bg-gray-900"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <motion.div className="max-w-7xl mx-auto" variants={stagger}>
        {/* Hero Section */}
        <motion.div className="mb-12 text-center" variants={fadeInUp}>
          <motion.h1
            className="text-4xl font-bold text-white mb-4"
            variants={fadeInUp}
          >
            NGO Projects
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-6"
            variants={fadeInUp}
          >
            Support sustainable development initiatives across Africa. From clean water access to healthcare and education, your contribution 
            makes a real difference in communities that need it most.
          </motion.p>
          
          {/* Create Project Button */}
          <motion.button 
            onClick={() => navigate('/projects/add')}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center mx-auto"
            variants={fadeInUp}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create New Project
          </motion.button>
        </motion.div>

        {/* Filter Section */}
        <motion.div className="mb-8 flex justify-center" variants={fadeInUp}>
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
        </motion.div>

        {/* Impact Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          variants={fadeInUp}
        >
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
        </motion.div>

        {/* Project Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </motion.div>
  );
};

export default ProjectsPage;