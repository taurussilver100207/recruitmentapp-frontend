import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Danh sách ứng viên
const CandidateList = () => {
    const [candidates, setCandidate] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('')
            .then((response) => response.json())
            .then((data) => setCandidate(data));
    }, [])
    const handleClickCandidate = (event) => {
        event.preventDefault();
        try {
            navigate('/listTest ')
            alert('Candidate list successfullt logged! ')
        } catch (error) {
            alert('Candidate list not succesfully -check it out')
        }
    }
    return (
        <div>
            <h1>Danh sách ứng viên</h1>
            <ul>
                {candidates.map((candidates) => (
                    <li key={candidates.id}><a href='/' onClick={() => handleClickCandidate(candidates.id)}></a>
                        {candidates.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CandidateList;
