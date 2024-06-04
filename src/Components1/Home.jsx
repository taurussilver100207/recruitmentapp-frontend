import { NavLink } from 'react-router-dom'
import './style.css'
export default function Home() {
    return (
        <div>
            <>
                <div className="Auth-form-container">
                    <form className="Auth-form">
                        <div className="Auth-form-content">
                            <h1 className='headingAuthForm'>Recruiment-App</h1>
                            <br></br>
                            <div className="list-group">
                                <NavLink to="/listTest" className="list-group-item list-group-item-action " aria-current="true">
                                    lisTest
                                </NavLink>
                                <br></br>
                                <NavLink to="/recruimentRoundForm" className="list-group-item list-group-item-action">recruimentRoundForm</NavLink>
                                <br></br>
                                <NavLink to="/recruimentRoundlist" className="list-group-item list-group-item-action">Recruiment Round List </NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        </div>
    )
}
