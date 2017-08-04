import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../Routes/NavBar.jsx';
import SideBar from '../Routes/SideBar.jsx';
import UpcomingInterviewList from './UpcomingInterviewList.jsx';
import PastInterviewList from './PastInterviewList.jsx';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upcoming: [
        {date: 'Friday August 4, 2017',
          time: '2:30 pm',
          interviewee: 'Joe Lei',
          email: 'Joe@gmail.com',
          interviewer: 'June Park'
        },
        {date: 'Friday August 4, 2017',
          time: '3:30 pm',
          interviewee: 'Victor Ngo',
          email: 'Victor@gmail.com',
          interviewer: 'June Park'
        },
        {date: 'Friday August 4, 2017',
          time: '4:30 pm',
          interviewee: 'Matt',
          email: 'Matt@gmail.com',
          interviewer: 'June Park'
        }],
      past: [
        {date: 'Monday July 31, 2017',
          time: '2:30 pm',
          interviewee: 'Kirk Rohani',
          email: 'Kirk@gmail.com',
          interviewer: 'June Park'
        },
        {date: 'Monday July 31, 2017',
          time: '3:30 pm',
          interviewee: 'Paul Dockery',
          email: 'Paul@gmail.com',
          interviewer: 'June Park'
        }
      ]
    };
  }


  render() {
    return (
      <div>
        <NavBar/>
        {/*<SideBar/>*/}


          <div className="container-fluid" id="dashboard-div">
            <div className="col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <li><Link to='/dashboard'>Interviews</Link></li>
                <li><Link to='/schedule'>Schedule Interview</Link></li>
                <li><Link to='/questions'>Add a Question</Link></li>
              </ul>
            </div>


            <div className="col-md-10  main">
              <h1 className="page-header">Interviews</h1>
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