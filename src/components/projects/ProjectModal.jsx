import React from "react";
import { useQubicConnect } from "../../contexts/QubicConnectContext";
import { useNavigate } from "react-router-dom";

const ProjectModal = ({ project, onClose }) => {
  const { toggleConnectModal } = useQubicConnect(); 
    const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-gray-800 rounded-lg w-full max-w-3xl transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
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

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  project.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
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

            <div className="flex justify-end pt-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                More info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;