import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recruiment.css'
// Danh sách ứng viên

const handleCandidateList = {
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
const CandidateList = () => {
    const [candidates, setCandidate] = useState({ ...handleCandidateList });
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({});
    const [formLoading, setFormLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangeCandidate = (event) => {
        const { name, value } = event.targer;
        setCandidate({ ...candidates, [name]: value })
    };


    // const validateCandidateData = () => {
    //     const error = {};
    //     if (!candidates.name) {
    //         error['name'] = 'Please enter a name'
    //     }
    //     if (!candidates.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidates.email)) {
    //         error['email'] = 'Please enter a valid email address';
    //     }
    //     setFormError(error)
    //     return Object.keys(error).length === 0;
    // };


    // useEffect(() => {
    //     axios.get('http://localhost:9000/recruiments/candidateRecruiment')
    //         .then((response) => response.json())
    //         .then((data) => setCandidate(data));
    // }, []);

    const handleClickCandidate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:9000/recruiments/candidateRecruiment');
            console.log(response);
            setCandidate(response.data)
            navigate('/')
            alert('Candidate list successfullt logged! ')
        } catch (error) {
            console.log(error.message);
            setError('An error occurred. Please try again later.');
            alert('Candidate list not succesfully -check it out')
        }
    }
    return (
        <div>
            <form className="formRecruimentManage" onSubmit={handleClickCandidate}>
                <h2 className="candidateHead">Candidate Information</h2>
                <div className="candidateListForm">
                    <div className="form-Name">
                        <label>Name : </label>
                        <input
                            type="text"
                            onChange={handleChangeCandidate}
                            required
                        />
                        {formError.name && <span className="error-message">{formError.name}</span>}
                    </div>
                    <div >
                        <label> Gender : </label>
                        <input
                            type="checkbox"
                            value='nam'
                            onChange={handleChangeCandidate}
                        />Nam
                        <input
                            type="checkbox"
                            value='nu'
                            onChange={handleChangeCandidate}
                        /> Nữ
                    </div>
                    <div className='form-Name'>
                        <label>Yearofbirth : </label>
                        <input
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            onChange={handleChangeCandidate}
                            required
                        />
                    </div>
                    <div className="form-Name">
                        <label>Email : </label>
                        <input
                            type="text"
                            onChange={handleChangeCandidate}
                            required
                        />
                    </div>
                    <div className="form-Name">
                        <label>Phone : </label>
                        <input
                            type="text"
                            onChange={handleChangeCandidate}
                            required
                        />
                    </div>
                    <div className="form-Name">
                        <label> Enstrancetestscore : </label>
                        <input
                            type="text"
                            onChange={handleChangeCandidate}
                            required
                        />
                    </div>
                    <div className="form-Name">
                        <label>Inter view Date : </label>
                        <input
                            type="date"
                            onChange={handleChangeCandidate}
                            required
                        />
                    </div>
                    <div className="form-Name">
                        <label>Time method : </label>
                        <input
                            type="text"
                            onChange={handleChangeCandidate}
                            required
                        />
                        <div className="form-Name">
                            <label>JobDate : </label>
                            <input
                                type="date"
                                onChange={handleChangeCandidate}
                                required
                            />
                        </div>
                        <button className="candidateBtn" type="submit" disabled={formLoading}>
                            {formLoading ? 'loading...' : 'Submit Candidate'}
                        </button>
                        {error && <p className="error">{error}</p>
                        }
                    </div>
                </div>
            </form >
        </div >
    );
}

export default CandidateList;
