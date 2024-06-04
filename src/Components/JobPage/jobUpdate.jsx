import React, { useState } from 'react';
import axios from 'axios';

const UpdateJobForm = ({ job, onClose }) => {
    const [updatedJob, setUpdatedJob] = useState({ ...job });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedJob(prevJob => ({
            ...prevJob,
            [name]: value
        }));
    };

    const handleDescriptionChange = (e) => {
        const { name, value } = e.target;
        setUpdatedJob(prevJob => ({
            ...prevJob,
            jobDescription: {
                ...prevJob.jobDescription,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9000/job/updateJob/${job._id}`, updatedJob);
            onClose();
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">Update Job</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block text-gray-700 mb-2">
                        Job ID:
                        <input
                            type="text"
                            name="jobId"
                            value={updatedJob.jobId}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block text-gray-700 mb-2">
                        Job Name:
                        <input
                            type="text"
                            name="jobName"
                            value={updatedJob.jobName}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block text-gray-700 mb-2">
                        Description:
                        <textarea
                            name="description"
                            value={updatedJob.jobDescription.description}
                            onChange={handleDescriptionChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block text-gray-700 mb-2">
                        Salary:
                        <input
                            type="text"
                            name="salary"
                            value={updatedJob.jobDescription.salary}
                            onChange={handleDescriptionChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block text-gray-700 mb-2">
                        Skills and Experience:
                        <textarea
                            name="skillsAndExperience"
                            value={updatedJob.jobDescription.skillsAndExperience}
                            onChange={handleDescriptionChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block text-gray-700 mb-2">
                        Reason to Work Here:
                        <textarea
                            name="reasonToWorkHere"
                            value={updatedJob.jobDescription.reasonToWorkHere}
                            onChange={handleDescriptionChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateJobForm;
