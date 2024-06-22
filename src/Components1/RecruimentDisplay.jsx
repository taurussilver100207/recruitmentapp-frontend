import { Link } from 'react-router-dom';
import './Component1.css'
import { useEffect, useState } from 'react';


const jobs = [
    {
        title: 'Lập trình viên Full-stack',
        company: 'Công ty Cổ Phần TINASOFT Việt Nam',
        location: 'Hà Nội',
        description: 'Tham gia phân tích yêu cầu, thiết kế chi tiết và lập kế hoạch phát triển dự án....',
        recruimentDetail: {
            benefits: [
                'Được tham gia vào các dự án React JS quy mô lớn',
                'Môi trường làm việc năng động, sáng tạo',
                'Cơ hội học hỏi và phát triển',
                'Các đãi ngộ hấp dẫn (lương, thưởng, bảo hiểm...)',
            ],
            requirements: [
                'Kinh nghiệm 2+ năm phát triển ứng dụng web với React JS',
                'Hiểu biết sâu về các khái niệm và kỹ thuật liên quan đến React (Redux, Hooks, v.v.)',
                'Kỹ năng JavaScript vững chắc',
                'Kỹ năng xây dựng UI/UX thân thiện với người dùng',
                'Có khả năng làm việc độc lập và phối hợp nhóm hiệu quả',
            ],
            applicationProcess: [
                'Nộp hồ sơ trực tuyến qua website của công ty (link sẽ được cung cấp sau)',
                'Bài kiểm tra kỹ thuật online (nếu có)',
                'Phỏng vấn trực tuyến hoặc trực tiếp',
            ],
        }
    },
    {
        title: 'Thiết kế viên UI/UX',
        company: 'Công Ty TNHH ABC',
        location: 'TP. Hồ Chí Minh',
        description: 'Phát triển các giao diện trực quan hấp dẫn và thân thiện với người dùng phù hợp với nhận diện thương hiệu của chúng tôi...',
        recruimentDetail: {
            benefits: [
                'Được tham gia vào các dự án React JS quy mô lớn',
                'Môi trường làm việc năng động, sáng tạo',
                'Cơ hội học hỏi và phát triển',
                'Các đãi ngộ hấp dẫn (lương, thưởng, bảo hiểm...)',
            ],
            requirements: [
                'Kinh nghiệm 2+ năm phát triển ứng dụng web với React JS',
                'Hiểu biết sâu về các khái niệm và kỹ thuật liên quan đến React (Redux, Hooks, v.v.)',
                'Kỹ năng JavaScript vững chắc',
                'Kỹ năng xây dựng UI/UX thân thiện với người dùng',
                'Có khả năng làm việc độc lập và phối hợp nhóm hiệu quả',
            ],
            applicationProcess: [
                'Nộp hồ sơ trực tuyến qua website của công ty (link sẽ được cung cấp sau)',
                'Bài kiểm tra kỹ thuật online (nếu có)',
                'Phỏng vấn trực tuyến hoặc trực tiếp',
            ],
        }
    },
    {
        title: 'Chuyên viên Marketing',
        company: 'Công Ty TNHH GREENVIBE',
        location: 'Hà Nội',
        description: ' Nghiên cứu, phân tích sản phẩm/dịch vụ của doanh nghiệp, phân tích khách hàng và đối thủ để xây dựng chiến lược SEO;...',
        recruimentDetail: {
            benefits: [
                'Được tham gia vào các dự án React JS quy mô lớn',
                'Môi trường làm việc năng động, sáng tạo',
                'Cơ hội học hỏi và phát triển',
                'Các đãi ngộ hấp dẫn (lương, thưởng, bảo hiểm...)',
            ],
            requirements: [
                'Kinh nghiệm 2+ năm phát triển ứng dụng web với React JS',
                'Hiểu biết sâu về các khái niệm và kỹ thuật liên quan đến React (Redux, Hooks, v.v.)',
                'Kỹ năng JavaScript vững chắc',
                'Kỹ năng xây dựng UI/UX thân thiện với người dùng',
                'Có khả năng làm việc độc lập và phối hợp nhóm hiệu quả',
            ],
            applicationProcess: [
                'Nộp hồ sơ trực tuyến qua website của công ty (link sẽ được cung cấp sau)',
                'Bài kiểm tra kỹ thuật online (nếu có)',
                'Phỏng vấn trực tuyến hoặc trực tiếp',
            ],
        }
    },
    {
        title: 'Tester',
        company: 'Công Ty TNHH Infoplus',
        location: 'Đà Nắng',
        description: 'Kiểm thử cải thiện tính năng và cấu trúc System, Software / phát triển dịch vụ CMS...',
        recruimentDetail: {
            benefits: [
                'Hiệu quả về chi phí ',
                'Môi trường làm việc năng động, sáng tạo',
                'Cơ hội học hỏi và phát triển',
                'Các đãi ngộ hấp dẫn (lương, thưởng, bảo hiểm...)',
                'Sự hài lòng của khách hàng'
            ],
            requirements: [
                'Kinh nghiệm 2+ năm phát triển ứng dụng web với React JS',
                'Kiến thức cơ bản về Database/SQL',
                'Kiến thức cơ bản về lệnh linux',
                'Làm việc với các công cụ Test Management',
                'Làm việc với các công cụ Automation',
                'Có khả năng làm việc độc lập và phối hợp nhóm hiệu quả',
            ],
            applicationProcess: [
                'Nộp hồ sơ trực tuyến qua website của công ty (link sẽ được cung cấp sau)',
                'Bài kiểm tra kỹ thuật online (nếu có)',
                'Phỏng vấn trực tuyến hoặc trực tiếp',
            ],
        }
    }
];

