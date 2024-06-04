import { NavLink } from 'react-router-dom'

export default function RecruimentList() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/home">Home</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hostel Affairs
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/hosteldetails">Hostel Details</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/hosteladmission">Hostel Admission</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/roomallotment">Room Allotment</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/hostellogbook">Hostel Logbook</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/messregistration">Mess Registration</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/hostelquery">Hostel and Mess Queries</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/medicalservice">Medical Service</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Student Affairs
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/constitution">Constitution</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/technicalactivities">Technical Activities</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/gcu">GCU</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/student">Student Clubs and Elections</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/downloads">Downloads</NavLink></li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}
