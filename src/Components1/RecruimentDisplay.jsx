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
        description: 'Phát triển các giao diện trực quan hấp dẫn và thân thiện với người dùng phù hợp với nhận diện thương hiệu của chúng tôi...',
    },
    {
        title: 'Chuyên viên Marketing',
        company: 'Công Ty TNHH GREENVIBE',
        location: 'Hà Nội',
        description: ' Nghiên cứu, phân tích sản phẩm/dịch vụ của doanh nghiệp, phân tích khách hàng và đối thủ để xây dựng chiến lược SEO;...',
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
                <Link to='' as='h1'>
                    <h1 className="display-heading">Recruiment</h1>
                </Link>
                </header>
                <p className="subheading">Find the right position for you</p>

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
                        <Link to='' as='button'>
                            <button type="submit" title='Tìm kiếm' className="filter-button">
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
