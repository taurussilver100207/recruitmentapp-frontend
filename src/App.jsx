<<<<<<< HEAD
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Recruiment from './Components/Recruiment/Recruiment.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
    <Recruiment/>
    </div>
  )
=======
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SendMailForm from './Components/MailPage/sendMail.jsx'
import ListJobs from './Components/JobPage/jobListAdmin.jsx';
import UserJobList from './Components/JobPage/jobListUser.jsx';
import './App.css';
import CreateJobForm from './Components/JobPage/createJob.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sendMail" element={<SendMailForm />} />
        <Route path="/job-admin" element={<ListJobs />} />
        <Route path="/job-user" element={<UserJobList />} />
        <Route path="/createJob" element={<CreateJobForm />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> origin/hoang
}

export default App;
