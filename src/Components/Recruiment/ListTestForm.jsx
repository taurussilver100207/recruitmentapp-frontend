import { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css'
import ListCreateTest from './ListCreateTest.jsx';
import { NavLink, useNavigate } from 'react-router-dom'

const ListTestForm = () => {
    const [testCode, setTestCode] = useState('')
    const [testName, setTestName] = useState('');
    const [duration, setDuration] = useState(0);
    const [description, setDescription] = useState('');
    const [jobPositions, setJobPositions] = useState([]);
    const [selectJobPosition, setSelectJobPosition] = useState('')
    const [questions, setQuestions] = useState([]);
    const [minScore, setMinScore] = useState(0);
    const navigate = useNavigate();


    // useEffect((_id) => {
    //     axios.get(`http://localhost:9000/listTest/checkList`)
    //         .then((response) => response.json())
    //         .then((data) => setJobPositions(data))

    //     axios.post('http://localhost:9000/listTest/createList')
    //         .then((response) => response.json())
    //         .then((data) => setQuestions(data))

    //     axios.put(`http://localhost:9000/listTest/updateList${_id}`)
    //         .then((response) => response.json())
    //         .then((data) => setMinScore(data))
    // }, []);

    // if (testData()) {
    //     navigate('/recruimentRoundForm')
    //     console.log("Form listTest :>>", testData);
    //     alert('You have completed the entrace test')
    // } else {
    //     alert('You have not completed the entrance test')
    // }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const testData = {
            testCode,
            testName,
            duration,
            description,
            jobPositions: selectJobPosition,
            questions,
            minScore
        };

        try {
            await axios.get('http://localhost:9000/listTest/checkList', {
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

    const handleAddQuestion = () => {
        const newQuestion = {
            questionText: '',
            answers: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
            ],
        };

        setQuestions([...questions, newQuestion]);
    };

    const handleDeleteQuestion = (index) => {
        const newQuestion = questions.filter((_, list) => list !== index);
        setQuestions(newQuestion)
    };

    const handleChangeQuestionText = (index, newText) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].questionText = newText;
        setQuestions(updatedQuestions);
    };

    const handleChangeAnswerText = (questionIndex, answerIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answers[answerIndex].text = value;
        setQuestions(updatedQuestions);
    };

    const handleToggleAnswerCorrectness = (questionIndex, answerIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answers.forEach((answer) => {
            answer.isCorrect = false;
        });
        updatedQuestions[questionIndex].answers[answerIndex].isCorrect = !updatedQuestions[questionIndex].answers[answerIndex].isCorrect;
        setQuestions(updatedQuestions);
    };

    const handleSubmitQuestion = async () => {
        try {
            const response = await axios.post('', questions, {
                headers: {
                    'Content-type': 'apllication/json'
                }
            });

            setQuestions(response)
            console.log("Api questions :>>", response.data);

        } catch (error) {
            console.error("Error submit question :>>", error);
        }
    }
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
                    <form className='formListTest' onSubmit={handleSubmit}>
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
                                    {/* <NavLink to=''> */}
                                    <button type="submit" className='createTest' >Create Test</button>
                                    {/* </NavLink> */}
                                </div>
                            </div>

                            <div className='question'>
                                <h2 className='header' >Questions  </h2>
                                {questions.map((question, index) => (
                                    <div key={index}>
                                        <label className='compassquestion'>
                                            Câu hỏi:
                                            <input
                                                type="text"
                                                value={question.questionText}
                                                onChange={(e) => handleChangeQuestionText(index, e.target.value)}
                                            />
                                        </label>

                                        {question.answers.map((answer, answerIndex) => (
                                            <div key={answerIndex}>
                                                <label>
                                                    Câu trả lời  :
                                                    <input
                                                        type="text"
                                                        value={answer.text}
                                                        onChange={(e) => handleChangeAnswerText(index, answerIndex, e.target.value)}
                                                    />
                                                </label>

                                                <input
                                                    type="radio"
                                                    checked={answer.isCorrect}
                                                    onChange={() => handleToggleAnswerCorrectness(index, answerIndex)}
                                                />
                                            </div>
                                        ))}

                                        <button onClick={() => handleDeleteQuestion(index)}>Delete question</button>
                                    </div>
                                ))}
                                <button className='btn' type='button' onClick={handleAddQuestion}>More questions </button>
                                <button className='btn' type='button' onClick={handleSubmitQuestion}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ListTestForm;
