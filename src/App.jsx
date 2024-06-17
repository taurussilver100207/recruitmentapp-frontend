import './App.css'
import { Routes, Route } from "react-router-dom";
import RecruimentRoundForm from './Components/RecruimentRound/RecruimentRoundForm.jsx';
import CandidateList from './Components/RecruimentRound/CandidateList.jsx';
import CandidateForm from './Components/RecruimentRound/CandidateForm.jsx';
import RecruimentRoundDetail from './Components/RecruimentRound/RecruimentRoundDetail.jsx';
import Home from './Components1/Home.jsx';
import RecruimentRoundList from './Components/RecruimentRound/RecruimentRoundList.jsx';
import SendMailForm from './Components/MailPage/sendMail.jsx'
import ListJobs from './Components/JobPage/jobListAdmin.jsx';
import UserJobList from './Components/JobPage/jobListUser.jsx';
import CreateJobForm from './Components/JobPage/createJob.jsx';
import RecruimentList from './Components1/RecruimentList.jsx';
function App() {

  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/postest' element={<PostTest />} />
      <Route path='/recruimentDisplay' element={<RecruimentDisplay />} />
      <Route path='/listTestForm' element={<ListTestForm />} />
      <Route path='/createTest' element={<ListCreateTest />} />
      <Route path='/recruimentList' element={<RecruimentRoundList />} />
      <Route path='/recruimentRoundDetail' element={<RecruimentRoundDetail />} />
      <Route path='/recruimentRoundForm' element={<RecruimentRoundForm />} />
      <Route path='/candidateList' element={<CandidateList />} />
      <Route path='/candidateForm' element={<CandidateForm />} />
      <Route path="/sendMail" element={<SendMailForm />} />
      <Route path="/job-admin" element={<ListJobs />} />
      <Route path="/job-user" element={<UserJobList />} />
      <Route path="/createJob" element={<CreateJobForm />} />
    </Routes>
  )
}


export default App;

