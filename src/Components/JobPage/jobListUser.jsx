import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobDetailsModal from './jobDetail.jsx';

export default function ListJobsUser() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showDetails, setShowDetails] = useState(true);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:9000/job/listJobs', {
                params: {
                    $skip: skip,
                    $limit: limit
                }
            });
            const jobs = response.data.data || [];
            setJobs(jobs);
            setPages(Math.ceil(response.data.total / limit));

            if (jobs.length > 0) {
                setSelectedJob(jobs[0]);
                setShowDetails(true);
            } else if (currentPage > 0) {
                setSkip(skip - limit);
                setCurrentPage(currentPage - 1);
            } else {
                setSelectedJob(null);
                setShowDetails(false);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [skip, limit]);

    const fetchJobDetails = async _id => {
        try {
            const response = await axios.get(`http://localhost:9000/job/getJob/${_id}`);
            if (response.data) {
                setSelectedJob(response.data);
                setShowDetails(true);
            } else {
                fetchJobs();
            }
        } catch (error) {
            console.error('Error fetching job details:', error);
            fetchJobs();
        }
    };

    const handlePageChange = (pageNumber) => {
        setSkip(pageNumber * limit);
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto p-4 flex flex-col h-screen">
            <div className="flex-grow flex overflow-hidden">
                <div className="w-3/5 pr-4 h-full overflow-y-auto custom-scroll">
                    <h1 className="text-red-800 font-bold mb-4">Job List</h1>
                    <ul className="space-y-4">
                        {jobs.map(job => (
                            <li
                                key={job._id}
                                className="border border-gray-300 rounded-lg p-4 shadow-md cursor-pointer hover:bg-gray-100"
                                onClick={() => fetchJobDetails(job._id)}
                            >
                                <div>
                                    <span className="font-semibold">Job ID: {job.jobId}</span>
                                    <h2 className="text-xl font-semibold">Job Name: {job.jobName}</h2>
                                    <p className="text-gray-500">Job Description: {job.jobDescription.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-2/5 pl-4 border-l border-gray-300 h-full overflow-y-auto custom-scroll">
                    {showDetails && selectedJob && <JobDetailsModal job={selectedJob} onClose={() => setShowDetails(false)} />}
                </div>
            </div>
            <div className="mt-4 flex justify-center items-center space-x-2">
                {Array.from({ length: pages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
