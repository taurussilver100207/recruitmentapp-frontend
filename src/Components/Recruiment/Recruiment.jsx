import { useEffect, useState } from 'react'
import '../style.css'

export default function Recruiment() {
    const [baiTest, setBaiTest] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdataModal, setShowUpdateModal] = useState(false)
    const [selectedTest, setSelectedTest] = useState(null)
    const [questions, setQuestions] = useState([])
    const [jobPosition, setJobPosition] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [newTest, setNewTest] = useState({
        mabaitest: '',
        ten: '',
        thoiluong: 0,
        mota: '',
        cacvitri: [],
        cauhoi: [],
        diemtoithieu: 0,
    })
    const [newQuestion, setNewQuestion] = useState({
        noidung: '',
        dapanA: '',
        dapanB: '',
        dapanC: '',
        dapanD: '',
        dapAnDung: '',
    })

    useEffect(() => {
        fetch('/')
            .then((response) => response.json)
            .then((data) => {
                setNewTest(data.newTest),
                    setQuestions(data.questions),
                    setJobPosition(data.jobPosition)
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    }
    const filterDataTest = baiTest.filter((test) => {
        const searchTest = searchTerm.trim();
        return searchTest && (
            test.name.toLowerCase().includes(searchTest) ||
            test.description.toLowerCase().includes(searchTest)
        )
    })
    const handleCreateTest = (newTest) => {
        fetch('/', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTest)
        })
            .then((response) => response.json())
            .then((data) => {
                setBaiTest([...baiTest, data.baiTest]);
                setNewTest({
                    mabaitest: '',
                    ten: '',
                    thoiluong: 0,
                    mota: '',
                    cacvitri: [],
                    cauhoi: [],
                    diemtoithieu: 0,
                })
            })
            .catch((error) => console.error('Error creating entrane test :>>', error))
    };

    const handleUpdateTest = (updateTest) => {
        fetch(` ${selectedTest.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updateTest)
        })
        const updateTests = baiTest.map((codeTest) => {
            codeTest.id === baiTest.id ? baiTest : codeTest;
        });
        setBaiTest(updateTests)
    }
    const handleDeleteTest = (id) => {
        fetch(`/ ${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                setBaiTest(baiTest.filter((test) => test.id !== id));
            });
    };

    const handleCreateQuestion = () => {
        // Gửi câu hỏi mới đến API
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuestion),
        })
            .then((response) => response.json())
            .then((data) => {
                setQuestions([...questions, data.cauHoi]);
                setNewQuestion({
                    noiDung: '',
                    dapAnA: '',
                    dapAnB: '',
                    dapAnC: '',
                    dapAnD: '',
                    dapAnDung: '',
                });
            });
    };
    const handleDeleteQuestion = (questionCode) => {
        fetch(`${questionCode}`, {
            method: 'DELETED',
        })
            .then(() => {
                setQuestions(questions.filter((question) => question.questionCode !== questionCode))
            });
    }
    const handleOpenCreateModal = () => {
        setShowCreateModal(true);
    };


    const handleOpenUpdateModal = (test) => {
        setSelectedTest(test);
        setShowUpdateModal(true);
    };

    // const handleCloseCreateModal = () => {
    //     setShowCreateModal(false)
    // }
    // const handleCloseUpdateModal = () => {
    //     setShowUpdateModal(false)
    // }

    // const handleMenuToggle = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // }

    return (
        <div>
            <div className='test'>
                <h1>Quản lý bài test</h1>

                <div className='search-bar'>
                    <input
                        type='text'
                        placeholder='Tìm kiếm bài test'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <button onClick={handleOpenCreateModal}>Tạo mới bài test</button>

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
            </div>
        </div>
    )
}
