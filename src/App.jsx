import './App.css'
import Recruiment from './Components/Recruiment/Recruiment.jsx'
import { Routes, Route } from "react-router-dom";
import RecruimentManagement from './Components/recruimentManagement.jsx';
import RecruimentRoundForm from './Components/RecruimentRound/RecruimentRoundForm.jsx';
import CandidateList from './Components/RecruimentRound/CandidateList.jsx';
import CandidateForm from './Components/RecruimentRound/CandidateForm.jsx';
import RecruimentRoundDetail from './Components/RecruimentRound/RecruimentRoundDetail.jsx';
import Home from './Components1/Home.jsx';
import AdminRecuiment from './Components1/AdminRecuiment.jsx';
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
      <Route path='/adminRecruiment' element={<AdminRecuiment />} />
      <Route path='/listTest' element={<Recruiment />} />
      <Route path='/recruiment' element={<RecruimentManagement />} />
      <Route path='/recruimentList' element={<RecruimentRoundList />} />
      <Route path='/recruimentDetail' element={<RecruimentRoundDetail />} />
      <Route path='/recruimentRoundForm' element={<RecruimentRoundForm />} />
      <Route path='/candidateList' element={<CandidateList />} />
      <Route path='/candidateForm' element={<CandidateForm />} />
      <Route path="/sendMail" element={<SendMailForm />} />
      <Route path="/job-admin" element={<ListJobs />} />
      <Route path="/job-user" element={<UserJobList />} />
      <Route path="/createJob" element={<CreateJobForm />} />
      <Route path='/recruimentList' element={<RecruimentList/>}/>
    </Routes>

  )
}


export default App;

