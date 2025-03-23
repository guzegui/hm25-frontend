import { toast } from 'react-hot-toast';

/**
 * Mock API function to save a new project
 * In a real implementation, this would call a backend API endpoint
 * that would update the projects.json file on the server
 * 
 * @param {Object} projectData - The project data to save
 * @returns {Promise<Object>} - The saved project with generated ID
 */
export const saveProject = async (projectData) => {
  try {
    // Format the project data to match the structure in projects.json
    const formattedProject = formatProjectData(projectData);
    
    // In a real implementation, this would be an API call:
    // const response = await fetch('/api/projects', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formattedProject)
    // });
    // const savedProject = await response.json();
    
    // For now, we'll use local storage to simulate persistence
    const existingProjectsJson = localStorage.getItem('hm25_projects');
    const existingProjects = existingProjectsJson ? JSON.parse(existingProjectsJson) : [];
    
    // Add the new project
    existingProjects.push(formattedProject);
    
    // Save back to local storage
    localStorage.setItem('hm25_projects', JSON.stringify(existingProjects));
    
    // Simulate a network delay for a more realistic experience
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Log to console that this is just a mock implementation
    console.log('%cIMPORTANT: This is a mock implementation.', 'color: orange; font-weight: bold');
    console.log('%cIn a production environment, this would make an API call to save to the server.', 'color: orange');
    console.log('Project saved to localStorage:', formattedProject);
    
    return formattedProject;
  } catch (error) {
    console.error('Error saving project:', error);
    throw error;
  }
};

/**
 * Mock API function to get all projects (from JSON and localStorage)
 * @returns {Promise<Array>} - Array of all projects
 */
export const getAllProjects = async () => {
  try {
    // In a real implementation, this would be an API call:
    // const response = await fetch('/api/projects');
    // const projects = await response.json();
    
    // Import the default projects from the JSON file
    const defaultProjects = await import('../../assets/projects.json').then(module => module.default);
    
    // Get any user-created projects from localStorage
    const localProjectsJson = localStorage.getItem('hm25_projects');
    const localProjects = localProjectsJson ? JSON.parse(localProjectsJson) : [];
    
    // Combine both sources, with local projects taking precedence if IDs clash
    const combinedProjects = [...defaultProjects, ...localProjects];
    
    // Simulate a network delay for a more realistic experience
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return combinedProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

/**
 * Formats the form data to match the structure required in projects.json
 * @param {Object} formData - The form data from AddProjectPage
 * @returns {Object} - The formatted project data
 */
const formatProjectData = (formData) => {
  // Get the next available ID
  const id = Date.now(); // Using timestamp as a unique ID
  
  // Convert milestones to tiers format
  const tiers = formData.milestones.map(milestone => ({
    name: milestone.title,
    description: milestone.description,
    fundingGoal: `${formData.targetFunding * (parseFloat(milestone.fundingPercentage) / 100)} QUs`,
    status: "Upcoming",
    percentage: 0
  }));
  
  // Filter out empty additional images
  const additionalImages = formData.additionalImages.filter(url => url.trim() !== '');
  
  return {
    id,
    title: formData.title,
    description: formData.description,
    status: "Planning", // Default status for new projects
    progress: 0, // Default progress for new projects
    image: formData.mainImage,
    features: [
      "Feature 1", // Default features that can be updated later
      "Feature 2",
      "Feature 3"
    ],
    stack: [formData.category], // Using category as initial stack item
    nextMilestone: tiers.length > 0 ? tiers[0].name : "No milestones defined",
    tiers,
    location: formData.location,
    impact: `Project duration: ${formData.duration} months`
  };
};

// Add a new function to handle milestone donations
export const supportMilestone = async (projectId, tierIndex, amount) => {
  try {
    // Get the current projects (either from localStorage or the default JSON)
    let currentProjects = localStorage.getItem('updatedProjects');
    const projects = currentProjects ? JSON.parse(currentProjects) : projectsData;
    
    // Find the project to update
    const projectIndex = projects.findIndex(p => p.id === parseInt(projectId));
    
    if (projectIndex !== -1) {
      const project = projects[projectIndex];
      const tier = project.tiers[tierIndex];
      
      // Extract numeric value from funding goal (e.g., "75,000 QUs" -> 75000)
      const extractNumericValue = (fundingGoal) => {
        const match = fundingGoal.match(/(\d+(?:,\d+)*)/);
        return match ? parseInt(match[0].replace(/,/g, '')) : 0;
      };
      
      const maxAmount = extractNumericValue(tier.fundingGoal);
      const currentFunded = Math.round(maxAmount * tier.percentage / 100);
      const newFunded = currentFunded + amount;
      const newPercentage = Math.min(Math.round((newFunded / maxAmount) * 100), 100);
      
      // Update the tier with new percentage
      tier.percentage = newPercentage;
      
      // Update status if milestone is completed
      if (newPercentage >= 100 && tier.status !== "Completed") {
        tier.status = "Completed";
      }
      
      // Update overall project progress
      const totalPercentage = project.tiers.reduce((sum, t) => sum + t.percentage, 0);
      project.progress = Math.round(totalPercentage / project.tiers.length);
      
      // If the next milestone is completed, update the nextMilestone field
      if (tier.status === "Completed") {
        const nextUncompletedTier = project.tiers.find(t => t.status !== "Completed");
        if (nextUncompletedTier) {
          project.nextMilestone = nextUncompletedTier.name;
        } else {
          project.nextMilestone = "All milestones completed!";
        }
      }
      
      // Save the updated projects back to localStorage
      localStorage.setItem('updatedProjects', JSON.stringify(projects));
      
      return project;
    }
    
    throw new Error('Project not found');
  } catch (error) {
    console.error('Error supporting milestone:', error);
    throw error;
  }
};