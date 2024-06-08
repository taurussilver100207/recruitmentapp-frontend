import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const CreateJobForm = ({ onClose, onJobCreated }) => {
    const [jobId, setJobId] = useState('');
    const [jobName, setJobName] = useState('');
    const [descriptionParts, setDescriptionParts] = useState('');
    const [salary, setSalary] = useState('');
    const [skillsAndExperience, setSkillsAndExperience] = useState('');
    const [reasonToWorkHere, setReasonToWorkHere] = useState('');
    const [message, setMessage] = useState('');

    const descriptionRef = useRef(null);
    const skillsRef = useRef(null);
    const reasonRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/job/createJob', {
                jobId,
                jobName,
                jobDescription: {
                    descriptionParts,
                    salary,
                    skillsAndExperience,
                    reasonToWorkHere
                }
            });
            setMessage('Job created successfully!');
            onJobCreated(response.data);
            onClose();
        } catch (error) {
            console.error('Error creating job:', error);
            setMessage('Error creating job');
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
    }, [descriptionParts, skillsAndExperience, reasonToWorkHere]);

    return (
        <div className="flex justify-center items-center m-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full mt-9">
                <h2 className="text-2xl font-bold mb-4">Create Job</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Job ID</label>
                        <input
                            type="text"
                            value={jobId}
                            onChange={(e) => setJobId(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Job Name</label>
                        <input
                            type="text"
                            value={jobName}
                            onChange={(e) => setJobName(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            ref={descriptionRef}
                            value={descriptionParts}
                            onChange={(e) => {
                                setDescriptionParts(e.target.value);
                                adjustHeight(descriptionRef);
                            }}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ minHeight: '100px', resize: 'none', overflow: 'hidden' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Salary</label>
                        <input
                            type="text"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Skills and Experience</label>
                        <textarea
                            ref={skillsRef}
                            value={skillsAndExperience}
                            onChange={(e) => {
                                setSkillsAndExperience(e.target.value);
                                adjustHeight(skillsRef);
                            }}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ minHeight: '100px', resize: 'none', overflow: 'hidden' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Reason to Work Here</label>
                        <textarea
                            ref={reasonRef}
                            value={reasonToWorkHere}
                            onChange={(e) => {
                                setReasonToWorkHere(e.target.value);
                                adjustHeight(reasonRef);
                            }}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ minHeight: '100px', resize: 'none', overflow: 'hidden' }}
                        />
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                            Cancel
                        </button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                            Create
                        </button>
                    </div>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default CreateJobForm;
