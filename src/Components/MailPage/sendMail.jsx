import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function SendMailForm() {
  const [emailString, setEmailString] = useState('');
  const [type, setType] = useState('accepted');
  const [linkTest, setLinkTest] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewLocation, setInterviewLocation] = useState('');
  const [confirmationDeadline, setConfirmationDeadline] = useState('');
  const [vacancyName, setVacancyName] = useState('');
  const [message, setMessage] = useState('');
  const [deadline, setDeadline] = useState('');
  const [emailPreviewHtml, setEmailPreviewHtml] = useState('<p>Hello ...,</p>');
  const [subject, setSubject] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const fetchUserDetails = async () => {
    const emailArray = emailString.split(',').map(email => email.trim());
    const invalidEmails = emailArray.filter(email => !validateEmail(email));
    if (invalidEmails.length > 0) {
      setMessage(`Invalid email format detected for: ${invalidEmails.join(', ')}`);
      setUserDetails([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:9000/user/getUser?emails=${encodeURIComponent(emailString)}`);
      if (response.data && response.data.length > 0) {
        setUserDetails(response.data);
      } else {
        setMessage("No user data returned.");
        setUserDetails([]);
      }
    } catch (error) {
      setMessage(`Failed to fetch user details: ${error.response?.data.message || error.message}`);
      setUserDetails([]);
    }
  };

  const fetchPreview = useCallback(async () => {
    const recipient = {
      firstName: '...',
      lastName: '...',
      linkTest: linkTest || '...',
      interviewTime: interviewTime || '...',
      interviewLocation: interviewLocation || '...',
      confirmationDeadline: confirmationDeadline || '...',
      vacancyName: vacancyName || '...',
      deadline: deadline || '...',
    };

    if (userDetails.length > 0) {
      recipient.firstName = userDetails[0]?.firstName || '...';
      recipient.lastName = userDetails[0]?.lastName || '...';
    }

    try {
      const response = await axios.post('http://localhost:9000/email/getEmailPreview', { recipient, type });
      setEmailPreviewHtml(response.data.htmlTemplate);
      setSubject(response.data.subject);
    } catch (error) {
      setMessage(`Error generating email preview: ${error.response?.data || error.message}`);
      window.alert(`Error generating email preview: ${error.response?.data || error.message}`);
    }
  }, [userDetails, type, linkTest, interviewTime, interviewLocation, confirmationDeadline, vacancyName, deadline]);

  useEffect(() => {
    if (emailString) {
      fetchUserDetails();
    }
  }, [emailString]);

  useEffect(() => {
    fetchPreview();
  }, [fetchPreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailArray = emailString.split(',').map(email => email.trim());
    const invalidEmails = emailArray.filter(email => !validateEmail(email));
    if (invalidEmails.length > 0) {
      setMessage(`Invalid email format detected for: ${invalidEmails.join(', ')}`);
      window.alert(`Invalid email format detected for: ${invalidEmails.join(', ')}`);
      return;
    }

    const emails = emailArray.map(email => {
      const user = userDetails.find(user => user.email === email) || { firstName: '...', lastName: '...' };
      return {
        email,
        firstName: user.firstName,
        lastName: user.lastName,
        linkTest: type === 'schedule' ? (linkTest || '...') : undefined,
        interviewTime: type === 'accepted' ? (interviewTime || '...') : undefined,
        interviewLocation: type === 'accepted' ? (interviewLocation || '...') : undefined,
        confirmationDeadline: type === 'accepted' ? (confirmationDeadline || '...') : undefined,
        vacancyName: type === 'rejected' ? (vacancyName || '...') : undefined,
        deadline: type === 'schedule' ? (deadline || '...') : undefined,
        subject,
        htmlTemplate: emailPreviewHtml
      };
    });

    try {
      const response = await axios.post('http://localhost:9000/email/sendEmail', { emails, type });
      setMessage('Emails sent successfully!');
      window.alert('Emails sent successfully!');
      resetFormStates();
    } catch (error) {
      setMessage(`Error sending emails: ${error.response?.data || error.message}`);
      window.alert(`Error sending emails: ${error.response?.data || error.message}`);
    }
  };

  const resetFormStates = () => {
    setEmailString('');
    setType('accepted');
    setLinkTest('');
    setInterviewTime('');
    setInterviewLocation('');
    setConfirmationDeadline('');
    setVacancyName('');
    setDeadline('');
    setEmailPreviewHtml('<p>Loading ...,</p>');
    setSubject('');
    setMessage('');
    setUserDetails([]);
    setIsEditing(false);
  };

  const toggleEditor = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="mx-auto p-4 border border-gray-300 rounded-lg shadow-lg max-w-full md:max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2 p-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Emails:</label>
              <input
                type="text"
                placeholder="Enter email"
                value={emailString}
                onChange={(e) => setEmailString(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter multiple emails separated by commas (e.g., user1@example.com, user2@example.com)
            </p>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Type:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option value="accepted">Accepted</option>
                <option value="schedule">Schedule</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            {type === 'schedule' && (
              <div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Test Link:</label>
                  <input
                    type="text"
                    placeholder="Enter test link"
                    value={linkTest}
                    onChange={(e) => setLinkTest(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Deadline:</label>
                  <input
                    type="text"
                    placeholder="Enter deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
            {type === 'accepted' && (
              <>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Vacancies:</label>
                  <input
                    type="text"
                    placeholder="Enter vacancy name"
                    value={vacancyName}
                    onChange={(e) => setVacancyName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Interview Time:</label>
                  <input
                    type="text"
                    placeholder="Enter interview time"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Interview Location:</label>
                  <input
                    type="text"
                    placeholder="Enter interview location"
                    value={interviewLocation}
                    onChange={(e) => setInterviewLocation(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Confirmation Deadline:</label>
                  <input
                    type="text"
                    placeholder="Enter confirmation deadline"
                    value={confirmationDeadline}
                    onChange={(e) => setConfirmationDeadline(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </>
            )}
            {type === 'rejected' && (
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Vacancy Name:</label>
                <input
                  type="text"
                  placeholder="Enter vacancy name"
                  value={vacancyName}
                  onChange={(e) => setVacancyName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 p-4 custom-scroll">
            <div className="mt-4 md:mt-0 custom-scroll">
              <h2 className="text-purple-600 font-bold mb-4">Email Preview</h2>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Subject:</label>
                {isEditing ? (
                  <input
                    type="text"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                ) : (
                  <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm ">
                    {subject}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={toggleEditor}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mb-4"
              >
                {isEditing ? 'Save Changes' : 'Edit Email'}
              </button>
              {isEditing ? (
                <ReactQuill
                  value={emailPreviewHtml}
                  onChange={(value) => setEmailPreviewHtml(value)}
                  className="mt-1"
                />
              ) : (
                <div
                  className="w-full border border-purple-400 overflow-auto"
                  dangerouslySetInnerHTML={{ __html: emailPreviewHtml }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="form-group text-center">
          <button
            type="submit"
            className="w-50 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Send Emails
          </button>
        </div>
      </form>
    </div>
  );
}
