import axios from "axios";
import { useState } from "react";
import './RecruimentRound/Recruiment.css'
import { NavLink } from "react-router-dom";

const RecruimentManagement = () => {
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [positions, setPosition] = useState([])
    const [quantifys, setQuantifys] = useState('')
    const [descriptions, setDescriptions] = useState('')

    const handleClickSubmit = async (event) => {
        event.preventDefault();
        const dataRecruiment = {
            name,
            startDate,
            endDate,
            positions,
            quantifys,
            descriptions
        };
        try {
            const responses = await axios.post('/', dataRecruiment)
            console.log("Recruiment round created :>> ", responses.data);
        } catch (error) {
            console.log("Error creating recruiment round :>>", error);
        }
    }


    return (
        <div>
            <form className="formRecruiment" onSubmit={handleClickSubmit}>
                <h1 className="headList">Recruiment Management</h1>
                <br></br>
                <div className="recruimentList">
                    <label>Name recruiment : </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <br></br>
                <div className="recruimentDate"  >
                    <label>Start day : </label>
                    <input type="Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <br></br>
                <div className="recruimentDate">
                    <label>End day : </label>
                    <input type="Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <br></br>
                <div className="recruimentLabel">
                    <label>Positions : </label>
                    <input type="text" value={positions} onChange={(e) => setPosition(e.target.value.split(','))} />
                </div>
                <br></br>
                <div className="recruimentLabel">
                    <label>Quantify : </label>
                    <input
                        type="number"
                        value={quantifys}
                        onChange={(e) => setQuantifys(e.target.value)}
                    />
                </div>
                <br></br>
                <div className="recruimentList">
                    <label>Desription : </label>
                    <textarea
                        value={descriptions}
                        onChange={(e) => setDescriptions(e.target.value)}
                    />
                </div>
                <br></br>
                <div>
                    <NavLink to='/'>
                        <button type="submit">Save</button>
                    </NavLink>

                </div>
            </form>
        </div>
    );
}

export default RecruimentManagement;
