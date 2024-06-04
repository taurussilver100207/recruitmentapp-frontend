import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


// xem danh sach ung vien và them , xóa  ứng viên 

const handleClickCandidate = {
    name: '',
    gender: '',
    yearofbirth: '',
    email: '',
    phone: '',
    enstrancetestscore: '',
    interviewDate: '',
    timeMethod: '',
    jobDate: ''
}
const CandidateForm = () => {
    const [candidateData, setCandidateData] = useState({ ...handleClickCandidate })
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({})
    const [formLoading, setFormLoading] = useState(false)
    const navigate = useNavigate()

    const handleChangeCandidate = (event) => {
        setCandidateData({
            ...candidateData,
            [event.target.name]: event.target.value,
        })
    };

    const validateCandidateData = () => {
        const error = {};
        if (!candidateData.name) {
            error.name = 'Please enter a name'
        }
        setFormError(error)
        return Object.keys(error).length === 0;
    };



    const handleSubmitCandidate = async () => {
        if (!validateCandidateData) {
            setError('Please fix the error in the form.');
            return;
        }
        setFormLoading(true)
        setError(null)

        try {
            const response = candidates.id
            await axios.put(`http://localhost:9000/recruiments/updateCandidate/${candidateData.id}`, candidateData)
            await axios.post('http://localhost:9000/recruiments/createCandidate', candidateData);
            if (response.status === 200 || response.status === 201) {
                onSave();
                navigate('/candidateList');
            } else {
                throw new Error('API request failed');
            }
        } catch (error) {
            console.error('Error creating candidate form:', error);
            setError('An error occurred. Please try again later.');
        } finally {
            setFormLoading(false);
        }
    }

    return (
        <div>
            {/* <form onSubmit={handleSubmitCandidate}>
                <div>
                    <label>Name : </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label> Gender : </label>
                    <input
                        type="radio"
                        value='Nam'
                        checked={gender === 'Nam'}
                        onChange={(e) => setGender(e.target.value)}
                    />Nam
                    <input
                        type="radio"
                        value='Nữ'
                        checked={gender === 'Nữ'}
                        onChange={(e) => setGender(e.target.value)}
                    /> Nữ
                </div>
                <div>
                    <label>Yearofbirth : </label>
                    <input
                        type="number"
                        value={yearofbirth}
                        onChange={(e) => setYearOfBirth(e.target.value)}
                        min="1900"
                        max={new Date().getFullYear()}
                    />
                </div>
                <div>
                    <label>Email : </label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Phone : </label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label> Enstrancetestscore : </label>
                    <input
                        type="text"
                        value={enstrancetestscore}
                        onChange={(e) => setEnstranceTestScore(e.target.value)}
                    />
                </div>
                <div>
                    <label>Inter view Date : </label>
                    <input
                        type="text"
                        value={interviewDate}
                        onChange={(e) => setInterViewDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Time method : </label>
                    <input type="text" value={timeMethod} onChange={(e) => setTimeMethod(e.target.value)} />
                </div>
                <div>
                    <label>JobDate : </label>
                    <input type="text" value={jobDate} onChange={(e) => setJobDate(e.target.value)} />
                </div>
                <button type="submit" disabled={formLoading}>
                    {candidates.id ? 'Update Candidate' : 'Create Candidate'}
                </button>
            </form> */}
        </div>
    );
}

export default CandidateForm;
