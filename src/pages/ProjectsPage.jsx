import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";
import { getAllProjects } from "../components/api/ProjectService";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../components/utils/animations";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'planning'
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load projects using the getAllProjects service
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const projects = await getAllProjects();
        setAllProjects(projects);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    filter === "all"
      ? allProjects
      : allProjects.filter(
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

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
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
            
            {/* No Projects Message */}
            {filteredProjects.length === 0 && (
              <motion.div className="text-center py-12" variants={fadeInUp}>
                <h3 className="text-xl text-gray-300">No projects found with the selected filter.</h3>
                <div className="flex flex-col items-center mt-4 space-y-3">
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={() => setFilter('all')}
                  >
                    View All Projects
                  </button>
                  <button 
                    className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center"
                    onClick={() => navigate('/projects/add')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Project
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}
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