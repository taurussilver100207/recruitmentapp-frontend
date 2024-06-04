import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobDetailsModal from './jobDetail.jsx';
import UpdateJobForm from './jobUpdate.jsx';
import ConfirmationModal from './confirmForm.jsx';
import CreateJobForm from './createJob.jsx';

export default function ListJobsAdmin() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showDetails, setShowDetails] = useState(true);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);
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
                setShowUpdateForm(false);
            } else {
                fetchJobs();
            }
        } catch (error) {
            console.error('Error fetching job details:', error);
            fetchJobs();
        }
    };

    const deleteJob = async () => {
        try {
            await axios.delete(`http://localhost:9000/job/deleteJob/${jobToDelete}`);
            await fetchJobs();

            const jobsAfterDelete = jobs.filter(job => job._id !== jobToDelete);
            if (jobsAfterDelete.length > 0) {
                setSelectedJob(jobsAfterDelete[0]);
                setShowDetails(true);
            } else {
                setSelectedJob(null);
                setShowDetails(false);
            }

            setShowConfirmation(false);
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pages - 1) {
            setSkip(skip + 1);
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setSkip(skip - 1);
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-col h-screen">
            <div className="flex-grow flex overflow-hidden">
                <div className="w-3/5 pr-4 h-full overflow-y-auto custom-scroll">
                    <h1 className="text-red-800 font-bold mb-4">Job List</h1>
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
                    >
                        Create Job
                    </button>
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
                                <div className="mt-2 flex justify-between">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedJob(job); setShowUpdateForm(true); setShowDetails(false); }}
                                        className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setJobToDelete(job._id); setShowConfirmation(true); }}
                                        className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-2/5 pl-4 border-l border-gray-300 h-full overflow-y-auto custom-scroll">
                    {showDetails && selectedJob && <JobDetailsModal job={selectedJob} onClose={() => setShowDetails(false)} />}
                    {showUpdateForm && selectedJob && <UpdateJobForm job={selectedJob} onClose={() => { setShowUpdateForm(false); fetchJobs(); }} />}
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <button onClick={handlePrevPage} disabled={currentPage === 0} className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400">Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === pages - 1} className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400">Next</button>
            </div>
            <p className="mt-0 text-center">Page {currentPage + 1} of {pages}</p>
            {showConfirmation && (
                <ConfirmationModal
                    onConfirm={deleteJob}
                    onCancel={() => setShowConfirmation(false)}
                />
            )}
            {showCreateForm && (
                <CreateJobForm
                    onClose={() => setShowCreateForm(false)}
                    onJobCreated={fetchJobs}
                />
            )}
        </div>
    );
}
