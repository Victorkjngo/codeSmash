import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../Routes/NavBar.jsx';
import UpcomingInterviewList from './UpcomingInterviewList.jsx';
import PastInterviewList from './PastInterviewList.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upcoming: [
                {date: 'Friday August 4, 2017',
                  time: '2:30 pm',
                  interviewee: 'Joe Lei',
                  email: 'Joe@gmail.com',
                  interviewer: 'Dan svorcan'
                },
                {date: 'Friday August 4, 2017',
                  time: '3:30 pm',
                  interviewee: 'Victor Ngo',
                  email: 'victor@gmail.com',
                  interviewer: 'Dan svorcan'
                },
                {date: 'Friday August 4, 2017',
                  time: '4:30 pm',
                  interviewee: 'June Park',
                  email: 'June@gmail.com',
                  interviewer: 'Dan svorcan'
                }],
      past: [
            {date: 'Monday July 31, 2017',
              time: '2:30 pm',
              interviewee: 'Kirk Rohani',
              email: 'Kirk@gmail.com',
              interviewer: 'Dan svorcan'
            },
            {date: 'Monday July 31, 2017',
              time: '3:30 pm',
              interviewee: 'Paul DOckery',
              email: 'Paul@gmail.com',
              interviewer: 'Dan svorcan'
            }]
    }
  }


  render() {
    return (
      <div>
        <NavBar/>

          <div className="container-fluid" id="dashboard-div">
            <div className="col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <li className="active"><a href="#">Interviews<span className="sr-only">(current)</span></a></li>
                <li><a href="#">Questions</a></li>
                <li><a href="#">Billing</a></li>
              </ul>
            </div>
            <div className="col-md-10  main">
              <h1 className="page-header">Interviews</h1>

              <h2 className="sub-header">Add New Interview</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Interviewee</th>
                      <th>Email</th>
                      <th>Interviewer</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monday July 31, 2017</td>
                      <td>3:30 pm</td>
                      <td>Matthew Reyes</td>
                      <td>mttrys@gmail.com</td>
                      <td>Dan Svorcan</td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-default btn-sm" type="button"  aria-haspopup="true" aria-expanded="false">
                            Add
                          </button>
                        </div>
                      </td>
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
                      <th>Email</th>
                      <th>Interviewer</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                    <UpcomingInterviewList interviewees={this.state.upcoming}/>
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
                      <th>Email</th>
                      <th>Interviewer</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                    <PastInterviewList interviewees={this.state.past}/>
                </table>
              </div>

            </div>
          </div>


      </div>
    );
  }
}

export default Dashboard;