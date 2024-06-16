import { Link } from 'react-router-dom';
import './Component1.css'
import { useEffect, useState } from 'react';


const jobs = [
    {
        title: 'Lập trình viên Full-stack',
        company: 'Công ty Cổ Phần TINASOFT Việt Nam',
        location: 'Hà Nội',
        description: 'Tham gia phân tích yêu cầu, thiết kế chi tiết và lập kế hoạch phát triển dự án....',
    },
    {
        title: 'Thiết kế viên UI/UX',
        company: 'Công Ty TNHH ABC',
        location: 'TP. Hồ Chí Minh',
        description: 'Mô tả công việc...',
    },
    {
        title: 'Chuyên viên Marketing',
        company: 'Công Ty TNHH GREENVIBE',
        location: 'Hà Nội',
        description: 'Mô tả công việc...',
    },
    {
        title: 'Tester',
        company: 'Công Ty TNHH Infoplus',
        location: 'Đà Nắng',
        description: 'Kiểm thử cải thiện tính năng và cấu trúc System, Software / phát triển dịch vụ CMS...',
    }
];

const RecruimentDisplay = () => {
    const [searchTerm, setSearchTeam] = useState('')
    const [filterJob, setFilterJob] = useState(jobs)

    useEffect(() => {
        const filtered = jobs.filter((job) => {
            const searchText = searchTerm.toLowerCase();

            return (
                job.title.toLowerCase().includes(searchText) ||
                job.company.toLowerCase().includes(searchText) ||
                job.location.toLowerCase().includes(searchText) ||
                job.description.toLowerCase().includes(searchText)
            );
        });
        setFilterJob(filtered);
    }, [searchTerm])

    const handleSearchChange = (event) => {
        setSearchTeam(event.target.value)
    }

    return (
        <div className='body'>
            <div className="recruitment-display">
                <header className="header">
                    <h1 className="display-heading">Recruiment</h1>
                </header>
                <p className="subheading">Find the right position for you</p>
                <div>

                    {/* <section className="filters">
                    <form className="filter-form">
                        <div className="filter-group">
                            <label htmlFor="location">Location:</label>
                            <select id="location" name="location" className="filter-input">
                                <option value="">All </option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                <option value="Đà Nẵng">Đà Nẵng</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="job-title">Position : </label>
                            <select id="job-title" name="job-title" className="filter-input">
                                <option value="">All </option>
                                <option value="Lập trình viên">Programmer</option>
                                <option value="Thiết kế viên">Designer</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="experience">Experience : </label>
                            <select id="experience" name="experience" className="filter-input">
                                <option value="">All</option>
                                <option value="0-1 năm">0-1 năm</option>
                                <option value="1-3 năm">1-3 năm</option>
                                <option value="3-5 năm">3-5 năm</option>
                            </select>
                        </div>
                        <Link to=''>
                            <button type="submit" className="filter-button">Tìm kiếm</button>
                        </Link>
                    </form>
                </section>

                <section className="jobs">
                    <h2 className='jobHeading'>Danh sách việc làm</h2>
                    <div className="job-list">
                        <div className="job">
                            <div className="job-header">
                                <h3 className="job-title">Lập trình viên Full-stack</h3>
                                <p className="job-company">Công ty Cổ phần XYZ</p>
                                <p className="job-location">Hà Nội</p>
                            </div>
                            <p className="job-description">Mô tả công việc...</p>
                            <Link to='/' className="job-apply">Ứng tuyển</Link>
                        </div>

                        <div className="job">
                            <div className="job-header">
                                <h3 className="job-title">Thiết kế viên UI/UX</h3>
                                <p className="job-company">Công ty TNHH ABC</p>
                                <p className="job-location">TP. Hồ Chí Minh</p>
                            </div>
                            <p className="job-description">Mô tả công việc...</p>
                            <a href="#" className="job-apply">Ứng tuyển</a>
                        </div>

                        <div className="job">
                            <div className="job-header">
                                <h3 className="job-title">Chuyên viên Marketing</h3>
                                <p className="job-company">Công ty Cổ phần DEF</p>
                                <p className="job-location">Đà Nẵng</p>
                            </div>
                            <p className="job-description">Mô tả công việc...</p>
                            <a href="#" className="job-apply">Ứng tuyển</a>
                        </div>
                    </div>
                </section> */}
                </div>
            </div>

            <div>
                <section className="filters">
                    <form className="filter-form">
                        <div className="filter-group">
                            <label htmlFor="search">Tìm kiếm theo tên công ty, vị trí, hoặc địa điểm:</label>
                            <input
                                type="text"
                                id="search"
                                name="search"
                                className="filter-input"
                                placeholder="Nhập từ khóa..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <Link to=''>
                            <button type="submit" className="filter-button">
                                Tìm kiếm
                            </button>
                        </Link>
                    </form>
                </section>

                <section className="jobs">
                    <h2 className="jobHeading">Danh sách việc làm</h2>
                    <div className="job-list">
                        {filterJob.map((job) => (
                            <div key={job.title} className="job">
                                <div className="job-header">
                                    <h3 className="job-title">{job.title}</h3>
                                    <p className="job-company">{job.company}</p>
                                    <p className="job-location">{job.location}</p>
                                </div>
                                <p className="job-description">{job.description}</p>
                                <Link to='/' className="job-apply">
                                    Ứng tuyển
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default RecruimentDisplay;
