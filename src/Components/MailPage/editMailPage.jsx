import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditMailPage({ location }) {
  const {
    emailString,
    type,
    linkTest,
    interviewTime,
    interviewLocation,
    confirmationDeadline,
    vacancyName,
    deadline,
    subject,
  } = location.state;

  const [newEmailString, setNewEmailString] = useState(emailString);
  const [newType, setNewType] = useState(type);
  const [newLinkTest, setNewLinkTest] = useState(linkTest);
  const [newInterviewTime, setNewInterviewTime] = useState(interviewTime);
  const [newInterviewLocation, setNewInterviewLocation] = useState(interviewLocation);
  const [newConfirmationDeadline, setNewConfirmationDeadline] = useState(confirmationDeadline);
  const [newVacancyName, setNewVacancyName] = useState(vacancyName);
  const [newDeadline, setNewDeadline] = useState(deadline);
  const [newSubject, setNewSubject] = useState(subject);

  const handleSave = () => {
    // Implement save functionality here
    console.log('Save new email details');
  };

  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded-lg shadow-lg max-w-full md:max-w-4xl h-1/2 overflow-y-auto">
      <h1 className="text-purple-600 font-bold mb-4 text-center">Edit Email Details</h1>
      <form className="space-y-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2 p-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Emails:</label>
              <input
                type="text"
                value={newEmailString}
                onChange={(e) => setNewEmailString(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Type:</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="accepted">Accepted</option>
                <option value="schedule">Schedule</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            {newType === 'schedule' && (
              <>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Test Link:</label>
                  <input
                    type="text"
                    value={newLinkTest}
                    onChange={(e) => setNewLinkTest(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Deadline:</label>
                  <input
                    type="text"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </>
            )}
            {newType === 'accepted' && (
              <>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Interview Time:</label>
                  <input
                    type="text"
                    value={newInterviewTime}
                    onChange={(e) => setNewInterviewTime(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Interview Location:</label>
                  <input
                    type="text"
                    value={newInterviewLocation}
                    onChange={(e) => setNewInterviewLocation(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Confirmation Deadline:</label>
                  <input
                    type="text"
                    value={newConfirmationDeadline}
                    onChange={(e) => setNewConfirmationDeadline(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </>
            )}
            {newType === 'rejected' && (
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Vacancy Name:</label>
                <input
                  type="text"
                  value={newVacancyName}
                  onChange={(e) => setNewVacancyName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Subject:</label>
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="form-group text-center">
          <button
            type="button"
            onClick={handleSave}
            className="w-50 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
