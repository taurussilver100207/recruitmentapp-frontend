import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Recruiment.css'

// Tạo và cập nhật các đợt tuyển dụng

const handClickRecruiment = {
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    jobPosition: '',
    quantify: '',
    descriptions: ''
}

const RecruimentRoundForm = () => {
    const [data, setData] = useState({ ...handClickRecruiment });
    const [rounds, setRounds] = useState([])
    const [loading, setLoading] = useState(false)
    // const [formError, setFormError] = useState({})
    const [error, setError] = useState(null)
    const navigate = useNavigate()

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
    //     axios.post(`http://localhost:9000/recruiments/createRecruiment`)
    //         .then(response => setRounds(response.data))
    // }, [])
    // const addRound = (_id) => {
    //     axios.put(`http://localhost:9000/recruiments/updateRecruiment/${_id}`)
    //         .then((response) => setRounds([...rounds, response.data]))
    // }

    const handleClickSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        // try {
        //     const response = await axios.post('')
        //     setData(response.data);
        // } catch (error) {
        //     console.log("Error recruiment Round Form :>>", error);
        // }
        const dataRecruiment = (name => ({
            name,
            startDate: data.startDate.toISOString().slice(0, 10),
            endDate: data.endDate.toISOString().slice(0, 10),
            jobPosition: data.jobPosition,
            quantify: data.jobPosition,
            descriptions: data.descriptions,
        }));

        try {
            const response = await axios.post('http://localhost:9000/recruiments/createRecruiment', dataRecruiment)
            setData(response.data)
            window.alert("Recruiment Round Form successfully ")
            console.log("Recruiment round created/update successfully!");
            navigate('/recruimentDisplay')
        } catch (error) {
            console.error("Error create/update recruiment round :>>", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
        // const putRecruiment = async (_id) => {
        //     try {
        //         const response = axios.put(`http://localhost:9000/recruiments/updateRecruiment/${_id}`);
        //         setData(response.data);
        //         window.alert('Recruiment round put successfully')
        //         console.log('Recruiment round created/update succesfully! ');
        //     } catch (error) {
        //         alert('Recruiment round put form successfully');
        //         setError(error.message)
        //     }
        // }
        // console.log(putRecruiment);
    }

    return (
        <div>
            <div className="hero_area">
                <header className="header_section">
                    <div className="header_bottom">
                        <div className="container-fluid">
                            <Link to='/' className="navbar-brand " > Recruiment Manage </Link>
                        </div>
                    </div>
                </header>
            </div>

            <section className="contact_section ">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 px-0">
                            <div className="img-box ">
                                <img src="https://advsolutions.vn/wp-content/uploads/2020/02/mau-poster-tuyen-dung-2.png" className="box_img" alt="about img" />
                            </div>
                        </div>
                        <div className="col-md-5 mx-auto">
                            <div className="">
                                <form className='formRecruiment' onSubmit={handleClickSubmit}>
                                    <h2 className='recruimentHead'>{rounds.id ? 'update recruimet' : 'Create recruiment'}</h2>
                                    <div className='recruimentFormHead'>
                                        <div className='recruimentName'>
                                            <label>Name : </label>
                                            <input
                                                type='text'
                                                value={data.name}
                                                onChange={handleChangeRecruiment}
                                                required
                                            />
                                        </div>
                                        <br></br>
                                        <div className='recruimentStartDate'>
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
                                        <div className='recruimentEndDate'>
                                            <label>End date  : </label>
                                            <input
                                                type='date'
                                                id='endDate'
                                                name='endDate'
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
                                        {/* <NavLink to=''> */}
                                        <button type='submit' className='recruimentButton' disabled={loading}> {
                                            loading ? 'Đang xử lý...' : rounds.id ? 'Cập nhật' : 'Create  '
                                        }  Save </button>
                                        {error && <div className='alert '>{error}</div>}
                                        {/* </NavLink> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br></br>
            <br></br>
        </div>
    );
}

export default RecruimentRoundForm;
