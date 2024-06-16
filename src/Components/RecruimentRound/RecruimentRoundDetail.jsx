import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import './Recruiment.css'
// Chi tiết đợt tuyển dụng

const handDetailRecruiment = {
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    jobPosition: '',
    quantify: '',
    descriptions: ''
}

const RecruimentRoundDetail = () => {
    const [formData, setFormData] = useState({
        ...handDetailRecruiment,
    })
    const [formLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState({})
    const [error, setError] = useState(null)
    const [rounds, setRounds] = useState([])
    // const navigate = useNavigate()

    const handleChangeDatail = (event) => {
        const { name, value } = event.target;
        setFormData({ ...[formData], [name]: value });
    };

    const handleDateRecruiment = (name, date) => {
        setFormData({ ...formData, [name]: date })
    };
    const validateDetail = () => {
        const error = {};
        if (!formData.name) {
            error["Error"] = "Please enter the name of the recruitment round";
        }
        if (!formData.startDate) {
            error["error"] = "Please select a start date of the recruiment round"
        }
        if (!formData.endDate) {
            error["error"] = "Please select a end date of the recruiment round"
        }
        if (!formData.jobPosition) {
            error["error"] = "Please select a job position of the recruiment round"
        }
        if (!formData.quantify) {
            error["error"] = "Please select a quantify of the recruiment round"
        }
        if (!formData.descriptions) {
            error["error"] = "Please enter a description of the recruitment round"
        }
        setFormError(error);
        return Object.keys(error).length === 0;
    }
    const handleDetailForm = async (event) => {
        event.preventDefault()
        // if (!validateDetail()) {
        //     setError('Please fix the error in the form')
        //     return true
        // }

        setFormLoading(true);
        setError(null);

        const detailRecruiments = async (_id) => {
            try {
                const response = await axios.get(`http://localhost:9000/recruiments/detailRecruiment/${_id}`)
                console.log(response);
                setFormData(response.data);
                alert('You have compelted checking the recruiment detail')
            } catch (error) {
                console.error("Error recruiment detail round :>>", error);
                setError(error.message);
                alert('You have not compelted checking the recruiment detail')
            } finally {
                setFormLoading(false)
            }
        }
        console.log(detailRecruiments);
    };

    // useEffect((recruimentId) => {
    //     const id = recruimentId;
    //     handleDetailForm(id);
    // }, []);

    // const handleClick = async () => {
    //     await handleDetailForm();
    // }

    return (
        <div>
            <form className='formRecruimentManage' onSubmit={handleDetailForm}>
                <h2 className='recruimentHead'>{rounds.id ? 'update recruimet' : 'Create recruiment'}</h2>
                <div className='recruimentName'>
                    <label>Name : </label>
                    <input
                        type='text'
                        value={formData.name}
                        onChange={handleChangeDatail}
                        required />
                </div>
                <br></br>
                <div className='recruimentDate'>
                    <label className='startdate'>Start  date :</label>
                    <input
                        type='date'
                        id='startDate'
                        name='startDate'
                        selected={formData.startDate}
                        onChange={(date) => handleDateRecruiment('StartDate', date)}
                        required
                    />
                </div>
                <br></br>
                <div className='recruimentDate'>
                    <label>End date  : </label>
                    <input
                        type='date'
                        selected={formData.endDate}
                        onChange={(date) => handleDateRecruiment('endDate', date)}
                        required
                    />
                </div>
                <br></br>
                <div className='recruimentData'>
                    <label>JobPosition : </label>
                    <input
                        type='text'
                        value={formData.jobPosition}
                        onChange={handleChangeDatail}
                        required
                    />
                </div>
                <br></br>
                <div className='recruimentQuantify'>
                    <label>Quantify :</label>
                    <input
                        type='text'
                        value={formData.quantify}
                        onChange={handleChangeDatail}
                        required
                    />
                </div>
                <br></br>
                <br></br>
                <div className='recruimentData'>
                    <label>Descriptions :</label>
                    <input
                        type='text'
                        value={formData.descriptions}
                        onChange={handleChangeDatail}
                        required
                    />
                </div>
                <br></br>
                <br></br>
                {/* <Link to='/'> */}
                <button type='submit' className='recruimentButton' disabled={formLoading}> {
                    formLoading ? 'Processing...' : rounds.id ? 'Cập nhật' : 'Create '
                }  Save </button>
                {/* </Link> */}
            </form>

        </div>
    );
}

export default RecruimentRoundDetail;