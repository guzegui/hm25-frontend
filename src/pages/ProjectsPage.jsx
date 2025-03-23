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
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'planning'

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
        <motion.div className="mb-12 text-center" variants={fadeInUp}>
          <motion.h1
            className="text-4xl font-bold text-white mb-4"
            variants={fadeInUp}
          >
            NGO Projects
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Support sustainable development initiatives across Africa.
          </motion.p>
        </motion.div>

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
