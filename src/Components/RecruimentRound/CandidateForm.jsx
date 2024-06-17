import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Recruiment.css'

//  them , xóa  ứng viên 
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
        const { name, value } = event.targer;
        setCandidateData({ ...candidateData, [name]: value })
    };


    const validateCandidateData = () => {
        const error = {};
        if (!candidateData.name) {
            error['name'] = 'Please enter a name'
        }
        if (!candidateData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidateData.email)) {
            error['email'] = 'Please enter a valid email address';
        }
        setFormError(error)
        return Object.keys(error).length === 0;
    };

    const handleSubmitCandidate = async (event) => {
        event.preventDefault()
        // if (!validateCandidateData) {
        //     setError('Please fix the error in the form.');
        //     return;
        // }
        setFormLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:9000/recruiments/createCandidate', {
                // method: 'Post',
                // headers: {
                //     'Content-type': 'application/json'
                // },
                // body: JSON.stringify(candidateData)
            });
            navigate('/recruimentDisplay')
            alert('You have compeleted checking the candidate!')
            setCandidateData(response.data);
            setError(null)
        } catch (error) {
            console.error('Error creating candidate form:', error);
            setError('An error occurred. Please try again later.');
            alert('You have not completed the candidate')
        } finally {
            setFormLoading(false);
        }
    };

    useEffect(() => {
        const fetchInitialData = async (_id) => {
            const response = await axios.delete(`http://localhost:9000/recruiments/deleteCandidate/${_id}`);
            if (response.ok) {
                const candidateFetch = await response.json();
                setCandidateData(candidateFetch)
            }
        }
        if (!error) {
            fetchInitialData();
            console.log("error :>>", error);
        }
    })

    return (

        <div>
            <Link to='/' className="linkHeading">
                <h2 className="headingFormsize">Candidate Form</h2>
            </Link>
            <div className="formHeading">
                <img
                    src="https://topdev.vn/blog/wp-content/uploads/2020/09/CNTT111.png"
                    alt="logo"
                />
                <form className="formRecruimentManage" onSubmit={handleSubmitCandidate}>
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
                        <div className="formGender">
                            <label> Gender : </label>
                            <div className="genderFORM">
                                <input
                                    type="checkbox"
                                    id="gender-nam"
                                    value='nam'
                                    onChange={handleChangeCandidate}
                                // required
                                />Nam
                                <input
                                    type="checkbox"
                                    id="gender-nu"
                                    value='nu'
                                    onChange={handleChangeCandidate}
                                // required
                                />Nữ
                            </div>
                        </div>
                        <br></br>
                        <div className="form-Name">
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
                        </div>
                        <div className="form-Name">
                            <label>JobDate : </label>
                            <input
                                type="date"
                                onChange={handleChangeCandidate}
                                required
                            />
                        </div>
                        {/* <br></br> */}
                        <button className="candidateBtn" type="submit" disabled={formLoading}>
                            {formLoading ? 'loading...' : 'Submit Candidate'}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CandidateForm;
