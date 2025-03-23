import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animations";

const ProjectCard = ({ project, onClick }) => {
  const navigate = useNavigate();

  // Calculate milestone completion info
  const completedTiers =
    project.tiers?.filter((tier) => tier.status === "Completed").length || 0;
  const totalTiers = project.tiers?.length || 0;

  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
      onClick={onClick}
      variants={fadeInUp}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Project Image */}
      <div className="h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-5">
        {/* Location Badge */}
        <div className="mb-3">
          <span className="bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full">
            {project.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>

        {/* Status & Progress */}
        <div className="flex items-center gap-4 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs ${
              project.status === "Active"
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {project.status}
          </span>
          <div className="flex items-center gap-2 flex-1">
            <div className="h-2 w-full bg-gray-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <span className="text-gray-400 text-xs whitespace-nowrap">
              {project.progress}%
            </span>
          </div>
        </div>

        {/* Milestone Progress Bar - Updated without numbers */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-400 text-xs">Milestones</span>
            <span className="text-gray-400 text-xs">
              {completedTiers} of {totalTiers}
            </span>
          </div>
          <div className="h-4 w-full bg-gray-600 rounded-md overflow-hidden flex">
            {project.tiers.map((tier, index) => (
              <div
                key={index}
                className={`h-full ${
                  tier.status === "Completed"
                    ? "bg-green-500"
                    : tier.status === "In Progress"
                    ? "bg-blue-500"
                    : "bg-gray-700"
                } 
                                           relative border-r border-l ${
                                             index === 0 ? "border-l-0" : ""
                                           } ${
                  index === project.tiers.length - 1 ? "border-r-0" : ""
                } border-gray-900`}
                style={{ width: `${100 / totalTiers}%` }}
              >
                {tier.status === "Completed" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="h-2 w-2 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Impact Statement */}
        <p className="text-gray-300 text-sm mb-4">{project.impact}</p>

        {/* Next Milestone */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-1">
            Next Milestone:
          </h4>
          <p className="text-white text-sm">{project.nextMilestone}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg text-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/project/${project.id}/milestones`);
            }}
          >
            View Milestones
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/project/${project.id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
