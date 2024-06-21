import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateJobForm = ({ onClose, onJobCreated }) => {
    const [job, setJob] = useState({
        jobId: '',
        jobName: '',
        jobDescription: {
            descriptionParts: '',
            salary: '',
            skillsAndExperience: '',
            reasonToWorkHere: ''
        }
    });
    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

    const navigate = useNavigate();

    const descriptionRef = useRef(null);
    const skillsRef = useRef(null);
    const reasonRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob(prevJob => ({
            ...prevJob,
            [name]: value,
        }));
    };

    const handleDescriptionChange = (e) => {
        const { name, value } = e.target;
        setJob(prevJob => ({
            ...prevJob,
            jobDescription: {
                ...prevJob.jobDescription,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/job/createJob', job);
            alert('Job created successfully!');
            onJobCreated(response.data);
            navigate('/job-admin');
        } catch (error) {
            console.error('Error creating job:', error);
            alert('Error creating job');
        }
    };

    const adjustHeight = (ref) => {
        if (ref && ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = ref.current.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        adjustHeight(descriptionRef);
        adjustHeight(skillsRef);
        adjustHeight(reasonRef);
    }, [job]);

    const handleCancel = () => {
        setShowCancelConfirmation(true);
    };

    const confirmCancel = () => {
        setShowCancelConfirmation(false);
        navigate('/job-admin');
    };

    const cancelCancel = () => {
        setShowCancelConfirmation(false);
    };

    return (
        <div className="flex justify-center items-center m-10">
            <div className="bg-white p-8 w-full relative">
                <button
                    className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900"
                    onClick={() => navigate('/job-admin')}
                >
                    X
                </button>
                <h2 className="text-2xl font-bold mb-4">Create Job</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Job ID:</label>
                        <input
                            type="text"
                            name="jobId"
                            value={job.jobId}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Job Name:</label>
                        <input
                            type="text"
                            name="jobName"
                            value={job.jobName}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description:</label>
                        <textarea
                            ref={descriptionRef}
                            name="descriptionParts"
                            value={job.jobDescription.descriptionParts}
                            onChange={(e) => {
                                handleDescriptionChange(e);
                                adjustHeight(descriptionRef);
                            }}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ minHeight: '100px', resize: 'none', overflow: 'hidden' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Salary:</label>
                        <input
                            type="text"
                            name="salary"
                            value={job.jobDescription.salary}
                            onChange={handleDescriptionChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Skills and Experience:</label>
                        <textarea
                            ref={skillsRef}
                            name="skillsAndExperience"
                            value={job.jobDescription.skillsAndExperience}
                            onChange={(e) => {
                                handleDescriptionChange(e);
                                adjustHeight(skillsRef);
                            }}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ minHeight: '100px', resize: 'none', overflow: 'hidden' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Reason to Work Here:</label>
                        <textarea
                            ref={reasonRef}
                            name="reasonToWorkHere"
                            value={job.jobDescription.reasonToWorkHere}
                            onChange={(e) => {
                                handleDescriptionChange(e);
                                adjustHeight(reasonRef);
                            }}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ minHeight: '100px', resize: 'none', overflow: 'hidden' }}
                        />
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                            Cancel
                        </button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                            Create
                        </button>
                    </div>
                </form>
            </div>

            {showCancelConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="mb-4">Are you sure you want to cancel creating this job?</p>
                        <div className="flex justify-end space-x-4">
                            <button onClick={cancelCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                                No
                            </button>
                            <button onClick={confirmCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateJobForm;
