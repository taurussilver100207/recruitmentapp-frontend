import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


// xem danh sach ung vien và them , xóa  ứng viên 
const CandidateForm = ({ roundId, candidates = {}, onSave }) => {
    const [name, setName] = useState(candidates.name || '');
    const [gender, setGender] = useState(candidates.gender || '');
    const [yearofbirth, setYearOfBirth] = useState(candidates.yearofbirth || '');
    const [email, setEmail] = useState(candidates.email || '');
    const [phone, setPhone] = useState(candidates.phone || '');
    const [enstrancetestscore, setEnstranceTestScore] = useState(candidates.enstrancetestscore || '')
    const [interviewDate, setInterViewDate] = useState(candidates.interviewSchedule);
    const [timeMethod, setTimeMethod] = useState(candidates.timeMethod || '');
    const [jobDate, setJobDate] = useState(candidates.jobDate || '');

    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({})
    const [formLoading, setFormLoading] = useState(false)
    const navigate = useNavigate()


    const handleClickCandidateform = (event) => {
        // event.preventDefault();
        const dataCandidateForm = {
            name,
            gender,
            yearofbirth,
            email,
            phone,
            enstrancetestscore,
            interviewDate,
            timeMethod,
            jobDate,
        }
        const recruimentCandidates = () => {
            const error = {};

            if (!dataCandidateForm) {
                error["date"] = "Please enter a date";
            }
            setFormError(error);
            return Object.keys(error).length === 0;
        }

        if (!recruimentCandidates(dataCandidateForm)) {
            navigate('/candidateList')
            setError('Please fix the errors in the form.')
            return
        }
        setFormLoading(true)
        setError(null)

        if (candidates.id) {
            axios.get('/', dataCandidateForm)
                .then(() => onSave())
                .catch((error) => console.error('Error creating candidate form :>>', error));
        } else {
            axios.post('/', dataCandidateForm)
                .then(() => onSave())
                .catch((error) => console.error('Error create candidate form :>>', error))
            axios.delete('/', dataCandidateForm)
                .then(() => onSave())
                .catch((error) => console.error('Error deleting candidate form :>> ', error))
        }
    }
    return (
        <div>
            <form onSubmit={handleClickCandidateform}>
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
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default CandidateForm;
