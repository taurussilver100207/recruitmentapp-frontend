import React, { useState } from 'react'
import '../style.css'

export default function Recruiment() {
    // const [baiTest, setBaiTest] = useState([])
    // const [showCreateModal, setShowCreateModal] = useState(false)
    // const [showUpdataModal, setShowUpdateModal] = useState(false)
    // const [selectedTest, setSelectedTest] = useState(null)
    // const [questions, setQuestions] = useState([])
    // const [jobPosition, setJobPosition] = useState([])
    // const [searchTerm, setSearchTerm] = useState('')
    // const [newTest, setNewTest] = useState({
    //     mabaitest: '',
    //     ten: '',
    //     thoiluong: 0,
    //     mota: '',
    //     cacvitri: [],
    //     cauhoi: [],
    //     diemtoithieu: 0,
    // })
    // const [newQuestion, setNewQuestion] = useState({
    //     noidung: '',
    //     dapanA: '',
    //     dapanB: '',
    //     dapanC: '',
    //     dapanD: '',
    //     dapAnDung: '',
    // })

    // useEffect(() => {
    //     // fetch('/')
    //     //     .then((response) => response.json)
    //     //     .then((data) => {
    //     //         setNewTest(data.newTest),
    //     //             setQuestions(data.questions),
    //     //             setJobPosition(data.jobPosition)
    //     //     });
    // }, []);

    // const handleSearch = (event) => {
    //     setSearchTerm(event.target.value.toLowerCase());
    // }
    // const filterDataTest = baiTest.filter((test) => {
    //     const searchTest = searchTerm.trim();
    //     return searchTest && (
    //         test.name.toLowerCase().includes(searchTest) ||
    //         test.description.toLowerCase().includes(searchTest)
    //     )
    // })
    // const handleCreateTest = (newTest) => {
    //     fetch('/', {
    //         method: 'Post',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(newTest)
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setBaiTest([...baiTest, data.baiTest]);
    //             setNewTest({
    //                 mabaitest: '',
    //                 ten: '',
    //                 thoiluong: 0,
    //                 mota: '',
    //                 cacvitri: [],
    //                 cauhoi: [],
    //                 diemtoithieu: 0,
    //             })
    //         })
    //         .catch((error) => console.error('Error creating entrane test :>>', error))
    // };

    // const handleUpdateTest = (updateTest) => {
    //     fetch(` ${selectedTest.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify(updateTest)
    //     })
    //     const updateTests = baiTest.map((codeTest) => {
    //         codeTest.id === baiTest.id ? baiTest : codeTest;
    //     });
    //     setBaiTest(updateTests)
    // }
    // const handleDeleteTest = (id) => {
    //     fetch(`/ ${id}`, {
    //         method: 'DELETE',
    //     })
    //         .then((response) => response.json())
    //         .then(() => {
    //             setBaiTest(baiTest.filter((test) => test.id !== id));
    //         });
    // };

    // const handleCreateQuestion = () => {
    //     // Gửi câu hỏi mới đến API
    //     fetch('/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(newQuestion),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setQuestions([...questions, data.cauHoi]);
    //             setNewQuestion({
    //                 noiDung: '',
    //                 dapAnA: '',
    //                 dapAnB: '',
    //                 dapAnC: '',
    //                 dapAnD: '',
    //                 dapAnDung: '',
    //             });
    //         });
    // };
    // const handleDeleteQuestion = (questionCode) => {
    //     fetch(`${questionCode}`, {
    //         method: 'DELETED',
    //     })
    //         .then(() => {
    //             setQuestions(questions.filter((question) => question.questionCode !== questionCode))
    //         });
    // }
    // const handleOpenCreateModal = () => {
    //     setShowCreateModal(true);
    // };


    // const handleOpenUpdateModal = (test) => {
    //     setSelectedTest(test);
    //     setShowUpdateModal(true);
    // };

    // const handleCloseCreateModal = () => {
    //     setShowCreateModal(false)
    // }
    // const handleCloseUpdateModal = () => {
    //     setShowUpdateModal(false)
    // }

    // const handleMenuToggle = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // }

    const [tests, setTests] = useState([]);
    const [newTest, setNewTest] = useState({
        testCode: '',
        name: '',
        duration: 0,
        description: '',
        positions: [],
        questions: [],
        minScore: 0,
    });

    const handleCreateTest = () => {
        setTests([...tests, newTest]);
        setNewTest({
            testCode: '',
            name: '',
            duration: 0,
            description: '',
            positions: [],
            questions: [],
            minScore: 0,
        });
    };

    const handleUpdateTest = (test) => {
        fetch(`/${test._id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(test)
        })
            .then((response) => response.json())
            .then((data) => {
                const updatedTests = tests.map((list) =>
                    list._id === data._id ? data : list
                );
                setTests(updatedTests);
            })
    };

    const handleDeleteTest = (id) => {
        setTests(tests.filter((listTest) => listTest.id !== id));
    };

    return (
        <div className='listTest'>
            <div>
                {/* <div className='test'>
                <div className='heading'>Quản lý bài test</div>

                <div className='search-bar'>
                    <input
                        type='text'
                        placeholder='Tìm kiếm bài test'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <button type='button' onClick={handleOpenCreateModal}>Tạo mới bài test</button>

                <table onClick={handleCreateTest}>
                    <thead>
                        <tr>
                            <th>Mã bài test</th>
                            <th>Tên</th>
                            <th>Thời lượng</th>
                            <th>Mô tả</th>
                            <th>Vị trí</th>
                            <th>Số câu hỏi</th>
                            <th>Điểm tối thiểu</th>
                            <th>Câu Hỏi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterDataTest.map((test) => (
                            <tr key={test.id}>
                                <td>{test.id}</td>
                                <td>{test.name}</td>
                                <td>{test.duration}</td>
                                <td>{test.description}</td>
                                <td>{test.positions.join(', ')}</td>
                                <td>{test.questions.length}</td>
                                <td>{test.minScore}</td>
                                <td>
                                    <button onClick={() => handleOpenUpdateModal(test)}>Sửa</button>
                                    <button onClick={() => handleDeleteTest(test.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {

                }
            </div> */}
            </div>

            <div className='head'>Quản lý Bài Test Đầu vào</div>

            <div className="test-list">
                {tests.map((test) => (
                    <Test key={test.id} test={test} onUpdate={handleUpdateTest} onDelete={handleDeleteTest} />
                ))}
            </div>

            <div className="new-test-form">
                <div className='heading'>Tạo Bài Test Mới</div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateTest();
                }}>
                    <br></br>
                    <label>Mã Bài Test : </label>
                    <input
                        type='text'
                        value={newTest.testCode}
                        onChange={(event) => setNewTest({ ...newTest, testCode: event.target.value })}
                    />
                    <br></br>
                    <br></br>
                    <label>Tên Bài Test : </label>
                    <input
                        type="text"
                        name='name'
                        value={newTest.name}
                        onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                    />
                    <br></br>
                    <br></br>
                    <label>Thời lượng : </label>
                    <input
                        type="number"
                        value={newTest.duration}
                        onChange={(event) => setNewTest({ ...newTest, duration: parseInt(event.target.value) })}
                    />
                    <br></br>
                    <label>Mô tả : </label>
                    <textarea
                        value={newTest.description}
                        onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                    />
                    <br></br>
                    <br></br>
                    <label>Vị trí Việc làm : </label>
                    <select
                        // multiple
                        value={newTest.positions}
                        onChange={(event) =>
                            setNewTest({
                                ...newTest,
                                // positions: Array.from(e.target.selectedOptions, (option) => option.value),
                                positions: event.target.value
                            })}
                    >
                        <option value="">Chọn vị trí</option>
                        <option value="dev">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="tester">Tester</option>
                    </select>

                    {/* <select value={newTest.positions} onChange={(event) => setNewTest({ ...newTest, positions: event.target.value })}>
                        <option value="">Chọn vị trí</option>
                        <option value="dev">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="qa">Tester</option>
                    </select> */}
                    <br></br>
                    <br></br>
                    <label>Câu hỏi : </label>
                    {
                        newTest.questions.map((questions, index) => {
                            <div key={index}>
                                <label>Câu Hỏi {index + 1}</label>
                                <input type='text' value={questions.test} />
                            </div>
                        })
                    }
                    <br></br>
                    <br></br>
                    <label>Điểm số Tối thiểu : </label>
                    <input
                        type="number"
                        value={newTest.minScore}
                        onChange={(e) => setNewTest({ ...newTest, minScore: parseInt(e.target.value) })}
                    />
                    <br></br>
                    <button type="submit">Tạo Bài Test</button>
                </form>
            </div>
        </div>
    )
}
