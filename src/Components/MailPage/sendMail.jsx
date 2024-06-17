import { useState, useEffect } from 'react';
import axios from 'axios';
import { htmlToText } from 'html-to-text';

export default function SendMailForm() {
  const [emailString, setEmailString] = useState('');
  const [type, setType] = useState('accepted');
  const [linkTest, setLinkTest] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewLocation, setInterviewLocation] = useState('');
  const [confirmationDeadline, setConfirmationDeadline] = useState('');
  const [vacancyName, setVacancyName] = useState('');
  const [message, setMessage] = useState('');
  console.log(message);
  const [deadline, setDeadline] = useState('');
  const [emailPreviewHtml, setEmailPreviewHtml] = useState('<p>Hello ...,</p>');
  const [subject, setSubject] = useState('');
  const [userDetails, setUserDetails] = useState([]);

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

    const emails = emailArray.map(email => {
      const user = userDetails.find(user => user.email === email) || { firstName: '...', lastName: '...' };
      return {
        email,
        firstName: user.firstName,
        lastName: user.lastName,
        linkTest: type === 'schedule' ? linkTest : undefined,
        interviewTime: type === 'accepted' ? interviewTime : undefined,
        interviewLocation: type === 'accepted' ? interviewLocation : undefined,
        confirmationDeadline: type === 'accepted' ? confirmationDeadline : undefined,
        vacancyName: type === 'rejected' ? vacancyName : undefined,
        deadline: type === 'schedule' ? deadline : undefined,
        subject,
        htmlTemplate: emailPreviewHtml
      };
    });

    try {
      const response = await axios.post('http://localhost:9000/email/sendEmail', { emails, type });
      console.log(response);
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
      firstName: '...',
      lastName: '...',
      linkTest,
      interviewTime,
      interviewLocation,
      confirmationDeadline,
      vacancyName,
      deadline,
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
  };

  useEffect(() => {
    fetchPreview();
  }, [userDetails, type, linkTest, interviewTime, interviewLocation, confirmationDeadline, vacancyName, deadline]);

  const resetFormStates = () => {
    setEmailString('');
    setType('accepted');
    setLinkTest('');
    setInterviewTime('');
    setInterviewLocation('');
    setConfirmationDeadline('');
    setVacancyName('');
    setDeadline('');
    setEmailPreviewHtml('<p>Hello ...,</p>');
    setSubject('');
    setMessage('');
    setUserDetails([]);
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
          <div className="w-full md:w-1/2 p-2 custom-scroll">
            <div className="mt-4 md:mt-0 p-4 h-96 custom-scroll">
              <h2 className="text-purple-600 font-bold mb-4">Email Preview</h2>
              <div
                className="w-full h-full border border-purple-400 rounded-md shadow-sm p-4 overflow-auto"
                dangerouslySetInnerHTML={{ __html: emailPreviewHtml }}
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
