import React from 'react';

const JobDetailsModal = ({ job }) => {
    if (!job) return null;

    const { jobId, jobName, jobDescription, createdAt, updatedAt } = job;
    const { description, salary, skillsAndExperience, reasonToWorkHere } = jobDescription || {};

    return (
        <div className="relative bg-white p-5 rounded-lg shadow-lg max-h-full overflow-hidden">
            <div className="sticky top-0 bg-white pb-4">
                <h2 className="text-purple-600 font-bold text-4xl">{jobName}</h2>
            </div>
            <div className="custom-scroll overflow-y-auto max-h-[calc(100vh-200px)] mt-4">
                <ul className="space-y-2">
                    <li><strong>ID:</strong> {jobId}</li>
                    <li><strong>Description:</strong> <span style={{ whiteSpace: 'pre-line' }}><br></br>{description}</span></li>
                    <li><strong>Salary:</strong> ${salary}</li>
                    <li><strong>Skills and Experience:</strong> <span style={{ whiteSpace: 'pre-line' }}><br></br>{skillsAndExperience}</span></li>
                    <li><strong>Reason to work here:</strong> <span style={{ whiteSpace: 'pre-line' }}><br></br>{reasonToWorkHere}</span></li>
                    <li><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</li>
                    <li><strong>Updated At:</strong> {new Date(updatedAt).toLocaleDateString()}</li>
                </ul>
            </div>
        </div>
    );
};

export default JobDetailsModal;
