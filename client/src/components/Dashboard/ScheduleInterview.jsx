import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../Routes/NavBar.jsx';
import CodeMirror from 'codemirror';
import { Link } from 'react-router-dom';

class ScheduleInterview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar/>

          <div className="container-fluid" id="dashboard-div">
            <div className="col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <li><Link to='/dashboard'>Interviews</Link></li>
                <li><Link to='/schedule'>Schedule Interview</Link></li>
                <li><Link to='/questions'>Add a Question</Link></li>
              </ul>
            </div>

            <div className="col-md-8 main">
              <h1 className="page-header">Schedule an Interview </h1>

              <div className="input-group">
                <input type="text" className="form-control" placeholder="Date" aria-describedby="basic-addon1" />
              </div>

              <div className="input-group">
                <input type="text" className="form-control" placeholder="Time" aria-describedby="basic-addon1" />
              </div>

              <div className="input-group">
                <input type="text" className="form-control" placeholder="Interviewee" aria-describedby="basic-addon1" />
              </div>

              <div className="input-group">
                <input type="text" className="form-control" placeholder="Email" aria-describedby="basic-addon1" />
              </div>

              <div className="input-group">
                <input type="text" className="form-control" placeholder="Interviewer" aria-describedby="basic-addon1" />
              </div>

              <button type="button" className="btn btn-primary">Schedule</button>

            {/* button */}
            </div>

          </div>

      </div>
    );
  }
}

export default ScheduleInterview;



