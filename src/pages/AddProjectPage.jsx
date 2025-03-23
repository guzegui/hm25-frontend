import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHM25 } from '../contexts/HM25Context';
import { useQubicConnect } from '../contexts/QubicConnectContext';
import { saveProject } from '../components/api/ProjectService';
import { toast } from 'react-hot-toast';

const AddProjectPage = () => {
    const navigate = useNavigate();
    const { connected } = useQubicConnect();
    const { state } = useHM25();
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        category: 'education',
        targetFunding: '',
        duration: '',
        mainImage: '',
        additionalImages: ['', '', ''],
        milestones: [{ title: '', description: '', fundingPercentage: '' }]
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Redirect if not connected
    if (!connected) {
        navigate('/');
        return null;
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when field is updated
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };
    
    const handleMilestoneChange = (index, field, value) => {
        const newMilestones = [...formData.milestones];
        newMilestones[index] = {
            ...newMilestones[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            milestones: newMilestones
        }));
    };
    
    const addMilestone = () => {
        setFormData(prev => ({
            ...prev,
            milestones: [
                ...prev.milestones,
                { title: '', description: '', fundingPercentage: '' }
            ]
        }));
    };
    
    const removeMilestone = (index) => {
        if (formData.milestones.length > 1) {
            const newMilestones = formData.milestones.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                milestones: newMilestones
            }));
        }
    };
    
    const handleImageChange = (index, value) => {
        const newImages = [...formData.additionalImages];
        newImages[index] = value;
        setFormData(prev => ({
            ...prev,
            additionalImages: newImages
        }));
    };
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.targetFunding.trim()) newErrors.targetFunding = 'Target funding is required';
        if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
        if (!formData.mainImage.trim()) newErrors.mainImage = 'Main image URL is required';
        
        // Validate milestones
        let totalPercentage = 0;
        const milestoneErrors = [];
        
        formData.milestones.forEach((milestone, index) => {
            const milestoneError = {};
            if (!milestone.title.trim()) milestoneError.title = 'Title is required';
            if (!milestone.description.trim()) milestoneError.description = 'Description is required';
            if (!milestone.fundingPercentage.trim()) {
                milestoneError.fundingPercentage = 'Percentage is required';
            } else {
                const percentage = parseFloat(milestone.fundingPercentage);
                if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
                    milestoneError.fundingPercentage = 'Percentage must be between 1 and 100';
                } else {
                    totalPercentage += percentage;
                }
            }
            
            if (Object.keys(milestoneError).length > 0) {
                milestoneErrors[index] = milestoneError;
            }
        });
        
        if (milestoneErrors.length > 0) {
            newErrors.milestones = milestoneErrors;
        }
        
        if (totalPercentage !== 100) {
            newErrors.milestoneTotal = 'Milestone percentages must add up to 100%';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Save the project using the improved ProjectService
            const savedProject = await saveProject(formData);
            
            // Show success message
            toast.success('Project created successfully!', {
                duration: 5000,
                icon: '🎉',
            });
            
            // Show explanation about the mock implementation
            toast.custom(
                <div className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md">
                    <p className="font-medium">Demo Mode</p>
                    <p className="text-sm">
                        Your project is saved locally. In a production app, this would update the server database.
                    </p>
                </div>,
                { duration: 7000 }
            );
            
            // Redirect to projects page after a slight delay
            setTimeout(() => {
                navigate('/projects');
            }, 1500);
        } catch (error) {
            console.error('Error creating project:', error);
            toast.error('Failed to create project. Please try again.', {
                duration: 5000,
            });
            setErrors(prev => ({
                ...prev,
                submit: 'Failed to create project. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const categories = [
        { value: 'education', label: 'Education' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'infrastructure', label: 'Infrastructure' },
        { value: 'agriculture', label: 'Agriculture' },
        { value: 'environment', label: 'Environment' },
        { value: 'technology', label: 'Technology' },
        { value: 'community', label: 'Community Development' }
    ];
    
    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
                    <p className="text-gray-300">
                        Fill out the form below to create a new sustainable development project.
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6">
                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-500 bg-opacity-25 border border-red-500 rounded-lg">
                            {errors.submit}
                        </div>
                    )}
                    
                    {/* Basic Project Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
                            Basic Information
                        </h2>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Project Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 rounded-md bg-gray-700 border ${
                                    errors.title ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="Enter project title"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                            )}
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className={`w-full px-3 py-2 rounded-md bg-gray-700 border ${
                                    errors.description ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="Describe the project's goals and impact"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 rounded-md bg-gray-700 border ${
                                        errors.location ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    placeholder="e.g., Kenya, East Africa"
                                />
                                {errors.location && (
                                    <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600"
                                >
                                    {categories.map(category => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Target Funding (QUs)
                                </label>
                                <input
                                    type="number"
                                    name="targetFunding"
                                    value={formData.targetFunding}
                                    onChange={handleChange}
                                    min="1"
                                    className={`w-full px-3 py-2 rounded-md bg-gray-700 border ${
                                        errors.targetFunding ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    placeholder="e.g., 50000"
                                />
                                {errors.targetFunding && (
                                    <p className="mt-1 text-sm text-red-500">{errors.targetFunding}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Duration (months)
                                </label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    min="1"
                                    className={`w-full px-3 py-2 rounded-md bg-gray-700 border ${
                                        errors.duration ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    placeholder="e.g., 12"
                                />
                                {errors.duration && (
                                    <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Images */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
                            Project Images
                        </h2>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Main Image URL
                            </label>
                            <input
                                type="text"
                                name="mainImage"
                                value={formData.mainImage}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 rounded-md bg-gray-700 border ${
                                    errors.mainImage ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors.mainImage && (
                                <p className="mt-1 text-sm text-red-500">{errors.mainImage}</p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Additional Images (optional)
                            </label>
                            {formData.additionalImages.map((image, index) => (
                                <div key={index} className="mb-2">
                                    <input
                                        type="text"
                                        value={image}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600"
                                        placeholder={`Additional image URL ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Milestones */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                            <h2 className="text-xl font-semibold">
                                Project Milestones
                            </h2>
                            <button
                                type="button"
                                onClick={addMilestone}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Milestone
                            </button>
                        </div>
                        
                        {errors.milestoneTotal && (
                            <div className="mb-4 p-3 bg-red-500 bg-opacity-25 border border-red-500 rounded-md text-sm">
                                {errors.milestoneTotal}
                            </div>
                        )}
                        
                        {formData.milestones.map((milestone, index) => (
                            <div key={index} className="mb-6 p-4 bg-gray-700 rounded-lg">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-medium">Milestone {index + 1}</h3>
                                    {formData.milestones.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeMilestone(index)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="block text-sm font-medium mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={milestone.title}
                                        onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                                        className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${
                                            errors.milestones?.[index]?.title ? 'border-red-500' : 'border-gray-600'
                                        }`}
                                        placeholder="e.g., Foundation Construction"
                                    />
                                    {errors.milestones?.[index]?.title && (
                                        <p className="mt-1 text-sm text-red-500">{errors.milestones[index].title}</p>
                                    )}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="block text-sm font-medium mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={milestone.description}
                                        onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                                        rows="2"
                                        className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${
                                            errors.milestones?.[index]?.description ? 'border-red-500' : 'border-gray-600'
                                        }`}
                                        placeholder="Describe what will be accomplished in this milestone"
                                    />
                                    {errors.milestones?.[index]?.description && (
                                        <p className="mt-1 text-sm text-red-500">{errors.milestones[index].description}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Funding Percentage (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={milestone.fundingPercentage}
                                        onChange={(e) => handleMilestoneChange(index, 'fundingPercentage', e.target.value)}
                                        min="1"
                                        max="100"
                                        className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${
                                            errors.milestones?.[index]?.fundingPercentage ? 'border-red-500' : 'border-gray-600'
                                        }`}
                                        placeholder="e.g., 25"
                                    />
                                    {errors.milestones?.[index]?.fundingPercentage && (
                                        <p className="mt-1 text-sm text-red-500">{errors.milestones[index].fundingPercentage}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Submit Button */}
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => navigate('/projects')}
                            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 rounded-lg ${
                                isSubmitting 
                                    ? 'bg-green-700 cursor-not-allowed' 
                                    : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Project...
                                </span>
                            ) : (
                                'Create Project'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectPage;