import { NavLink } from 'react-router-dom';
import './postTest.css'

const PostTest = () => {
    return (
        <div className='postTestRecruiment'>
            <NavLink to='/'>
                <h2 className='headingTest'>Recruiment test</h2>
            </NavLink>
            <div>
                {/* <nav className="w3-sidebar w3-bar-block w3-collapse w3-white w3-animate-left w3-card" style="z-index:3;width:320px;" id="mySidebar">
                <a href="javascript:void(0)" className="w3-bar-item w3-button w3-border-bottom w3-large"><img src="https://www.w3schools.com/images/w3schools.png" style="width:60%;" /></a>
                <a href="javascript:void(0)" onclick="w3_close()" title="Close Sidemenu"
                    className="w3-bar-item w3-button w3-hide-large w3-large">Close <i className="fa fa-remove"></i></a>
                <a href="javascript:void(0)" className="w3-bar-item w3-button w3-dark-grey w3-button w3-hover-black w3-left-align" onclick="document.getElementById('id01').style.display='block'">New Message <i className="w3-padding fa fa-pencil"></i></a>
                <a id="myBtn" onClick="myFunc('Demo1')" href="javascript:void(0)" className="w3-bar-item w3-button"><i className="fa fa-inbox w3-margin-right"></i>Inbox (3)<i className="w3-margin-left fa fa-caret-down"></i></a>
                <div id="Demo1" className="w3-hide w3-animate-left">
                    <a href="javascript:void(0)" className="w3-bar-item w3-button w3-border-bottom test w3-hover-light-grey" onclick="openMail('Borge');w3_close();" id="firstTab">
                        <div className="w3-container">
                            <img className="w3-round w3-margin-right" src="/w3images/avatar3.png" style="width:15%;" /><span className="w3-opacity w3-large">Borge Refsnes</span>
                            <h6>Subject: Remember Me</h6>
                            <p>Hello, i just wanted to let you know that i'll be home at...</p>
                        </div>
                    </a>
                    <a href="javascript:void(0)" className="w3-bar-item w3-button w3-border-bottom test w3-hover-light-grey" onclick="openMail('Jane');w3_close();">
                        <div className="w3-container">
                            <img className="w3-round w3-margin-right" src="/w3images/avatar5.png" style="width:15%;" /><span className="w3-opacity w3-large">Jane Doe</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        </div>
                    </a>
                    <a href="javascript:void(0)" className="w3-bar-item w3-button w3-border-bottom test w3-hover-light-grey" onclick="openMail('John');w3_close();">
                        <div className="w3-container">
                            <img className="w3-round w3-margin-right" src="/w3images/avatar2.png" style="width:15%;" /><span className="w3-opacity w3-large">John Doe</span>
                            <p>Welcome!</p>
                        </div>
                    </a>
                </div>
                <a href="#" className="w3-bar-item w3-button"><i className="fa fa-paper-plane w3-margin-right"></i>Sent</a>
                <a href="#" className="w3-bar-item w3-button"><i className="fa fa-hourglass-end w3-margin-right"></i>Drafts</a>
                <a href="#" className="w3-bar-item w3-button"><i className="fa fa-trash w3-marghin-right"></i>Trash</a>
            </nav>

            <div id="id01" className="w3-modal" style="z-index:4">
                <div className="w3-modal-content w3-animate-zoom">
                    <div className="w3-container w3-padding w3-red">
                        <span  className="w3-button w3-right w3-xxlarge"><i className="fa fa-remove"></i></span>
                        <h2>Send Mail</h2>
                    </div>
                    <div className="w3-panel">
                        <label>To</label>
                        <input className="w3-input w3-border w3-margin-bottom" type="text" />
                        <label>From</label>
                        <input className="w3-input w3-border w3-margin-bottom" type="text" />
                        <label>Subject</label>
                        <input className="w3-input w3-border w3-margin-bottom" type="text" />
                        <input className="w3-input w3-border w3-margin-bottom" style="height:150px" placeholder="What's on your mind?" />
                        <div className="w3-section">
                            <a className="w3-button w3-red" onclick="document.getElementById('id01').style.display='none'">Cancel  <i className="fa fa-remove"></i></a>
                            <a className="w3-button w3-right" onclick="document.getElementById('id01').style.display='none'">Send  <i className="fa fa-paper-plane"></i></a>
                        </div>
                    </div>
                </div>
            </div> */}
            </div>
            <div className='jussContentTest'>
                <div>
                    <img
                        src="https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg" width='400'
                        alt="logo"
                    />
                </div>
                <table style={{ width: '100%' }}>
                    <tr>
                        <th>Test case ID</th>
                        <th>testName </th>
                        <th>duration</th>
                        <th>description</th>
                        <th>jobPositions</th>
                        <th>selectJobPosition</th>
                    </tr>
                    <tr>
                        <td>TD1</td>
                        <td>Basic Skills Assessment</td>
                        <td>30</td>
                        <td>Test your knowledge of grammar, math, and logic.</td>
                        <td>All Positions</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>TD2</td>
                        <td>Technical Skills Test</td>
                        <td>60</td>
                        <td>Evaluate your proficiency in [specific technical skills].</td>
                        <td>[List relevant job positions here]</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>TD3</td>
                        <td>Coding Chanllenge</td>
                        <td>90</td>
                        <td>SOlve a practical coding problem to assess your programming skills.</td>
                        <td>[List relevant job positions here]</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>TD4</td>
                        <td>Writing Sample</td>
                        <td>45</td>
                        <td>Write a short piece on a given topic to assess your writing skills.</td>
                        <td>[List relevant job positions here]</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>TD5</td>
                        <td>Interview</td>
                        <td>60</td>
                        <td>In-depth discussion about your experience and qualifications.</td>
                        <td>[List relevant job positions here]</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>TD6</td>
                        <td>Situational Judgment Test (SJT)</td>
                        <td>45</td>
                        <td>Present real-world scenarios relevant to the job and assess your decision-making skills.</td>
                        <td>[List relevant job positions here]</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>TD7</td>
                        <td>Work Simulation</td>
                        <td>60</td>
                        <td>Provide a simulated work environment to assess your ability to perform job-related tasks.</td>
                        <td>[List relevant job positions here]</td>
                        <td>-</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
export default PostTest;
