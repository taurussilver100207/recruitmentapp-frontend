import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const ListCreateTest = () => {
    const [testCode, setTestCode] = useState('')
    const [testName, setTestName] = useState('');
    const [duration, setDuration] = useState(0);
    const [description, setDescription] = useState('');
    // const [jobPositions, setJobPositions] = useState([]);
    const [selectJobPosition, setSelectJobPosition] = useState('')
    const [minScore, setMinScore] = useState(0);
    const navigate = useNavigate()

    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        const testData = {
            testCode,
            testName,
            duration,
            description,
            jobPositions: selectJobPosition,
            minScore
        };

        try {
            await axios.post('http://localhost:9000/listTest/createList', {
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(testData)
            });
            navigate('/postest')
            alert('You have completed the entrance test')
            console.log("Form listTest :>>", testData);
        } catch (error) {
            console.error('Error submitting form :>> ', error);
            alert('You have not completed the entrance test ')
        }
    };
    return (
        <div>
            <div className='listTest'>
                <div className='head'>Administering Entrance Tests</div>
                <div className="new-test-form">
                    <div>
                        <img
                            src='https://img2.thuthuatphanmem.vn/uploads/2019/01/26/hinh-anh-dep-ve-thong-tin-tuyen-dung_012646294.jpg'
                            alt='logoo'
                        />
                    </div>
                    <form className='formListTest' onSubmit={handleSubmitCreate}>
                        <div className='heading'>Create New Test</div>
                        <br></br>
                        <div className='formList'>
                            <div className='heading-list'>
                                <label className='testcode'>
                                    Test code : <input
                                        type="text"
                                        value={testCode}
                                        onChange={(e) => setTestCode(e.target.value)}
                                        required
                                    />
                                </label>
                                <br></br>
                                <br></br>
                                <label className='nameCheck'>
                                    Test name : <input
                                        type="text"
                                        value={testName}
                                        onChange={(e) => setTestName(e.target.value)}
                                        required
                                    />
                                </label>
                                <br></br>
                                <br></br>

                                <label className='duration'>
                                    Duration : <input
                                        type="number"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        required
                                    />
                                </label>
                                <br></br>
                                <br></br>
                                <label className='desription'>
                                    Description :
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </label>

                                <br></br>
                                <br></br>

                                <label className='jobPosition'  >
                                    Positions :  <select value={selectJobPosition} onChange={(e) => setSelectJobPosition(e.target.value)}>
                                        <option value='chucvu'>position</option>
                                        <option value='devolopment'>devolopment</option>
                                        <option value='tester'>tester</option>
                                    </select>
                                </label>
                                <br></br>
                                <br></br>
                                <label className='minScore'>
                                    min Score : <input
                                        type="number"
                                        value={minScore}
                                        onChange={(e) => setMinScore(e.target.value)}
                                        required
                                    />
                                </label>

                                <br></br>
                                <br></br>
                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className='createTest' >Create Test</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ListCreateTest;