const RecruimentDisplay = () => {
    const [searchTerm, setSearchTeam] = useState('');
    const [filterJob, setFilterJob] = useState(jobs);
    const [showInstructions, setShowInstructions] = useState(false);
    const [showCurrents, setShowCurrrents] = useState(null)

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
    };
    const handleApplyClick = (job) => {
        setShowInstructions(true);
        setShowCurrrents(job);
    };

    const handleInstructionClose = () => {
        setShowInstructions(false);
    };

    return (
        <div className='body'>
            <div className="recruitment-display">
                <header className="header">
                    <Link to='/' as='h1'>
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
                                <div className="job-image-container">
                                    {/* <img src={job.image} alt={job.title} className="job-image" /> */}
                                </div>
                                <div className="job-header">
                                    <h3 className="job-title">{job.title}</h3>
                                    <p className="job-company">{job.company}</p>
                                    <p className="job-location">{job.location}</p>
                                </div>
                                <p className="job-description">{job.description}</p>
                                <button to='/' className="job-apply" onClick={() => handleApplyClick(job)}>
                                    Ứng tuyển
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {showInstructions && showCurrents && (
                    <div className="instructions-modal">
                        <h2>Hướng dẫn ứng tuyển {showCurrents.title}</h2>
                        <p>
                            Các bước để ứng tuyển vị trí :
                        </p>
                        <div className="recruitment-details">
                            <h3>Quyền lợi : </h3>
                            <ul>
                                {showCurrents.recruimentDetail.benefits.map((benefits) => (
                                    <li key={benefits}>{benefits}</li>
                                ))}
                            </ul>
                            <h3>Yêu cầu : </h3>
                            <ul>
                                {showCurrents.recruimentDetail.requirements.map((requirement) => (
                                    <li key={requirement}>{requirement}</li>
                                ))}
                            </ul>
                            <h3>Quy trình ứng tuyển : </h3>
                            <ol>
                                {showCurrents.recruimentDetail.applicationProcess.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ol>
                        </div>
                        <button onClick={handleInstructionClose}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecruimentDisplay;
