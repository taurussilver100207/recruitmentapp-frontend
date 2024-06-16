import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Recruiment.css'

// danh sách đợt tuyển dụng

const handClickRecruiment = {
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    jobPosition: '',
    quantify: '',
    descriptions: ''
}

const RecruimentRoundList = () => {
    const [data, setData] = useState({ ...handClickRecruiment })
    const [rounds, setRounds] = useState([])
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState({})
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleChangeRecruiment = (event) => {
        const { name, value } = event.target;
        setData({ ...[data], [name]: value })
    };

    const handleDateRecruiment = (name, date) => {
        setData({ ...data, [name]: date })
    };

    // const validateRecruiment = () => {
    //     const error = {};

    //     if (!data.date) {
    //         error["date"] = "Please enter a date";
    //     }
    //     setFormError(error);
    //     return Object.keys(error).length === 0;
    // };

    // useEffect(() => {
    //     axios.post('http://localhost:9000/recruiments/checkRecruiment')
    //         .then(response => setRounds(response.data))
    // }, [])

    const handleClickSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:9000/recruiments/checkRecruiment')
            setData(response.data)
            navigate('/')
            alert("You have compelted checking the recruiment list ")
        } catch (error) {
            console.log("Error recruiment round list :>>", error);
            setError(error.message)
            alert("You have not completed checking the recruiment list ")
        } finally {
            setLoading(true)
        }
    }

    return (
        <div>
            <form className='formRecruimentManage' onSubmit={handleClickSubmit}>
                <h2 className='recruimentHead'>{rounds.id ? 'update recruimet' : 'Create recruiment'}</h2>
                <div className='recruimentName'>
                    <label>Name : </label>
                    <input
                        type='text'
                        value={data.name}
                        onChange={handleChangeRecruiment}
                        required />
                </div>
                <br></br>
                <div className='recruimentDate'>
                    <label className='startdate'>Start  date :</label>
                    <input
                        type='date'
                        id='startDate'
                        name='startDate'
                        selected={data.startDate}
                        onChange={(date) => handleDateRecruiment('StartDate', date)}
                        required
                    />
                </div>
                <br></br>
                <div className='recruimentDate'>
                    <label>End date  : </label>
                    <input
                        type='date'
                        selected={data.endDate}
                        onChange={(date) => handleDateRecruiment('endDate', date)}
                        required
                    />
                </div>
                <br></br>
                <div className='recruimentData'>
                    <label>JobPosition : </label>
                    <input
                        type='text'
                        value={data.jobPosition}
                        onChange={handleChangeRecruiment}
                        required
                    />
                </div>
                <br></br>
                <div className='recruimentQuantify'>
                    <label>Quantify :</label>
                    <input
                        type='text'
                        value={data.quantify}
                        onChange={handleChangeRecruiment}
                        required
                    />
                </div>
                <br></br>
                <br></br>
                <div className='recruimentData'>
                    <label>Descriptions :</label>
                    <input
                        type='text'
                        value={data.descriptions}
                        onChange={handleChangeRecruiment}
                        required
                    />
                </div>
                <br></br>
                <br></br>
                <button type='submit' className='recruimentButton' disabled={loading}> {
                    loading ? 'Đang xử lý...' : rounds.id ? 'Cập nhật' : 'Create  '
                }  Save </button>
                {error && <div className='alert '>{error}</div>}
            </form>
        </div>
    );
}

export default RecruimentRoundList;



// <div>
//     <h2>Recruiment rounds list </h2>
//     {/* <ul>
//         {listRecruiment.map(round => (
//             <li key={round.id}> {round.name} - startDate : {round.startDate} - endDate : {round.endDate}</li>
//         ) ) }
//     </ul> */}
// </div>