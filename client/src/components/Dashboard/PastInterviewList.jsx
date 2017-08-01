import React from 'react';
import ReactDOM from 'react-dom';

var PastInterviewList = ({interviewees}) => (
    <tbody>
      {interviewees.map((interviewee)=> (
        <tr key={interviewee.interviewee}>
          <td>{interviewee.date}</td>
          <td>{interviewee.time}</td>
          <td>{interviewee.interviewee}</td>
          <td>{interviewee.email}</td>
          <td>{interviewee.interviewer}</td>
          <td>
            <div className="btn-group">
              <button className="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Action <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li><a href="#">Replay</a></li>
                <li><a href="#">Delete</a></li>
              </ul>
            </div>
          </td>
        </tr>
      ))
    }
    </tbody>
)


export default PastInterviewList;
