import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { htmlToText } from 'html-to-text';

export default function SendMailForm() {
  const [emailString, setEmailString] = useState('');
  const [type, setType] = useState('accepted');
  const [linkTest, setLinkTest] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewLocation, setInterviewLocation] = useState('');
  const [confirmationDeadline, setConfirmationDeadline] = useState('');
  const [vacancyName, setVacancyName] = useState('');
  const [message, setMessage] = useState('');
  const [deadline, setDeadline] = useState('');
  const [emailPreviewHtml, setEmailPreviewHtml] = useState('');
  const [emailPreviewText, setEmailPreviewText] = useState('');
  const [subject, setSubject] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const fetchUserDetails = async () => {
    if (!validateEmail(emailString)) {
      setMessage("Invalid email format.");
      setFirstName('');
      setLastName('');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:9000/user/getUsersByEmails?emails=${encodeURIComponent(emailString)}`);
      console.log(response);
      if (response.data && response.data.length > 0) {
        setFirstName(response.data[0].firstName);
        setLastName(response.data[0].lastName);
      } else {
        setMessage("No user data returned.");
        setFirstName('');
        setLastName('');
      }
    } catch (error) {
      setMessage(`Failed to fetch user details: ${error.response?.data.message || error.message}`);
      setFirstName('');
      setLastName('');
    }
  };



  useEffect(() => {
    fetchUserDetails();
  }, [emailString]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailArray = emailString.split(',').map(email => email.trim());
    const invalidEmails = emailArray.filter(email => !validateEmail(email));
    if (invalidEmails.length > 0) {
      setMessage(`Invalid email format detected for: ${invalidEmails.join(', ')}`);
      window.alert(`Invalid email format detected for: ${invalidEmails.join(', ')}`);
      return;
    }

    const emails = emailArray.map(email => ({
      email,
      firstName: firstName,
      lastName: lastName,
      linkTest: type === 'schedule' ? linkTest : undefined,
      interviewTime: type === 'accepted' ? interviewTime : undefined,
      interviewLocation: type === 'accepted' ? interviewLocation : undefined,
      confirmationDeadline: type === 'accepted' ? confirmationDeadline : undefined,
      vacancyName: type === 'rejected' ? vacancyName : undefined,
      deadline: type === 'schedule' ? deadline : undefined,
      subject,
      htmlTemplate: emailPreviewHtml
    }));

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

  const fetchPreview = async () => {
    const recipient = {
      firstName,
      lastName,
      linkTest,
      interviewTime,
      interviewLocation,
      confirmationDeadline,
      vacancyName,
      deadline,
    };

    try {
      const response = await axios.post('http://localhost:9000/email/getEmailPreview', { recipient, type });
      setEmailPreviewHtml(response.data.htmlTemplate);
      setEmailPreviewText(htmlToText(response.data.htmlTemplate));
      setSubject(response.data.subject);
    } catch (error) {
      setMessage(`Error generating email preview: ${error.response?.data || error.message}`);
      window.alert(`Error generating email preview: ${error.response?.data || error.message}`);
    }
  };

  useEffect(() => {
    fetchPreview();
  }, [firstName, lastName, type, linkTest, interviewTime, interviewLocation, confirmationDeadline, vacancyName, deadline]);

  const resetFormStates = () => {
    setEmailString('');
    setType('accepted');
    setLinkTest('');
    setInterviewTime('');
    setInterviewLocation('');
    setConfirmationDeadline('');
    setVacancyName('');
    setDeadline('');
    setEmailPreviewHtml('');
    setEmailPreviewText('');
    setSubject('');
    setMessage('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded-lg shadow-lg max-w-full md:max-w-4xl h-1/2 overflow-y-auto">
      <h1 className="text-purple-600 font-bold mb-4 text-center">Send Emails</h1>
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Deadline:</label>
                  <input
                    type="text"
                    placeholder="Enter deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
            {type === 'accepted' && (
              <>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Interview Time:</label>
                  <input
                    type="text"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    required={type === 'accepted'}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Interview Location:</label>
                  <input
                    type="text"
                    value={interviewLocation}
                    onChange={(e) => setInterviewLocation(e.target.value)}
                    required={type === 'accepted'}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">Confirmation Deadline:</label>
                  <input
                    type="text"
                    value={confirmationDeadline}
                    onChange={(e) => setConfirmationDeadline(e.target.value)}
                    required={type === 'accepted'}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </>
            )}
            {type === 'rejected' && (
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Vacancy Name:</label>
                <input
                  type="text"
                  value={vacancyName}
                  onChange={(e) => setVacancyName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Subject:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-2">
            <div className="mt-4 md:mt-0 p-4 h-96">
              <h2 className="text-purple-600 font-bold mb-4">Email Preview</h2>
              <textarea
                className="w-full h-full border border-purple-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-400 focus:border-indigo-500 sm:text-sm"
                value={emailPreviewText}
                onChange={(e) => {
                  setEmailPreviewText(e.target.value);
                  setEmailPreviewHtml(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="form-group text-center">
          <button
            type="submit"
            className="w-50 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Emails
          </button>
        </div>
      </form>
    </div>
  );
}
