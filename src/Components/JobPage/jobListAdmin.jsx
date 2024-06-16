import React, { useEffect, useState, useRef } from 'react';
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
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true);
    const [isBottom, setIsBottom] = useState(false);
    const searchContainerRef = useRef(null);
    const listContainerRef = useRef(null);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:9000/job/listJobs', {
                params: {
                    $skip: skip,
                    $limit: limit,
                    search: searchQuery,
                }
            });
            const jobs = response.data.data || [];
            const total = response.data.total || 0;
            setJobs(jobs);
            setTotal(total);
            setPages(Math.ceil(total / limit));

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

    const fetchSuggestions = async (query) => {
        try {
            const response = await axios.get('http://localhost:9000/job/listJobs', {
                params: {
                    $skip: 0,
                    $limit: 5,
                    search: query
                }
            });
            setSuggestions(response.data.data || []);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    useEffect(() => {
        if (shouldFetch) {
            fetchJobs();
            setShouldFetch(false);
        }
    }, [skip, limit, searchQuery, shouldFetch]);

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

    const handlePageChange = (pageNumber) => {
        const newSkip = pageNumber * limit;
        setSkip(newSkip);
        setCurrentPage(pageNumber);
        setShouldFetch(true);
        console.log('Handle page change -> pageNumber:', pageNumber, 'newSkip:', newSkip);
    };

    const handleJobCreated = (newJob) => {
        setJobs([newJob, ...jobs]);
        setShowCreateForm(false);
        setSelectedJob(newJob);
        setShowDetails(true);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value) {
            fetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    const handleSearchButtonClick = () => {
        setShouldFetch(true);
        setSuggestions([]);
    };

    const handleSuggestionClick = async (suggestion) => {
        try {
            const response = await axios.get(`http://localhost:9000/job/getJob/${suggestion._id}`);
            if (response.data) {
                setSelectedJob(response.data);
                setJobs([response.data]); // Set jobs to only the selected job
                setShowDetails(true);
                setSuggestions([]); // Clear suggestions
                setSearchQuery(''); // Clear search input
                setShouldFetch(false); // Prevent fetching of the entire job list
            }
        } catch (error) {
            console.error('Error fetching job details:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setSuggestions([]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchButtonClick();
        }
    };

    const handleScroll = () => {
        if (listContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listContainerRef.current;
            setIsBottom(scrollHeight - scrollTop === clientHeight);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        if (listContainerRef.current) {
            listContainerRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (listContainerRef.current) {
                listContainerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="p-4 flex flex-col h-screen w-full">
            <div className="flex-grow flex overflow-hidden m-10">
                <div className="w-1/2 md:w-1/2 h-full overflow-y-auto custom-scroll" ref={listContainerRef}>
                    <div className="relative search-container w-full" ref={searchContainerRef}>
                        <input
                            type="text"
                            placeholder="Search by job name or ID..."
                            value={searchQuery}
                            onChange={handleSearch}
                            onKeyDown={handleKeyDown}
                            className="search-input"
                        />
                        <button
                            onClick={handleSearchButtonClick}
                            className="search-button"
                        >
                            Search
                        </button>
                        {suggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.map(suggestion => (
                                    <li
                                        key={suggestion._id}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion.jobId}: {suggestion.jobName}
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>
                    <h1 className="text-2xl font-bold mb-4">{total} jobs in XYZ company</h1>
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="bg-green-400 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
                    >
                        Create Job
                    </button>
                    <ul className="space-y-4 mt-3 mr-1 w-full">
                        {jobs.map(job => (
                            <li
                                key={job._id}
                                className={`border rounded-lg p-4 shadow-md cursor-pointer ${selectedJob && selectedJob._id === job._id ? 'border-purple-900 bg-purple-100' : 'border-gray-300 hover:bg-gray-50'}`}
                                onClick={() => fetchJobDetails(job._id)}
                            >
                                <div>
                                    <span className="text-sm">Job ID: {job.jobId}</span>
                                    <h2 className="text-purple-500 font-semibold">Job Name: {job.jobName}</h2>
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
                <div className="w-full md:w-1/2 h-full pl-11 border-gray-300">
                    {showDetails && selectedJob && <JobDetailsModal job={selectedJob} onClose={() => setShowDetails(false)} />}
                    {showUpdateForm && selectedJob && <UpdateJobForm job={selectedJob} onClose={() => { setShowUpdateForm(false); fetchJobs(); }} />}
                </div>
            </div>
            {isBottom && (
                <div className="flex justify-center items-center space-x-2">
                    {Array.from({ length: pages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i)}
                            className={`px-4 py-2 rounded ${currentPage === i ? 'bg-purple-500 text-white' : 'bg-purple-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
            {showConfirmation && (
                <ConfirmationModal
                    onConfirm={deleteJob}
                    onCancel={() => setShowConfirmation(false)}
                />
            )}
            {showCreateForm && (
                <CreateJobForm
                    onClose={() => setShowCreateForm(false)}
                    onJobCreated={handleJobCreated}
                />
            )}
        </div>
    );
}
