import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../Routes/NavBar.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <NavBar/>


        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <li><a href="#">Overview</a></li>
                <li className="active"><a href="#">Interviews<span className="sr-only">(current)</span></a></li>
                <li><a href="#">Questions</a></li>
                <li><a href="#">Billing</a></li>
              </ul>
            </div>
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
              <h1 className="page-header">Interviews</h1>

              <h2 className="sub-header">Add Upcoming Interview</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Interviewee</th>
                      <th>Interviewer</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monday July 31, 2017</td>
                      <td>3:30 pm</td>
                      <td>Matthew Reyes</td>
                      <td>Dan Svorcan</td>
                      <td>Drop Menu</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="sub-header">Upcoming Interviews</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Interviewee</th>
                      <th>Interviewer</th>
                      <th>Actions</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monday July 31, 2017</td>
                      <td>3:30 pm</td>
                      <td>Matthew Reyes</td>
                      <td>Dan Svorcan</td>
                      <td>Drop Menu</td>

                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="sub-header">Past Interviews</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Interviewee</th>
                      <th>Interviewer</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monday July 31, 2017</td>
                      <td>3:30 pm</td>
                      <td>Matthew Reyes</td>
                      <td>Dan Svorcan</td>
                      <td>Drop Menu</td>
                    </tr>

                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default Dashboard;