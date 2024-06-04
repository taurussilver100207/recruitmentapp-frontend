import axios from 'axios';
import { useEffect, useState } from 'react';
// import DatePicker from 'react-datepicker'
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

    const validateRecruiment = () => {
        const error = {};

        if (!data.date) {
            error["date"] = "Please enter a date";
        }
        setFormError(error);
        return Object.keys(error).length === 0;
    };

    useEffect(() => {
        axios.post(`http://localhost:9000/recruiments/createRecruiment`)
            .then(response => setRounds(response.data))
    }, [])
    const addRound = () => {
        axios.put(`http://localhost:9000/recruiments/updateRecruiment ${data.id}`)
            .then((response) => setRounds([...rounds, response.data]))
    }

    const handleClickSubmit = async (event) => {
        event.preventDefault();

        if (!validateRecruiment(data)) {
            navigate('/')
            setError('Please fix the errors in the form. ')
            return;
        }
        setLoading(true);
        setError(null);

        // try {
        //     const dataRecruiment = {
        //         name: data.name,
        //         startDate: data.startDate.toISOString().slice(0, 10),
        //         endDate: data.endDate.toISOString().slice(0, 10),
        //         jobPosition: data.jobPosition,
        //         quantify: data.jobPosition,
        //         descriptions: data.descriptions,
        //     };
        //     if (rounds.id) {
        //         await axios.put(`http://localhost:9000/recruiments/updateRecruiment ${data.id}`, dataRecruiment)
        //     } else {
        //         await axios.post('http://localhost:9000/recruiments/createRecruiment', dataRecruiment)
        //     }
        //     console.log("Recruiment round created/update successfully!");
        // } catch (error) {
        //     console.error("Error create/update recruiment round :>>", error);
        //     setError(error.message);
        // } finally {
        //     setLoading(false);
        // }
    }
    return (
        <div>

            <div className="hero_area">
                <div className="hero_bg_box">
                    <img src="images/hero-bg.jpg" alt="" />
                </div>
                <header className="header_section">
                    <div className="header_top">
                        <div className="container-fluid header_top_container">

                            <div className="social_box">
                                <a href="">
                                    <i className="fa fa-facebook" aria-hidden="true"></i>
                                </a>
                                <a href="">
                                    <i className="fa fa-twitter" aria-hidden="true"></i>
                                </a>
                                <a href="">
                                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                                </a>
                                <a href="">
                                    <i className="fa fa-instagram" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="header_bottom">
                        <div className="container-fluid">
                            <nav className="navbar navbar-expand-lg custom_nav-container ">
                                <Link to='' className="navbar-brand " > Recruiment Manage </Link>

                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className=""> </span>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav  ">
                                        <li className="nav-item ">
                                            <Link className="nav-link" href="#">Home </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#"> About</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">Services</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#"> Team </Link>
                                        </li>
                                        <li className="nav-item active">
                                            <Link className="nav-link" href="#">Contact Us</Link>
                                        </li>

                                        <form className="form-inline justify-content-center">
                                            <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                                                <i className="fa fa-search" aria-hidden="true"></i>
                                            </button>
                                        </form>
                                    </ul>
                                </div>
                            </nav>
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
                            <div className="form_container">

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
                                    <button onClick={addRound} type='submit' className='recruimentButton' disabled={loading}> {
                                        loading ? 'Đang xử lý...' : rounds.id ? 'Cập nhật' : 'Create  '
                                    }  Save </button>
                                    {error && <div className='alert '>{error}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br></br>
            <br></br>

            <footer className="footer_section">
                <div className="container">
                    <p>
                        &copy; <span id="displayYear"></span> All Rights Reserved By
                        <a href="https://html.design/">Free Html Templates</a>
                    </p>
                </div>
            </footer>




        </div>
    );
}

export default RecruimentRoundForm;
