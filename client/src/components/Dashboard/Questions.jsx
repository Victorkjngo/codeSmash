import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../Routes/NavBar.jsx';
import CodeMirror from 'codemirror';
import { Link } from 'react-router-dom';


class Questions extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var textArea = document.getElementById('questionScript')

    var options = {
    tabSize: 2,
      indentUnit: 2,
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      mode: {
        name: 'javascript',
        json: true
      },
      styleActiveLine: {
        nonEmpty: true
      }
    }

    var codeMirror = CodeMirror.fromTextArea(textArea, options);
    codeMirror.setSize('100%', '100%');
    codeMirror.execCommand('goDocEnd');
    codeMirror.setValue(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`);
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
                { /*<li><a href="#">Billing</a></li>*/}
              </ul>
            </div>

          <div className="col-md-8 main">
            <h1 className="page-header">Add a Question</h1>


            <div className="input-group col-xs-12">
              {/*<span className="input-group-addon" id="basic-addon1">@</span>*/}
              <input type="text" className="form-control question-script-title" placeholder="Title" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group col-xs-12">
              {/*<span className="input-group-addon" id="basic-addon1">@</span>*/}
              <input type="text" className="form-control question-script-description input-lg" placeholder="Description" aria-describedby="basic-addon1" />
            </div>

            <textarea id="questionScript"></textarea>


            <button type="button" className="btn btn-primary btn-block">Save Question</button>

          </div>

          <div className="col-md-8  main">
            <span></span>
          </div>




        </div>
      </div>

    );
  }
}

export default Questions;



