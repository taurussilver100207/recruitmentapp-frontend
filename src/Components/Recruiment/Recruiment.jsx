import { useEffect, useState } from 'react'
import '../style.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Recruiment() {
    const [testCode, setTestCode] = useState('')
    const [testName, setTestName] = useState('');
    const [duration, setDuration] = useState(0);
    const [description, setDescription] = useState('');
    const [jobPositions, setJobPositions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [minScore, setMinScore] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9000/listTest/checkList`)
            .then((response) => response.json())
            .then((data) => setJobPositions(data))

        axios.post('http://localhost:9000/listTest/createList')
            .then((response) => response.json())
            .then((data) => setQuestions(data))

        axios.put(`http://localhost:9000/listTest/updateList`)
            .then((response) => response.json())
            .then((data) => setMinScore(data))
    }, []);

    const handleSubmit = async () => {
        // event.preventDefault();
        const testData = {
            testCode,
            testName,
            duration,
            description,
            jobPositions,
            questions,
            minScore
        };
        if (testData()) {
            navigate('/recruiment')
            console.log("Form listTest :>>", testData);
            alert('You have completed the entrace test')
        } else {
            alert('You have not completed the entrance test')
        }
        try {
            await axios.get(`http://localhost:9000/listTest/checkList`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData)
            });
            console.log("Form listTest :>>", testData);
        } catch (error) {
            console.error('Error submitting form :>> ', error);
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

    // const handleJobPositionOnchange = (event) => {
    //     const options = event.target.value;
    //     const selectedOptions = [];
    //     for (let i = 0; i < options.length; i++) {
    //         if (options[i].selected) {
    //             selectedOptions.push(options[i].value);
    //         }
    //     }
    //     setJobPositions(selectedOptions);
    // }
    const handleChangeQuestionText = (index, newText) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].questionText = newText;
        setQuestions(updatedQuestions);
    };

    const handleChangeAnswerText = (questionIndex, answerIndex, newText) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answers[answerIndex].text = newText;
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

    return (
        <div className='listTest'>
            <div className='head'>Administering Entrance Tests</div>

            <div className="new-test-form">
                <form className='formListTest' onSubmit={handleSubmit}>
                    <div className='heading'>Create New Test</div>
                    <br></br>
                    <br></br>
                    <div className='formList'>
                        <div className='heading-list'>
                            <label className='testcode'>
                                Test code : <input type="text" value={testCode} onChange={(e) => setTestCode(e.target.value)} />
                            </label>
                            <br></br>
                            <br></br>
                            <label className='nameCheck'>
                                Test name : <input type="text" value={testName} onChange={(e) => setTestName(e.target.value)} />
                            </label>

                            <br></br>
                            <br></br>

                            <label className='duration'>
                                Duration : <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
                            </label>
                            <br></br>
                            <br></br>
                            <label className='desription'>
                                Description : <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                            </label>

                            <br></br>
                            <br></br>

                            <label className='jobPosition'  >
                                Positions :  <select value={jobPositions} onChange={(e) => setJobPositions(e.target.value)}>
                                    <option value='chucvu'>position</option>
                                    <option value='dev'> developer </option>
                                    <option value='designer'> designer </option>
                                    <option value='test engineer'> tester </option>
                                </select>
                            </label>
                            <br></br>
                            <br></br>
                            <label className='minScore'>
                                min Score : <input
                                    type="number"
                                    value={minScore}
                                    onChange={(e) => setMinScore(e.target.value)}
                                />
                            </label>

                            <br></br>
                            <br></br>
                            <div className="d-grid gap-2 mt-3">
                                <NavLink to='/recruiment'>
                                    <button type="submit" className='createTest' >Create Test</button>
                                </NavLink>
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
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
