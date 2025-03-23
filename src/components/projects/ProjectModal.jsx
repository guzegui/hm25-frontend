import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectModal = ({ project, onClose }) => {
  const navigate = useNavigate();
  
  // Calculate milestone completion info
  const completedTiers = project.tiers?.filter(tier => tier.status === "Completed").length || 0;
  const totalTiers = project.tiers?.length || 0;

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

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-gray-800 rounded-t-xl border-b border-gray-700">
          <div className="flex justify-between items-center p-6">
            <div>
              <span className="bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full mr-2">
                {project.location}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  project.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {project.status}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Image banner */}
        <div className="w-full h-64 relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
            <h2 className="text-3xl font-bold text-white">{project.title}</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Project Impact & Progress */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 bg-gray-700/30 p-4 rounded-lg">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Impact</h3>
              <p className="text-gray-300">{project.impact}</p>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Overall Progress</h3>
              <div className="flex items-center gap-2">
                <div className="h-3 w-full bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-gray-400 text-sm">{project.progress}%</span>
              </div>
            </div>
          </div>

          {/* Milestone progress bar - Updated without numbers */}
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Milestone Progress</h3>
              <span className="text-white font-medium">{completedTiers} of {totalTiers} Complete</span>
            </div>
            
            {/* Milestone bar with outlines but no numbers */}
            <div className="h-6 w-full bg-gray-700 rounded-lg overflow-hidden flex mb-1">
              {project.tiers.map((tier, index) => (
                <div 
                  key={index}
                  className={`h-full ${tier.status === "Completed" ? "bg-green-500" : tier.status === "In Progress" ? "bg-blue-500" : "bg-gray-600"} 
                             relative border-r border-l ${index === 0 ? "border-l-0" : ""} ${index === project.tiers.length - 1 ? "border-r-0" : ""} border-gray-900`}
                  style={{ width: `${100 / totalTiers}%` }}
                >
                  {tier.status === "Completed" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Milestone labels below the bar */}
            <div className="flex text-[10px]">
              {project.tiers.map((tier, index) => (
                <div 
                  key={index}
                  className="text-center overflow-hidden whitespace-nowrap text-ellipsis text-gray-400" 
                  style={{ width: `${100 / totalTiers}%` }}
                  title={tier.name}
                >
                  {tier.name}
                </div>
              ))}
            </div>
          </div>

          {/* Project Description */}
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">{project.description}</p>
          </div>

          {/* Milestones / Tiers */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Project Milestones</h3>
            <div className="space-y-4">
              {project.tiers.map((tier, index) => (
                <div key={index} className={`bg-gray-700/30 p-4 rounded-lg ${tier.status === "Completed" ? "border-l-4 border-green-500" : tier.status === "In Progress" ? "border-l-4 border-blue-500" : ""}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-xs">
                        {index + 1}
                      </div>
                      <h4 className="text-white font-semibold">{tier.name}</h4>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getMilestoneStatusColor(tier.status)}`}>
                        {tier.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Funding Goal: <span className="text-white font-medium">{tier.fundingGoal}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{tier.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${tier.status === "Completed" ? "bg-green-500" : "bg-blue-500"}`}
                        style={{ width: `${tier.percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm">{tier.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Stack renamed to Implementation Approach */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Implementation Approach</h3>
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
          </div>

          {/* Next Milestone */}
          {project.nextMilestone && (
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Next Milestone</h3>
              <p className="text-gray-300">{project.nextMilestone}</p>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-gray-700">
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-colors"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              View Full Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;